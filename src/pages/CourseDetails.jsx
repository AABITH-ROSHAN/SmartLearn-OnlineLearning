import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const courseVideos = {
  1: {
    title: "Python for Beginners",
    url: "https://www.youtube.com/embed/m67-bOpOoPU"
  },
  2: {
    title: "React.js Complete Course",
    url: "https://www.youtube.com/embed/EVdh8DCLnA0"
  },
  3: {
    title: "Data Science Fundamentals",
    url: "https://www.youtube.com/embed/hNCd_BM4T3M"
  },
  4: {
    title: "UI/UX Design Masterclass",
    url: "https://www.youtube.com/embed/TJtEQ1p1hw4"
  },
  5: {
    title: "Digital Marketing Strategy",
    url: "https://www.youtube.com/embed/MOIUw_RmQIY"
  },
  6: {
    title: "Node.js Backend Development",
    url: "https://www.youtube.com/embed/lBggLSG1w5g"
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const course = courseVideos[id];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        })
      });

      const data = await response.json();
      const aiMsg = { role: 'assistant', content: data.message.content };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Error fetching response." }]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <h2 className="text-danger">Course not found.</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-3" style={{ fontFamily: 'Poppins, Inter, Raleway, sans-serif' }}>
        <h2 className="fw-bold mb-4 text-center">{course.title}</h2>

        {/* Video */}
        <div className="mb-4 rounded-4 shadow-sm overflow-hidden" style={{ height: '460px' }}>
          <iframe
            src={course.url}
            title={course.title}
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #dee2e6',
              borderRadius: '1rem',
            }}
          />
        </div>

        {/* 💬 AI Tutor Chatbot Section */}
<div className="chatbot-container bg-white p-4 rounded-4 shadow-lg border border-light-subtle mb-5">
  <div className="d-flex align-items-center mb-3">
    <i className="bi bi-robot fs-4 text-primary me-2"></i>
    <h5 className="m-0 text-primary fw-semibold">AI Tutor Assistant</h5>
  </div>

  {/* 💬 Chat Window */}
  <div
    className="chat-window mb-3 p-3 bg-light rounded-4 border border-1"
    style={{ maxHeight: '320px', overflowY: 'auto' }}
  >
    {messages.length === 0 ? (
      <div className="text-muted text-center">Start a conversation with your AI Tutor...</div>
    ) : (
      messages.map((msg, idx) => (
        <div
          key={idx}
          className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
        >
          <div
            className={`px-3 py-2 rounded-3 shadow-sm ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border text-dark'
            }`}
            style={{ maxWidth: '70%', fontSize: '0.95rem' }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        </div>
      ))
    )}
  </div>

  {/* 🧠 Input & Send */}
  <div className="input-group">
    <input
      className="form-control rounded-start-pill shadow-sm"
      value={input}
      placeholder="Type your question..."
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button
      className="btn btn-primary rounded-end-pill px-4 fw-semibold"
      onClick={sendMessage}
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm text-light" role="status"></span>
      ) : (
        <i className="bi bi-send-fill"></i>
      )}
    </button>
  </div>
</div>


        {/* Completion button */}
        <div className="text-center mb-5">
          <button className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
            Mark as Completed
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
