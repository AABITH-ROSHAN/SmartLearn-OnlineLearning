// Layout.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Instructors", href: "/instructors", icon: Users },
    { name: "Assignments", href: "/assignments", icon: BookOpen },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearchClick = () => {
    navigate("/courses");
  };

  const handleNotificationClick = () => {
    navigate("/settings#notifications");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-md bg-white border-bottom shadow-sm sticky-top rounded-bottom px-4 py-2">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* Logo */}
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
              <div
                className="bg-primary text-white rounded d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
              >
                <BookOpen size={18} />
              </div>
              <span className="fw-bold">SmartLearn</span>
            </Link>

            {/* Mobile Controls */}
            <div className="d-md-none d-flex align-items-center gap-2">
              <button
                className="btn btn-light rounded-circle"
                onClick={handleSearchClick}
              >
                <Search size={16} />
              </button>
              <button
                className="btn btn-light rounded-circle"
                onClick={handleNotificationClick}
              >
                <Settings size={16} />
              </button>
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Collapsible Navbar */}
          <div
            className={`collapse navbar-collapse mt-3 mt-md-0 ${
              isMobileMenuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-md-4 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li className="nav-item w-100" key={item.name}>
                    <Link
                      to={item.href}
                      className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                        isActive(item.href)
                          ? "active fw-semibold text-primary bg-light"
                          : "text-dark"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={16} />
                      <span className="d-md-inline d-none">{item.name}</span>
                      <span className="d-md-none">{item.name.substring(0, 4)}…</span>
                    </Link>
                  </li>
                );
              })}

              {/* ✅ Logout - Mobile only */}
              <li className="nav-item d-md-none w-100">
                <button
                  onClick={handleLogout}
                  className="nav-link text-danger d-flex align-items-center gap-2 px-3 py-2 rounded w-100"
                  style={{ border: "none", background: "none" }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>

            {/* ✅ Desktop controls (Logout removed) */}
            <div className="d-none d-md-flex align-items-center gap-3 ms-auto">
              <button
                className="btn btn-light position-relative rounded-circle"
                onClick={handleSearchClick}
              >
                <Search size={16} />
              </button>
              <button
                className="btn btn-light position-relative rounded-circle"
                onClick={handleNotificationClick}
              >
                <Bell size={16} />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>
              <Link to="/settings" className="btn btn-light rounded-circle">
                <Settings size={16} />
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-light position-relative rounded-circle text-danger"
                title="Logout"
              >
                <LogOut size={16} />
              </button>

              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
              >
                <User size={16} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-top mt-auto py-4 rounded-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="d-flex align-items-center mb-2">
                <div
                  className="bg-primary text-white rounded d-flex align-items-center justify-content-center me-2"
                  style={{ width: 32, height: 32 }}
                >
                  <BookOpen size={18} />
                </div>
                <span className="fw-bold">StudyCourse</span>
              </div>
              <p className="text-muted">
                Empowering learners worldwide with high-quality online education and expert instruction.
              </p>
              <div className="d-flex gap-2">
                {["f", "t", "in"].map((social, index) => (
                  <div
                    key={index}
                    className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40, cursor: "pointer" }}
                  >
                    <span className="fw-bold">{social}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="fw-semibold">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/courses" className="text-muted text-decoration-none">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/instructors" className="text-muted text-decoration-none">
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted text-decoration-none">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="fw-semibold">Support</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-top pt-3 text-center text-muted">
            &copy; 2024 StudyCourse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
