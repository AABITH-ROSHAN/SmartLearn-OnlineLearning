import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Star,
} from 'lucide-react';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const assignments = {
    pending: [
      {
        id: 1,
        title: "Python Calculator Project",
        course: "Python for Beginners",
        instructor: "Dr. James Wilson",
        dueDate: "Dec 15, 2024",
        priority: "high",
        description: "Create a fully functional calculator using Python with error handling and advanced operations.",
        points: 100,
        timeLeft: "3 days"
      },
      {
        id: 2,
        title: "React Component Design",
        course: "React.js Complete Course",
        instructor: "Sarah Johnson",
        dueDate: "Dec 18, 2024",
        priority: "medium",
        description: "Build a reusable React component library with props, state management, and documentation.",
        points: 80,
        timeLeft: "6 days"
      },
      {
        id: 3,
        title: "Data Visualization Project",
        course: "Data Science Fundamentals",
        instructor: "Dr. Michael Chen",
        dueDate: "Dec 22, 2024",
        priority: "low",
        description: "Create interactive charts and dashboards using Python libraries like Matplotlib and Plotly.",
        points: 120,
        timeLeft: "10 days"
      }
    ],
    submitted: [
      {
        id: 4,
        title: "HTML/CSS Portfolio Website",
        course: "Web Development Basics",
        instructor: "Sarah Johnson",
        submittedDate: "Dec 5, 2024",
        grade: "A-",
        feedback: "Excellent work! Clean code and responsive design. Consider adding more interactive elements.",
        points: 85,
        maxPoints: 100
      },
      {
        id: 5,
        title: "Python Functions & Modules",
        course: "Python for Beginners",
        instructor: "Dr. James Wilson",
        submittedDate: "Dec 1, 2024",
        grade: "B+",
        feedback: "Good understanding of functions. Work on error handling and documentation.",
        points: 78,
        maxPoints: 90
      }
    ],
    completed: [
      {
        id: 6,
        title: "JavaScript Fundamentals Quiz",
        course: "JavaScript Essentials",
        instructor: "Mark Rodriguez",
        completedDate: "Nov 28, 2024",
        grade: "A",
        points: 95,
        maxPoints: 100
      },
      {
        id: 7,
        title: "Database Design Project",
        course: "Database Management",
        instructor: "Lisa Park",
        completedDate: "Nov 25, 2024",
        grade: "A-",
        points: 88,
        maxPoints: 100
      },
      {
        id: 8,
        title: "UI Design Challenge",
        course: "UI/UX Design Masterclass",
        instructor: "Emily Davis",
        completedDate: "Nov 20, 2024",
        grade: "A+",
        points: 98,
        maxPoints: 100
      }
    ]
  };

  const tabNames = {
    pending: "Pending",
    submitted: "Submitted",
    completed: "Completed"
  };

  return (
    <Layout>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        .btn-gradient {
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          color: #fff;
          border: none;
        }
        .btn-gradient:hover {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        .nav-pills .nav-link.active {
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          color: white;
          font-weight: 600;
        }
        .nav-pills .nav-link {
          border-radius: 50px;
          font-weight: 500;
        }
        .card {
          border-radius: 1rem;
        }
      `}</style>

      <div className="container py-5">
        <div className="mb-4">
          <h1 className="h3 fw-bold text-primary" style={{ fontFamily: 'Poppins' }}>Assignments</h1>
          <p className="text-muted">Track your assignments, submissions, and grades</p>
        </div>

        {/* Tab Navigation */}
        <ul className="nav nav-pills mb-4 gap-2">
          {Object.keys(tabNames).map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabNames[tab]} ({assignments[tab].length})
              </button>
            </li>
          ))}
        </ul>

        {/* Assignment Cards */}
        <div className="row gy-4">
          {assignments[activeTab].length === 0 && (
            <div className="text-center py-5">
              <div className="mb-3">
                <FileText size={40} className="text-secondary" />
              </div>
              <h4>No assignments found</h4>
              <p className="text-muted">You don't have any {tabNames[activeTab]} assignments at the moment.</p>
            </div>
          )}

          {assignments[activeTab].map((a) => (
            <div className="col-12" key={a.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title fw-semibold mb-1">{a.title}</h5>
                      <div className="text-muted small">{a.course} | {a.instructor}</div>
                    </div>
                    {a.grade && (
                      <span className="badge bg-success fs-6">{a.grade}</span>
                    )}
                  </div>

                  {a.description && <p className="card-text mb-2">{a.description}</p>}

                  <div className="d-flex flex-wrap gap-3 text-muted small">
                    {a.dueDate && <div><Calendar size={16} className="me-1" /> Due: {a.dueDate}</div>}
                    {a.submittedDate && <div><CheckCircle size={16} className="me-1" /> Submitted: {a.submittedDate}</div>}
                    {a.completedDate && <div><Star size={16} className="me-1 text-warning" /> Completed: {a.completedDate}</div>}
                    {a.timeLeft && <div><Clock size={16} className="me-1 text-info" /> {a.timeLeft} remaining</div>}
                    <div><FileText size={16} className="me-1" /> {a.points} points</div>
                  </div>

                  {a.feedback && (
                    <div className="mt-3 border-start ps-3 border-info">
                      <h6 className="text-info">Instructor Feedback</h6>
                      <p className="text-muted small mb-0">{a.feedback}</p>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent border-top-0 text-end">
                  {activeTab === 'pending' && (
                    <button className="btn btn-gradient px-4 py-2 rounded-pill">Start Assignment</button>
                  )}
                  {activeTab === 'submitted' && (
                    <button className="btn btn-outline-secondary px-4 py-2 rounded-pill">View Submission</button>
                  )}
                  {activeTab === 'completed' && (
                    <button className="btn btn-outline-success px-4 py-2 rounded-pill">View Details</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;
