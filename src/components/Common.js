/**
 * Common.js - Common UI components for the CodeQuest platform
 *
 * This file implements reusable UI components used throughout the application.
 */

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

// Navbar Component
export const Navbar = ({ onNavigate }) => {
  const { user, isAuthenticated, logout } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    onNavigate("home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate("home")}>
        <span className="logo-text">CodeQuest</span>
      </div>

      <div
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="toggle-icon">{mobileMenuOpen ? "✕" : "☰"}</span>
      </div>

      <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
        <li className="nav-item">
          <button onClick={() => onNavigate("learn")}>Learn</button>
        </li>
        <li className="nav-item">
          <button onClick={() => onNavigate("challenges")}>Challenges</button>
        </li>
        <li className="nav-item">
          <button onClick={() => onNavigate("projects")}>Projects</button>
        </li>
        <li className="nav-item">
          <button onClick={() => onNavigate("leaderboard")}>Leaderboard</button>
        </li>

        {isAuthenticated ? (
          <>
            <li className="nav-item profile-dropdown">
              <div className="profile-trigger">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="username">{user.name}</span>
                <span className="dropdown-arrow">▼</span>
              </div>

              <div className="dropdown-menu">
                <button onClick={() => onNavigate("profile")}>Profile</button>
                <button onClick={() => onNavigate("dashboard")}>
                  Dashboard
                </button>
                <button onClick={() => onNavigate("settings")}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item auth-button">
              <button
                className="login-button"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item auth-button">
              <button
                className="signup-button"
                onClick={() => onNavigate("register")}
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>CodeQuest</h3>
          <p>
            Learn coding through interactive lessons, challenges, and projects.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              Twitter
            </a>
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
            <a href="#" className="social-link">
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Learn</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Flutter</a>
            </li>
            <li>
              <a href="#">JavaScript</a>
            </li>
            <li>
              <a href="#">Python</a>
            </li>
            <li>
              <a href="#">Java</a>
            </li>
            <li>
              <a href="#">View All Courses</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Cheatsheets</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">API</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CodeQuest. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Dashboard Stats Component
export const DashboardStats = ({ stats }) => {
  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-value">{stats.xp || 0}</div>
        <div className="stat-label">XP Points</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔥</div>
        <div className="stat-value">{stats.streak || 0}</div>
        <div className="stat-label">Day Streak</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✓</div>
        <div className="stat-value">
          {stats.completedChallenges?.length || 0}
        </div>
        <div className="stat-label">Challenges</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-value">{stats.completedLessons?.length || 0}</div>
        <div className="stat-label">Lessons</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏆</div>
        <div className="stat-value">{stats.level || 1}</div>
        <div className="stat-label">Level</div>
      </div>
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ value, max, label }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="progress-bar-container">
      <div className="progress-label">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Badge Component
export const Badge = ({ type, label, earned = false, onClick }) => {
  return (
    <div
      className={`badge ${type} ${earned ? "earned" : "locked"}`}
      onClick={onClick}
    >
      <div className="badge-icon">
        {type === "streak" && "🔥"}
        {type === "challenge" && "🏆"}
        {type === "lesson" && "📚"}
        {type === "project" && "🚀"}
        {type === "level" && "⭐"}
        {!earned && <div className="locked-overlay">🔒</div>}
      </div>
      <div className="badge-label">{label}</div>
    </div>
  );
};

// Toast Notification Component
export const Toast = ({
  message,
  type = "info",
  onClose,
  autoClose = true,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        {type === "success" && <span className="toast-icon">✓</span>}
        {type === "error" && <span className="toast-icon">✕</span>}
        {type === "info" && <span className="toast-icon">ℹ</span>}
        {type === "warning" && <span className="toast-icon">⚠</span>}

        <span className="toast-message">{message}</span>
      </div>

      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "medium", label = "Loading..." }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="loading-spinner"></div>
      {label && <div className="loading-label">{label}</div>}
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ icon, title, message, actionLabel, onAction }) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}

      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>

      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Achievement Notification Component
export const AchievementNotification = ({ achievement, onClose }) => {
  return (
    <div className="achievement-notification">
      <div className="achievement-icon">🏆</div>

      <div className="achievement-content">
        <h3 className="achievement-title">Achievement Unlocked!</h3>
        <p className="achievement-name">{achievement.name}</p>
        <p className="achievement-description">{achievement.description}</p>

        {achievement.xpReward > 0 && (
          <div className="achievement-reward">
            <span className="xp-icon">⭐</span>
            <span className="xp-value">+{achievement.xpReward} XP</span>
          </div>
        )}
      </div>

      <button className="achievement-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};
