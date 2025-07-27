import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Link your converted CSS file here

export default function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch('https://your-backend-url.onrender.com/api/login', { ...
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('✅ Logged in!');
        navigate('/home');
      } else {
        alert(data.message || '❌ Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Network error');
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">

        {/* Left welcome section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>WELCOME</h1>
            <h2>YOUR HEADLINE NAME</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className="geometric-shape-1"></div>
          <div className="geometric-shape-2"></div>
        </div>

        {/* Right form section */}
        <div className="form-section">
          <form className="form-container" onSubmit={handleLogin}>
            <h2>Sign in</h2>
            <p className="form-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

            {/* Email */}
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="email"
                  placeholder="User Name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="sign-in-btn">Sign in</button>

            {/* Divider */}
            <div className="divider"><span>Or</span></div>

            {/* Footer link */}
            <div className="sign-up-link">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
