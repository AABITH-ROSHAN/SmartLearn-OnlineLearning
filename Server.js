import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(express.json());

// ==== ENV sanity check ====
const requiredEnvs = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS', 'GEMINI_API_KEY'];
for (const key of requiredEnvs) {
  if (!process.env[key]) {
    console.error(`FATAL: Missing required env var ${key}`);
    process.exit(1);
  }
}

// ==== CORS ====
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*', // lock this down in prod to your frontend URL
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ==== MongoDB Connection ====
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME || undefined })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ==== User Schema with reset fields ====
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // can be email or username based on your UI
  password: { type: String, required: true },
  resetCode: String,
  resetExpires: Date,
});
const User = mongoose.model('User', userSchema);

// ==== Email Transporter ====
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==== Rate limiter for reset requests (prevent abuse) ====
const requestResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many reset requests from this IP, please try again later.' },
});

// ==== JWT Helper ====
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
};

// ==== Middleware ====
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  const parts = authHeader.split(' ');
  if (parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'Malformed Authorization header' });
  }

  jwt.verify(parts[1], process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = payload;
    next();
  });
}

// ==== Routes ====

// Signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Request password reset (rate-limited)
app.post('/api/request-reset', requestResetLimiter, async (req, res) => {
  const { email } = req.body; // assuming email is stored as username
  try {
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ username: email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetCode = code;
    user.resetExpires = expires;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${code}. It expires in 10 minutes.`,
    });

    res.json({ message: 'Reset code sent to your email.' });
  } catch (err) {
    console.error('Request reset error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify reset code & update password
app.post('/api/verify-reset', async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Email, code, and new password required' });
    }

    const user = await User.findOne({ username: email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (!user.resetCode || !user.resetExpires) {
      return res.status(400).json({ message: 'No reset requested or code expired' });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    if (user.resetExpires < new Date()) {
      return res.status(400).json({ message: 'Code has expired' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetCode = undefined;
    user.resetExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Verify reset error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authorized!` });
});

// ==== Gemini (Google AI) Integration ====
let genAI, model;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
} catch (e) {
  console.error('Gemini initialization error:', e);
}

// Optional: list models
app.get('/api/models', async (req, res) => {
  try {
    if (!genAI) throw new Error('Gemini not initialized');
    const models = await genAI.listModels();
    res.json(models);
  } catch (e) {
    console.error('List models error:', e);
    res.status(500).json({ error: e.message || 'Failed to list models' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    if (!model) throw new Error('Generative model not initialized');
    if (!Array.isArray(messages)) return res.status(400).json({ message: 'Messages must be an array' });

    const content = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({ contents: content });
    const responseText = await result.response.text();

    res.json({ message: { role: 'assistant', content: responseText } });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Gemini AI request failed.' });
  }
});

// ==== Start Server ====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
