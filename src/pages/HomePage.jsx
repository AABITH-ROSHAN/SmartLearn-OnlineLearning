import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Play } from 'lucide-react';
import {
  Users,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  Shield,
  Search
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredCourses = [
    {
      id: 1,
      title: "Python for Everyone",
      description: "Master Python programming from basics to advanced concepts",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      price: "$99",
      originalPrice: "$149",
      students: "12,543",
      rating: 4.8,
      duration: "40 hours",
      instructor: "Dr. James Wilson",
      level: "Beginner"
    },
    {
      id: 2,
      title: "React.js Complete Course",
      description: "Build modern web applications with React and JavaScript",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      price: "$129",
      originalPrice: "$199",
      students: "8,921",
      rating: 4.9,
      duration: "55 hours",
      instructor: "Sarah Johnson",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Learn data analysis, visualization, and machine learning",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      price: "$149",
      originalPrice: "$229",
      students: "6,432",
      rating: 4.7,
      duration: "65 hours",
      instructor: "Dr. Michael Chen",
      level: "Intermediate"
    }
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Active Students" },
    { icon: BookOpen, value: "150+", label: "Expert Courses" },
    { icon: Award, value: "25+", label: "Industry Experts" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Certified Learning",
      description: "Get industry-recognized certificates upon completion"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from professionals with real-world experience"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Study at your own pace, anytime, anywhere"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  console.log(handleLogout);

  return (
    <Layout>

      {/* Hero Section */}
        <section className="position-relative py-5 overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {/* Floating Circles */}
          <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">

            {/* ✅ These 3 right-side bubbles will show on all devices */}
            <div className="position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '24rem', height: '24rem', top: '1rem', right: '2rem',
                animation: 'float 6s ease-in-out infinite'
              }} />


            <div className="position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '12rem', height: '12rem', bottom: '1rem', right: '4rem',
                animation: 'float 8s ease-in-out infinite', animationDelay: '3s'
              }} />

            {/* ❌ These bubbles are hidden on mobile (shown only on lg and up) */}
            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '8rem', height: '8rem', top: '33%', left: '25%',
                animation: 'float 6s ease-in-out infinite', animationDelay: '2s'
              }} />

            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '16rem', height: '16rem', top: '10rem', right: '8rem',
                animation: 'float 7s ease-in-out infinite', animationDelay: '1s'
              }} />

            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '6rem', height: '6rem', bottom: '33%', left: '5rem',
                animation: 'float 7s ease-in-out infinite', animationDelay: '4s'
              }} />

            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '4rem', height: '4rem', top: '20%', left: '33%',
                animation: 'float 6s ease-in-out infinite', animationDelay: '1.5s'
              }} />

            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '5rem', height: '5rem', top: '76%', right: '33%',
                animation: 'float 8s ease-in-out infinite', animationDelay: '2.5s'
              }} />

            <div className="d-none d-lg-block position-absolute bg-primary rounded-circle opacity-25"
              style={{
                width: '3rem', height: '3rem', bottom: '4%', left: '50%',
                animation: 'float 7s ease-in-out infinite', animationDelay: '3.5s'
              }} />
          </div>

          <div className="container position-relative z-1">
            <div className="row align-items-center">
              <div className="col-lg-6 text-start">
                <h1 className="display-3 fw-bold mb-4">
                  ONLINE <br />
                  <span className="text-primary">EDUCATION</span>
                </h1>
                <h2 className="h4 fw-semibold mb-3">YOUR WAY TO KNOWLEDGE</h2>
                <p className="lead mb-4 text-secondary">Learn anytime, from anywhere, and gain industry-ready skills with our comprehensive online courses designed by experts.</p>

                <form className="d-flex gap-2 mb-4" onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control rounded-start-pill px-3 py-2 shadow-sm"
                    placeholder="Search courses..."
                    style={{ maxWidth: '280px', fontSize: '0.95rem' }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center rounded-end-pill px-4 py-2 shadow-sm"
                  >
                    <Search size={16} className="me-1" />
                  </button>
                </form>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/courses"
                    className="btn btn-primary px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
                  >
                    <Play size={16} /> LEARN MORE
                  </Link>
                  <Link
                    to="/courses"
                    className="btn btn-outline-primary px-4 py-2 rounded-pill border-primary text-primary shadow-sm"
                  >
                    View Courses
                  </Link>
                </div>
              </div>

              <div className="col-lg-6 d-none d-lg-block text-end">
                <img
                  src="/assets/heroman.png"
                  alt="Professional learning online"
                  className="img-fluid rounded-4 shadow"
                  style={{
                    maxWidth: "550px",
                    marginLeft: "auto"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-5 bg-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div className="col-6 col-lg-3 mb-4" key={index}>
                  <div className="bg-white rounded-4 shadow-sm p-4">
                    <Icon size={32} className="text-primary mb-2" />
                    <h3 className="fw-bold">{stat.value}</h3>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
<section className="py-5 bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold">Featured Courses</h2>
      <p className="text-muted">Discover our most popular courses designed by industry experts</p>
    </div>
    <div className="row">
      {featuredCourses.map(course => (
        <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
          <div className="card h-100 shadow-sm rounded-4">
            <img src={course.image} className="card-img-top rounded-top-4" alt={course.title} />
            <div className="card-body">
              <h5 className="card-title fw-bold">{course.title}</h5>
              <p className="card-text text-muted">{course.description}</p>
              <p className="text-muted">
                <Users size={16} /> {course.students} | <Clock size={16} /> {course.duration}
              </p>
              <p className="h5 text-primary">
                {course.price}{' '}
                <span className="text-muted text-decoration-line-through h6">
                  {course.originalPrice}
                </span>
              </p>

              {/* Enroll Now Button */}
              <Link
                to={`/courses/`} // Assuming dynamic routing is used for course details
                className="btn btn-primary w-100 mt-2 rounded-pill text-white"
                style={{
                  background: "linear-gradient(to right,  #60a5fa, #3b82f6)",
                  border: "none",
                }}
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-4">
      <Link to="/courses" className="btn btn-outline-secondary rounded-pill">
        View All Courses <BookOpen className="ms-2" size={18} />
      </Link>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-5 bg-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose StudyCourse?</h2>
            <p className="text-muted">We provide everything you need for a successful learning journey</p>
          </div>
          <div className="row">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100">
                    <div className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 64, height: 64, background: 'linear-gradient(to right, #60a5fa, #3b82f6)' }}>
                      <Icon size={28} />
                    </div>
                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center text-white rounded-4 mx-3 my-4" style={{ background: 'linear-gradient(to right, #60a5fa, #3b82f6)', fontFamily: 'Poppins, sans-serif' }}>
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h2>
          <p className="mb-4">Join thousands of students who are already advancing their careers with our courses</p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/dashboard" className="btn btn-light text-primary fw-semibold rounded-pill">Start Learning Today</Link>
            <Link to="/contact" className="btn btn-outline-light rounded-pill">Contact Us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
