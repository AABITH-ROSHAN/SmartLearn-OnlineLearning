
import { useEffect, useState } from 'react';

export default function Protected() {
  const [message, setMessage] = useState('');

  async function getProtected() {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.message || 'Unauthorized or failed');
    }
  }

  useEffect(() => {
    getProtected();
  }, []);

  return (
    <div className="auth-container">
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
}
