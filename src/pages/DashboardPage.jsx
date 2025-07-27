import React from 'react';
import Layout from '../components/Layout';
import {
  BookOpen, Clock, Award, CheckCircle, Calendar,
  MessageSquare, Play
} from 'lucide-react';

const Dashboard = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Python for Beginners',
      instructor: 'Dr. James Wilson',
      progress: 80,
      nextLesson: 'Loops & Conditions',
      dueDate: 'Aug 18, 2025',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=64&h=64&fit=crop'
    },
    {
      id: 2,
      title: 'React Complete Course',
      instructor: 'Sarah Johnson',
      progress: 60,
      nextLesson: 'Hooks & Context',
      dueDate: 'Aug 20, 2025',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=64&h=64&fit=crop'
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Python Mini Project',
      course: 'Python for Beginners',
      dueDate: 'Aug 22, 2025',
      priority: 'high'
    },
    {
      id: 2,
      title: 'React API Integration',
      course: 'React Complete Course',
      dueDate: 'Aug 25, 2025',
      priority: 'medium'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'React class postponed',
      time: '1h ago',
      unread: true
    },
    {
      id: 2,
      from: 'Admin',
      subject: 'Welcome to the platform!',
      time: '2 days ago',
      unread: false
    }
  ];

  const stats = [
    { icon: BookOpen, label: 'Courses', value: 3, color: 'primary' },
    { icon: CheckCircle, label: 'Completed Lessons', value: 12, color: 'success' },
    { icon: Clock, label: 'Study Hours', value: 56, color: 'info' },
    { icon: Award, label: 'Certificates', value: 1, color: 'warning' }
  ];

  return (
    <div>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        .btn-gradient {
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          color: white;
          border: none;
        }
        .btn-gradient:hover {
          background: linear-gradient(to right, #3b82f6, #60a5fa);
        }
        .rounded-3 {
          border-radius: 0.75rem !important;
        }
      `}</style>

      <div className="container py-5">
        <div className="mb-4">
          <h1 className="display-6 fw-bold">Welcome back, Student! 👋</h1>
          <p className="text-muted">Here's what's happening with your learning journey</p>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          {stats.map((stat, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="card shadow-sm p-3 h-100 rounded-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-1">{stat.label}</div>
                    <div className="h4 fw-bold mb-0">{stat.value}</div>
                  </div>
                  <div className={`d-flex align-items-center justify-content-center rounded-circle text-white bg-${stat.color} p-3`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses & Assignments */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">My Courses</h5>
                  <a href="#" className="text-primary small">View All</a>
                </div>
                {enrolledCourses.map(course => (
                  <div className="mb-4" key={course.id}>
                    <div className="d-flex">
                      <img src={course.image} alt={course.title} className="rounded me-3" width="64" height="64" />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{course.title}</div>
                        <div className="small text-muted mb-1">by {course.instructor}</div>
                        <div className="small d-flex justify-content-between">
                          <span>{course.progress}% Complete</span>
                          <span className="text-muted">Due: {course.dueDate}</span>
                        </div>
                        <div className="progress mt-1 rounded-pill" style={{ height: '6px' }}>
                          <div className="progress-bar bg-primary rounded-pill" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="small text-muted">Next: {course.nextLesson}</span>
                          <button className="btn btn-sm btn-gradient d-flex align-items-center rounded-pill">
                            <Play size={14} className="me-1" /> Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Upcoming Assignments</h5>
                  <a href="#" className="text-primary small">View All</a>
                </div>
                {upcomingAssignments.map(assign => (
                  <div className="mb-3" key={assign.id}>
                    <div className="border rounded-3 p-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div className="fw-semibold">{assign.title}</div>
                        <span className={`badge bg-${assign.priority === 'high' ? 'danger' : assign.priority === 'medium' ? 'warning' : 'success'}`}>
                          {assign.priority}
                        </span>
                      </div>
                      <div className="small text-muted mb-1">{assign.course}</div>
                      <div className="d-flex align-items-center small text-muted">
                        <Calendar size={14} className="me-1" /> Due: {assign.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="card shadow-sm mt-4 rounded-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Recent Messages</h5>
              <a href="#" className="text-primary small">View All</a>
            </div>
            {recentMessages.map(msg => (
              <div
                key={msg.id}
                className={`d-flex align-items-center p-3 rounded-3 mb-2 ${msg.unread ? 'bg-light border-start border-primary border-4' : ''}`}>
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: '40px', height: '40px' }}>
                  <MessageSquare size={18} />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <strong className={msg.unread ? 'text-primary' : ''}>{msg.from}</strong>
                    <span className="text-muted small">{msg.time}</span>
                  </div>
                  <div className="small text-muted">{msg.subject}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
