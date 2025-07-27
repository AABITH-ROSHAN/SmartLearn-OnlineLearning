// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import Courses from "./pages/CoursePage";
import Instructors from "./pages/InstructorPage";
import Assignments from "./pages/AssignmentsPage";
import Messages from "./pages/MessagePage";
import Contact from "./pages/ContactPage";
import Settings from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Loginpage from "./Entrypages/Loginpage";
import Signuppage from "./Entrypages/Registerpage";
import ForgotPasswordPage from "./Entrypages/ForgotPasswordPage";
import VideoCoursePage from "./pages/CourseDetails"; // Correct import

const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ children }) => (
  isAuthenticated() ? children : <Navigate to="/login" />
);

const PublicRoute = ({ children }) => (
  isAuthenticated() ? <Navigate to="/home" /> : children
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PublicRoute><Loginpage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signuppage /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/instructors" element={<ProtectedRoute><Instructors /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Video course route */}
      <Route path="/courses/:id" element={<ProtectedRoute><VideoCoursePage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
