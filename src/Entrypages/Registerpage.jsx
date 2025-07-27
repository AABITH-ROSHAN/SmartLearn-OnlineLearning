import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Registerpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Registered successfully! Please login.');
        navigate('/login');
      } else if (res.status === 409) {
        alert('❗ User already exists.');
      } else {
        alert(data.message || '❌ Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('❌ Network error. Please try again.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">

        {/* Left welcome panel */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>JOIN US</h1>
            <h2>Start your journey today</h2>
            <p>Become a member of our amazing community and access awesome features.</p>
          </div>
          <div className="geometric-shape-1" />
          <div className="geometric-shape-2" />
        </div>

        {/* Right signup form */}
        <div className="form-section">
          <form className="form-container" onSubmit={handleSignup}>
            <h2>Sign up</h2>
            <p className="form-subtitle">Create an account to get started</p>

            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="sign-in-btn">Register</button>

            <div className="sign-up-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
