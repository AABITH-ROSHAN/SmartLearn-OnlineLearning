import React from 'react';
import Layout from '../components/Layout';
import { Star, BookOpen, Users, Award } from 'lucide-react';

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Dr. James Wilson",
      role: "Programming Expert",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Ph.D in Computer Science with 15+ years of teaching experience. Specializes in Python, Java, and software engineering best practices.",
      courses: 15,
      students: 12500,
      rating: 4.9,
      specialties: ["Python", "Java", "Software Engineering", "Algorithms"],
      experience: "15+ years"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Web Development Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Full-stack developer and educator with expertise in modern web technologies. Previously worked at top tech companies like Google and Facebook.",
      courses: 12,
      students: 8900,
      rating: 4.8,
      specialties: ["React", "Node.js", "JavaScript", "MongoDB"],
      experience: "10+ years"
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      role: "Data Science Leader",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Data scientist with Ph.D in Statistics. Expert in machine learning, statistical analysis, and data visualization with industry experience at top companies.",
      courses: 8,
      students: 6700,
      rating: 4.9,
      specialties: ["Machine Learning", "Python", "R", "Statistics"],
      experience: "12+ years"
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "UI/UX Design Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Award-winning designer with 10+ years in UI/UX design. Led design teams at Fortune 500 companies and has won multiple design awards.",
      courses: 10,
      students: 7800,
      rating: 4.8,
      specialties: ["UI Design", "UX Research", "Figma", "Design Systems"],
      experience: "10+ years"
    },
    {
      id: 5,
      name: "Mark Thompson",
      role: "Business Strategy Guru",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
      bio: "MBA from Harvard Business School. Former consultant helping businesses grow through digital transformation and strategic planning.",
      courses: 6,
      students: 5400,
      rating: 4.7,
      specialties: ["Digital Marketing", "Business Strategy", "Analytics", "Growth Hacking"],
      experience: "8+ years"
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      role: "Backend Development Pro",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
      bio: "Senior software engineer with expertise in backend systems, cloud architecture, and DevOps practices. Worked at leading tech startups.",
      courses: 9,
      students: 6200,
      rating: 4.8,
      specialties: ["Node.js", "AWS", "Docker", "API Development"],
      experience: "9+ years"
    }
  ];

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Meet Our Expert Instructors</h1>
          <p className="lead text-muted">Learn from industry professionals who are passionate about teaching and sharing their expertise.</p>
        </div>

        <div className="row g-4">
          {instructors.map(instructor => (
            <div key={instructor.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm rounded-4 overflow-hidden transition-all">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="card-img-top rounded-top-4" 
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{instructor.name}</h5>
                  <h6 className="text-primary mb-2">{instructor.role}</h6>
                  <p className="text-muted small">{instructor.bio}</p>

                  <div className="row text-center py-3 border-top">
                    <div className="col">
                      <BookOpen size={16} className="text-primary mb-1" />
                      <div className="fw-bold">{instructor.courses}</div>
                      <small className="text-muted">Courses</small>
                    </div>
                    <div className="col">
                      <Users size={16} className="text-success mb-1" />
                      <div className="fw-bold">{instructor.students.toLocaleString()}</div>
                      <small className="text-muted">Students</small>
                    </div>
                    <div className="col">
                      <Award size={16} className="text-warning mb-1" />
                      <div className="fw-bold">{instructor.experience}</div>
                      <small className="text-muted">Experience</small>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="mb-1 fw-semibold">Specialties:</p>
                    {instructor.specialties.map((spec, idx) => (
                      <span key={idx} className="badge bg-primary-subtle text-primary me-1 mb-1 rounded-pill">{spec}</span>
                    ))}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <button className="btn btn-outline-primary w-100 rounded-pill fw-semibold">
                    View Courses
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-5 text-center text-white rounded-4" style={{ background: 'linear-gradient(to right, #60a5fa, #3b82f6)' }}>
          <h2 className="fw-bold mb-3">Want to Become an Instructor?</h2>
          <p className="mb-4">Join our community of expert educators and share your knowledge with students worldwide!</p>
          <button className="btn btn-light text-primary px-4 py-2 fw-semibold rounded-pill shadow-sm">
            Apply to Teach
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Instructors;
