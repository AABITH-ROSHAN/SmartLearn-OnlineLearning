import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  async function handleSendCode(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/request-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) setStep(2);
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate('/login');
  }

  return (
    <div className="login-container">
      <div className="login-content">

        {/* Left Info Panel */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>RESET</h1>
            <h2>Password Recovery</h2>
            <p>Enter your email to receive a verification code.</p>
          </div>
          <div className="geometric-shape-1" />
          <div className="geometric-shape-2" />
        </div>

        {/* Right Form */}
        <div className="form-section">
          <form
            className="form-container"
            onSubmit={step === 1 ? handleSendCode : handleResetPassword}
          >
            {step === 1 ? (
              <>
                <h2>Forgot Password</h2>
                <p className="form-subtitle">We'll send you a verification code</p>
                <div className="input-group">
                  <div className="input-wrapper">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="sign-in-btn">Send Code</button>
              </>
            ) : (
              <>
                <h2>Enter Code & New Password</h2>
                <p className="form-subtitle">Check your inbox for the code</p>

                <div className="input-group">
                  <div className="input-wrapper">
                    <span className="input-icon">🔑</span>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="sign-in-btn">Reset Password</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
