/**
 * Auth.js - Authentication components including login, register, and profile
 */

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

// Login Form Component
export const LoginForm = ({ onToggleForm }) => {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login to CodeQuest</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="form-switch">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onToggleForm}
            disabled={loading}
          >
            Sign up
          </button>
        </div>

        <div className="social-login">
          <p>Or login with</p>
          <div className="social-buttons">
            <button type="button" className="social-button google">
              Google
            </button>
            <button type="button" className="social-button github">
              GitHub
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Register Form Component
export const RegisterForm = ({ onToggleForm }) => {
  const { register } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);

      if (!result.success) {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Your CodeQuest Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="form-switch">
          Already have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onToggleForm}
            disabled={loading}
          >
            Login
          </button>
        </div>

        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button type="button" className="social-button google">
              Google
            </button>
            <button type="button" className="social-button github">
              GitHub
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// User Profile Component
export const UserProfile = () => {
  const { user, updateProfile, logout } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || "dark",
    fontSize: user?.preferences?.fontSize || 14,
    language: user?.preferences?.language || "flutter",
    notifications: user?.preferences?.notifications || true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Only update password if new password is provided
      const profileData = {
        name: formData.name,
      };

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({ text: "New passwords do not match", type: "error" });
          setLoading(false);
          return;
        }

        if (formData.newPassword.length < 6) {
          setMessage({
            text: "New password must be at least 6 characters long",
            type: "error",
          });
          setLoading(false);
          return;
        }

        profileData.currentPassword = formData.currentPassword;
        profileData.newPassword = formData.newPassword;
      }

      const result = await updateProfile(profileData);

      if (result.success) {
        setMessage({ text: "Profile updated successfully", type: "success" });
        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({
          text: result.message || "Failed to update profile",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "An unexpected error occurred", type: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const result = await updateProfile({ preferences });

      if (result.success) {
        setMessage({
          text: "Preferences updated successfully",
          type: "success",
        });
      } else {
        setMessage({
          text: result.message || "Failed to update preferences",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "An unexpected error occurred", type: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="membership-badge">
            {user.role === "free" ? "Free Account" : "Premium Member"}
          </p>
          <p className="member-since">
            Member since {new Date(user.joined).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`tab-button ${
            activeTab === "preferences" ? "active" : ""
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`tab-button ${
            activeTab === "subscription" ? "active" : ""
          }`}
          onClick={() => setActiveTab("subscription")}
        >
          Subscription
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {activeTab === "profile" && (
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
              title="Email cannot be changed"
            />
          </div>

          <h3>Change Password</h3>

          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}

      {activeTab === "preferences" && (
        <form onSubmit={handlePreferencesUpdate} className="preferences-form">
          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={preferences.theme}
              onChange={handlePreferenceChange}
              disabled={loading}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fontSize">Font Size</label>
            <select
              id="fontSize"
              name="fontSize"
              value={preferences.fontSize}
              onChange={handlePreferenceChange}
              disabled={loading}
            >
              <option value="12">Small (12px)</option>
              <option value="14">Medium (14px)</option>
              <option value="16">Large (16px)</option>
              <option value="18">Extra Large (18px)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="language">Preferred Language</label>
            <select
              id="language"
              name="language"
              value={preferences.language}
              onChange={handlePreferenceChange}
              disabled={loading}
            >
              <option value="flutter">Flutter</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferenceChange}
              disabled={loading}
            />
            <label htmlFor="notifications">Enable Notifications</label>
          </div>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      )}

      {activeTab === "subscription" && (
        <div className="subscription-section">
          <div className="current-plan">
            <h3>Current Plan</h3>
            <div className="plan-details">
              <p className="plan-name">
                {user.role === "free" ? "Free Plan" : "Premium Plan"}
              </p>
              {user.role === "free" ? (
                <>
                  <ul className="plan-features">
                    <li>Access to basic tutorials</li>
                    <li>Limited challenges</li>
                    <li>Community support</li>
                  </ul>
                  <button className="upgrade-button">Upgrade to Premium</button>
                </>
              ) : (
                <>
                  <ul className="plan-features">
                    <li>Access to all tutorials and courses</li>
                    <li>Unlimited challenges</li>
                    <li>Priority support</li>
                    <li>Career roadmaps and guidance</li>
                    <li>Project portfolio builder</li>
                  </ul>
                  <button className="cancel-button">Cancel Subscription</button>
                </>
              )}
            </div>
          </div>

          {user.role === "free" && (
            <div className="premium-plan">
              <h3>Upgrade to Premium</h3>
              <div className="plan-details">
                <p className="plan-name">Premium Plan</p>
                <p className="plan-price">$9.99/month</p>
                <ul className="plan-features">
                  <li>Access to all tutorials and courses</li>
                  <li>Unlimited challenges</li>
                  <li>Priority support</li>
                  <li>Career roadmaps and guidance</li>
                  <li>Project portfolio builder</li>
                </ul>
                <button className="upgrade-button">Upgrade Now</button>
              </div>
            </div>
          )}

          <div className="enterprise-info">
            <h3>Enterprise Solutions</h3>
            <p>Looking for team or company-wide learning solutions?</p>
            <button className="contact-button">Contact Sales</button>
          </div>
        </div>
      )}

      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};
