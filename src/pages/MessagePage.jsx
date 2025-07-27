import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Dr. James Wilson",
      role: "Python Instructor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      lastMessage: "Great progress on your Python project! Keep it up.",
      time: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "React.js Expert",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c44c?w=50&h=50&fit=crop",
      lastMessage: "The assignment feedback is now available in your dashboard.",
      time: "1 hour ago",
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: "Study Group: Data Science",
      role: "5 members",
      avatar: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=50&h=50&fit=crop",
      lastMessage: "Alice: Anyone working on the visualization project?",
      time: "3 hours ago",
      unread: 1,
      online: false
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      role: "Data Science Lead",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
      lastMessage: "Excellent work on the data analysis report!",
      time: "1 day ago",
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=50&h=50&fit=crop",
      lastMessage: "Thanks for the feedback! I'll update the UI.",
      time: "2 days ago",
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. James Wilson",
      content: "Hi! I wanted to follow up on your Python calculator project. How's it going?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hello Dr. Wilson! I'm making good progress...",
      time: "10:45 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Dr. James Wilson",
      content: "That's excellent! Have you considered edge cases like division by zero?",
      time: "10:50 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Yes, I've added checks for invalid inputs too. Should I add more features?",
      time: "11:00 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Dr. James Wilson",
      content: "Focus on quality over quantity! 🎉",
      time: "11:15 AM",
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="row rounded-4 overflow-hidden shadow-sm bg-white">
          {/* Sidebar */}
          <div className="col-md-4 border-end px-4 py-3 bg-light-subtle">
            <h5 className="fw-bold mb-3">Message</h5>
            <div className="mb-3">
              <div className="input-group rounded-3">
                <span className="input-group-text bg-white"><Search size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search conversations..."
                />
              </div>
            </div>
            <div className="list-group border-0">
              {conversations.map(convo => (
                <button
                  key={convo.id}
                  className={`list-group-item list-group-item-action rounded-3 mb-2 border ${selectedChat === convo.id ? 'active' : ''}`}
                  onClick={() => setSelectedChat(convo.id)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <img src={convo.avatar} alt={convo.name} className="rounded-circle" width="40" height="40" />
                      <div>
                        <div className="fw-semibold">{convo.name}</div>
                        <small className="text-muted">{convo.role}</small>
                      </div>
                    </div>
                    {convo.unread > 0 && (
                      <span className="badge bg-primary rounded-pill">{convo.unread}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-md-8 d-flex flex-column p-0">
            {selectedConversation ? (
              <>
                <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <img src={selectedConversation.avatar} className="rounded-circle" width="40" height="40" alt={selectedConversation.name} />
                    <div>
                      <div className="fw-semibold">{selectedConversation.name}</div>
                      <small className="text-muted">{selectedConversation.role}</small>
                    </div>
                  </div>
                  <div className="btn-group gap-1">
                    <button className="btn btn-outline-secondary btn-sm rounded-circle"><Info size={16} /></button>
                    <button className="btn btn-outline-secondary btn-sm rounded-circle"><MoreVertical size={16} /></button>
                  </div>
                </div>

                <div className="flex-grow-1 overflow-auto p-4 bg-light" style={{ maxHeight: '60vh' }}>
                  {messages.map(msg => (
                    <div className={`d-flex ${msg.isOwn ? 'justify-content-end' : 'justify-content-start'} mb-3`} key={msg.id}>
                      <div
                        className={`p-3 rounded-4 shadow-sm ${msg.isOwn ? 'bg-primary text-white' : 'bg-white border'}`}
                        style={{ maxWidth: '75%' }}
                      >
                        <div>{msg.content}</div>
                        <div className="small text-muted mt-1">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="border-top p-3 bg-white">
                  <div className="input-group rounded-3 shadow-sm">
                    <span className="input-group-text bg-white border-end-0"><Paperclip size={16} /></span>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="form-control border-start-0 border-end-0"
                      placeholder="Type your message..."
                    />
                    <span className="input-group-text bg-white border-start-0 border-end-0"><Smile size={16} /></span>
                    <button className="btn btn-gradient rounded-end" type="submit" disabled={!newMessage.trim()}>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                <div className="text-center">
                  <h5>Select a conversation</h5>
                  <p className="text-muted">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
