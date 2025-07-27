import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  MapPin, Phone, Mail, Clock,
  Send, MessageSquare, CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Education Street", "Learning City, LC 12345", "United States"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@studycourse.com", "support@studycourse.com"]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon–Fri: 9 AM – 6 PM", "Sat: 10 AM – 4 PM", "Sun: Closed"]
    }
  ];

  return (
    <Layout>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        .btn-gradient {
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          color: #fff;
          border: none;
          font-weight: 500;
        }
        .btn-gradient:hover {
          background: linear-gradient(to right, #3b82f6, #60a5fa);
        }
        .rounded-4 {
          border-radius: 1rem !important;
        }
        .rounded-3 {
          border-radius: 0.75rem !important;
        }
      `}</style>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Contact Us</h1>
          <p className="lead text-muted">
            Get in touch with our team — we’re here to help you succeed in your learning journey!
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm rounded-4 p-4">
              <div className="d-flex align-items-center mb-3">
                <MessageSquare className="me-2 text-primary" />
                <h5 className="mb-0 fw-bold">Send us a Message</h5>
              </div>

              {isSubmitted ? (
                <div className="text-center py-5">
                  <CheckCircle size={48} className="text-success mb-3" />
                  <h4 className="fw-semibold">Message Sent!</h4>
                  <p className="text-muted">Thanks for reaching out. We'll respond shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control rounded-3"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control rounded-3"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select rounded-3"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback & Suggestions</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="form-control rounded-3"
                      placeholder="How can we assist you?"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient w-100 d-flex align-items-center justify-content-center rounded-3"
                  >
                    <Send className="me-2" size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6">
            <div className="d-grid gap-3">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="card shadow-sm p-3 rounded-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: 48, height: 48 }}
                    >
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-2">{info.title}</h6>
                      {info.details.map((line, i) => (
                        <p key={i} className="text-muted small mb-1">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="card shadow-sm p-3 rounded-4">
                <h6 className="fw-bold mb-3">Follow Us</h6>
                <div className="d-flex gap-2">
                  {['F', 'T', 'L', 'I'].map((icon, i) => (
                    <div
                      key={i}
                      className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: 40, height: 40 }}
                    >
                      <strong>{icon}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-primary text-white p-4 rounded-4 shadow-sm">
                <h6 className="fw-bold mb-2">Need Immediate Help?</h6>
                <p className="small">Our support team is available 24/7 to assist you with any questions or issues.</p>
                <button className="btn btn-light text-primary fw-semibold rounded-3">Live Chat Support</button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card mt-5 p-4 rounded-4 shadow-sm">
          <h4 className="text-center fw-bold mb-4">Frequently Asked Questions</h4>
          <div className="row g-4">
            {[
              {
                question: "How do I enroll in a course?",
                answer: "Simply browse our courses, select one, and click 'Enroll Now'. Follow the payment steps to start learning."
              },
              {
                question: "Can I access courses on mobile?",
                answer: "Yes! Our platform is fully responsive and optimized for all devices including smartphones and tablets."
              },
              {
                question: "Do you offer certificates?",
                answer: "Yes. After completing any course, you'll receive a downloadable certificate of completion."
              },
              {
                question: "What if I need help with a course?",
                answer: "You can message your instructor or contact support anytime through this contact page."
              }
            ].map((faq, i) => (
              <div className="col-md-6" key={i}>
                <h6 className="fw-semibold mb-1">{faq.question}</h6>
                <p className="text-muted small mb-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
