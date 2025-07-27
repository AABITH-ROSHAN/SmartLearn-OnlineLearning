import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Bell, Shield, Eye, EyeOff, Save, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate learner interested in technology and programming.'
  });

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (['profile', 'notifications', 'privacy', 'security'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('profile');
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saved:', formData);
    alert('Settings saved!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className="h3 mb-4 fw-bold">Account Settings</h1>
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="bg-white shadow-sm rounded-4 p-3 d-flex flex-column gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
                    activeTab === tab.id ? 'bg-primary text-white fw-semibold' : 'btn-light text-dark'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8">
            <div className="bg-white shadow-sm rounded-4 p-4">
              {activeTab === 'profile' && (
                <>
                  <h5 className="fw-bold mb-4 text-primary">Profile Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control rounded-3" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control rounded-3" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control rounded-3" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control rounded-3" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Bio</label>
                      <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="form-control rounded-3"></textarea>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <h5 className="fw-bold mb-3 text-primary">Change Password</h5>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Current Password</label>
                    <input type={showPassword ? 'text' : 'password'} className="form-control rounded-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control rounded-3" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control rounded-3" />
                  </div>
                  <button className="btn btn-primary mb-4">
                    <Save size={16} className="me-2" /> Update Password
                  </button>

                  <div className="border-top pt-4">
                    <h6 className="text-danger fw-semibold">Danger Zone</h6>
                    <p className="text-muted small">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="btn btn-danger">
                      <Trash2 size={16} className="me-2" /> Delete Account
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'notifications' && (
                <>
                  <h5 className="fw-bold mb-4 text-primary">Notification Settings</h5>
                  <p className="text-muted">You can manage your email and push notification preferences here.</p>
                  <p>Coming soon...</p>
                </>
              )}

              {activeTab === 'privacy' && (
                <>
                  <h5 className="fw-bold mb-4 text-primary">Privacy Preferences</h5>
                  <p className="text-muted">Control what personal information is shared.</p>
                  <p>Coming soon...</p>
                </>
              )}

              <div className="d-flex justify-content-end mt-4 gap-2">
                <button className="btn btn-outline-secondary rounded-3">Cancel</button>
                <button className="btn btn-primary rounded-3" onClick={handleSave}>
                  <Save size={16} className="me-2" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
