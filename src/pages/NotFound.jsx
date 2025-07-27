import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3">
      <div className="text-center w-100" style={{ maxWidth: '600px' }}>
        
        {/* Illustration */}
        <div className="mb-4">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-4 shadow"
            style={{ width: '5rem', height: '5rem' }}
          >
            <Search className="text-white" size={30} />
          </div>
          <div className="display-1 fw-bold text-primary">404</div>
        </div>

        {/* Heading & Message */}
        <h1 className="h2 fw-bold text-dark mb-3">Oops! Page Not Found</h1>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
          <Link
            to="/"
            className="btn btn-primary d-flex align-items-center justify-content-center rounded-pill shadow-sm px-4"
          >
            <Home className="me-2" size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center rounded-pill shadow-sm px-4"
          >
            <ArrowLeft className="me-2" size={16} />
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-4 shadow-sm p-4">
          <h2 className="h5 fw-bold text-dark mb-3">Popular Pages</h2>
          <div className="row">
            {[
              { name: 'Browse Courses', href: '/courses', icon: BookOpen },
              { name: 'Dashboard', href: '/dashboard', icon: Home },
              { name: 'Instructors', href: '/instructors', icon: Search },
              { name: 'Contact Us', href: '/contact', icon: Home }
            ].map((link, i) => {
              const Icon = link.icon;
              return (
                <div key={i} className="col-12 col-sm-6 mb-3">
                  <Link
                    to={link.href}
                    className="d-flex align-items-center text-decoration-none p-3 border rounded-3 hover-shadow-sm transition-all bg-light-hover"
                  >
                    <div
                      className="me-3 d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
                      style={{ width: '2.5rem', height: '2.5rem' }}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="fw-medium text-dark">{link.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Prompt */}
        <p className="text-muted mt-4">
          If you believe this is an error, please{' '}
          <Link to="/contact" className="text-decoration-none text-primary fw-medium">
            contact our support team
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
