import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, Clock, Search } from 'lucide-react';

const Courses = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) setSearchTerm(query);
    inputRef.current?.focus();
  }, [location.search]);

  const categories = ['All', 'Programming', 'Web Development', 'Data Science', 'Design'];

  const courses = [
    {
      id: '1',
      title: "Python for Beginners",
      category: "Programming",
      instructor: "Dr. James Wilson",
      price: "$99",
      originalPrice: "$149",
      rating: 4.8,
      students: 1234,
      duration: "40 hours",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      description: "Learn Python programming from scratch with hands-on projects and real-world applications.",
      level: "Beginner",
      bestseller: true
    },
    {
      id: '2',
      title: "React.js Complete Course",
      category: "Web Development",
      instructor: "Sarah Johnson",
      price: "$149",
      originalPrice: "$199",
      rating: 4.9,
      students: 2456,
      duration: "60 hours",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      description: "Master React.js and build modern web applications with hooks, context, and more.",
      level: "Intermediate",
      bestseller: false
    },
    {
      id: '3',
      title: "Data Science Fundamentals",
      category: "Data Science",
      instructor: "Dr. Michael Chen",
      price: "$129",
      originalPrice: "$179",
      rating: 4.7,
      students: 987,
      duration: "45 hours",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      description: "Learn data analysis, visualization, and machine learning basics with Python.",
      level: "Intermediate",
      bestseller: false
    },
    {
      id: '4',
      title: "UI/UX Design Masterclass",
      category: "Design",
      instructor: "Emily Davis",
      price: "$119",
      originalPrice: "$159",
      rating: 4.8,
      students: 1876,
      duration: "35 hours",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      description: "Create stunning user interfaces and experiences with modern design principles.",
      level: "Beginner",
      bestseller: true
    },
    {
      id: '5',
      title: "Digital Marketing Strategy",
      category: "Business",
      instructor: "Mark Thompson",
      price: "$89",
      originalPrice: "$129",
      rating: 4.6,
      students: 1543,
      duration: "30 hours",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      description: "Learn effective digital marketing strategies and tools to grow your business.",
      level: "Beginner",
      bestseller: false
    },
    {
      id: '6',
      title: "Node.js Backend Development",
      category: "Web Development",
      instructor: "Alex Rodriguez",
      price: "$139",
      originalPrice: "$189",
      rating: 4.7,
      students: 1098,
      duration: "50 hours",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      description: "Build robust backend applications with Node.js, Express, and MongoDB.",
      level: "Advanced",
      bestseller: false
    }
  ];

  const filteredCourses = courses.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: 'Poppins, Inter, Raleway, sans-serif' }}>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-gradient">Our Courses</h1>
          <p className="lead text-muted">Discover our professional courses designed by experts for real-world learning.</p>
        </div>

        <div className="card shadow-sm p-4 mb-4 rounded-4">
          <div className="row g-3 align-items-center">
            <div className="col-lg-6">
              <div className="input-group rounded-pill shadow-sm">
                <span className="input-group-text bg-white border-end-0 rounded-start-pill">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control border-start-0 rounded-end-pill"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6 text-end">
              <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`btn btn-sm rounded-pill fw-semibold px-3 ${
                      selectedCategory === category ? 'text-white border-0' : 'btn-outline-secondary'
                    }`}
                    style={
                      selectedCategory === category
                        ? { background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }
                        : {}
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filteredCourses.map((course) => (
            <div className="col-md-6 col-lg-4" key={course.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img src={course.image} className="card-img-top" alt={course.title} />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', color: '#fff' }}>{course.level}</span>
                    {course.bestseller && (
                      <span className="badge bg-warning text-dark">Bestseller</span>
                    )}
                  </div>
                  <h5 className="card-title fw-bold">{course.title}</h5>
                  <p className="card-text small text-muted">{course.description}</p>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span><Users size={14} className="me-1" />{course.students.toLocaleString()}</span>
                    <span><Clock size={14} className="me-1" />{course.duration}</span>
                  </div>
                  <div className="text-muted small mb-2">👨‍🏫 {course.instructor}</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-bold h5" style={{ color: '#3b82f6' }}>{course.price}</span>
                      <span className="text-decoration-line-through text-muted small ms-2">{course.originalPrice}</span>
                    </div>
                    <button
                      className="btn btn-sm rounded-pill fw-semibold"
                      style={{
                        border: '1px solid #3b82f6',
                        color: '#3b82f6',
                        background: 'transparent',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #60a5fa, #3b82f6)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#3b82f6';
                      }}
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 p-5 rounded-4 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}>
          <h2 className="h3 fw-bold mb-3">Ready to Start Learning?</h2>
          <p className="mb-4">Join thousands of learners today!</p>
          <button className="btn btn-light text-primary px-4 py-2 fw-semibold rounded-pill shadow-sm">
            Browse All Courses
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
