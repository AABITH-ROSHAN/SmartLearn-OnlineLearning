i will give my code just check whats the problem 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('Course', userSchema, 'Course');
const resetTokens = new Map();

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ✅ Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Request Reset Code
app.post('/api/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ username: email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  resetTokens.set(email, code);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${code}`
  });

  res.json({ message: 'Reset code sent to your email.' });
});

// ✅ Verify Reset Code & Update Password
app.post('/api/verify-reset', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const savedCode = resetTokens.get(email);

  if (code !== savedCode) return res.status(400).json({ message: 'Invalid or expired code' });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ username: email }, { password: hashed });

  resetTokens.delete(email);
  res.json({ message: 'Password reset successful' });
});

// ✅ Protected Route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authorized!` });
});

// ✅ Middleware: Token Verification
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ✅ Gemini (Google AI) Chat Integration


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use a supported model ID
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

// ✅ (Optional Debug Route: GET All Models)
app.get('/api/models', async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json(models);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ Main AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    // Format user conversation
    const content = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({ contents: content });
    const response = await result.response.text();

    res.json({ message: { role: 'assistant', content: response } });

  } catch (err) {
    console.error("Gemini API error:", err.message || err);
    res.status(500).json({ error: "Gemini AI request failed." });
  }
});



// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
