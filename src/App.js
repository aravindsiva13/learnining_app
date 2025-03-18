/**
 * App.js - Main application component for CodeQuest
 *
 * This is the main application component that handles routing and the overall
 * structure of the CodeQuest platform.
 */

import React, { useState, useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";

// Import components
import { LoginForm, RegisterForm, UserProfile } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { CodeEditor, CodeComparison } from "./components/CodeEditor";
import {
  LessonViewer,
  AITutor,
  LearningPath,
  LanguageSelection,
} from "./components/Learning";
import {
  ChallengeList,
  ChallengeDetail,
  DebuggingChallenge,
  Leaderboard,
} from "./components/Challenges";
import {
  ProjectList,
  ProjectDetail,
  ProjectCollaboration,
} from "./components/Projects";
import { Navbar, Footer, Modal, Toast } from "./components/Common";

// Main App Component wrapped with context provider
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

// App content with access to context
const AppContent = () => {
  const { isAuthenticated, loading } = useContext(AppContext);

  // State for routing and UI
  const [currentPage, setCurrentPage] = useState("home");
  const [pageParams, setPageParams] = useState({});
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, content: null });

  // Handle navigation
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  // Show toast notification
  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 5000);
  };

  // Show modal
  const showModal = (title, content, footer = null) => {
    setModal({
      isOpen: true,
      title,
      content,
      footer,
    });
  };

  // Close modal
  const closeModal = () => {
    setModal((prevModal) => ({ ...prevModal, isOpen: false }));
  };

  // Render current page content
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;

      case "login":
        return (
          <div className="auth-page">
            <LoginForm onToggleForm={() => handleNavigate("register")} />
          </div>
        );

      case "register":
        return (
          <div className="auth-page">
            <RegisterForm onToggleForm={() => handleNavigate("login")} />
          </div>
        );

      case "profile":
        return (
          <div className="profile-page">
            <UserProfile />
          </div>
        );

      case "dashboard":
        return (
          <div className="dashboard-page">
            <Dashboard onNavigate={handleNavigate} />
          </div>
        );

      case "learn":
        return (
          <div className="learn-page">
            {pageParams.lessonId ? (
              <LessonViewer lessonId={pageParams.lessonId} />
            ) : pageParams.languageId ? (
              <LearningPath languageId={pageParams.languageId} />
            ) : (
              <LanguageSelection
                onSelect={(languageId) =>
                  handleNavigate("learn", { languageId })
                }
              />
            )}
          </div>
        );

      case "challenges":
        return (
          <div className="challenges-page">
            {pageParams.challengeId ? (
              pageParams.debug ? (
                <DebuggingChallenge challengeId={pageParams.challengeId} />
              ) : (
                <ChallengeDetail challengeId={pageParams.challengeId} />
              )
            ) : (
              <ChallengeList
                onSelectChallenge={(challengeId) =>
                  handleNavigate("challenges", { challengeId })
                }
              />
            )}
          </div>
        );

      case "projects":
        return (
          <div className="projects-page">
            {pageParams.projectId ? (
              <ProjectDetail projectId={pageParams.projectId} />
            ) : (
              <ProjectList
                onSelectProject={(projectId) =>
                  handleNavigate("projects", { projectId })
                }
              />
            )}
          </div>
        );

      case "leaderboard":
        return (
          <div className="leaderboard-page">
            <Leaderboard />
          </div>
        );

      case "editor":
        return (
          <div className="editor-page">
            <CodeEditor
              initialCode={pageParams.code || ""}
              language={pageParams.language || "flutter"}
            />
            <AITutor />
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  // Handle initial loading
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigate} />

      <main className="main-content">{renderPage()}</main>

      <Footer />

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              )
            }
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        footer={modal.footer}
      >
        {modal.content}
      </Modal>
    </div>
  );
};

// Home Page Component
const HomePage = ({ onNavigate }) => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Learn Programming Through Interactive Challenges</h1>
          <p>
            Master coding skills with our hands-on learning platform. Practice
            in a real coding environment with instant feedback.
          </p>

          <div className="hero-buttons">
            {isAuthenticated ? (
              <button
                className="primary-button"
                onClick={() => onNavigate("dashboard")}
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  className="primary-button"
                  onClick={() => onNavigate("register")}
                >
                  Get Started for Free
                </button>
                <button
                  className="secondary-button"
                  onClick={() => onNavigate("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">10+</div>
              <div className="stat-label">Programming Languages</div>
            </div>
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-label">Coding Challenges</div>
            </div>
            <div className="stat">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Active Learners</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          {/* Placeholder for hero image */}
          <div className="image-placeholder">
            <div className="code-snippet">
              <pre>
                <code>
                  {`// Flutter counter app example
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Learn Coding the Smart Way</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Interactive Lessons</h3>
            <p>
              Learn programming concepts with interactive tutorials that combine
              theory with practice.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Code in Browser</h3>
            <p>
              Write and run code directly in your browser with our powerful
              online IDE.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Assistance</h3>
            <p>
              Get instant feedback and hints from our AI tutor when you're
              stuck.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Coding Challenges</h3>
            <p>
              Test your skills with hundreds of coding challenges across
              different difficulty levels.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Real-world Projects</h3>
            <p>
              Build complete applications with guided project-based learning.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Gamified Learning</h3>
            <p>
              Earn XP, unlock achievements, and climb the leaderboard as you
              learn.
            </p>
          </div>
        </div>
      </section>

      <section className="languages-section">
        <h2>Popular Programming Languages</h2>

        <div className="languages-grid">
          <div
            className="language-card"
            onClick={() => onNavigate("learn", { languageId: "flutter" })}
          >
            <div className="language-icon">🦋</div>
            <h3>Flutter</h3>
            <p>
              Build beautiful, natively compiled apps for mobile, web, and
              desktop from a single codebase.
            </p>
            <button className="language-button">Start Learning</button>
          </div>

          <div
            className="language-card"
            onClick={() => onNavigate("learn", { languageId: "javascript" })}
          >
            <div className="language-icon">📝</div>
            <h3>JavaScript</h3>
            <p>
              The language of the web. Build interactive websites and modern web
              applications.
            </p>
            <button className="language-button">Start Learning</button>
          </div>

          <div
            className="language-card"
            onClick={() => onNavigate("learn", { languageId: "python" })}
          >
            <div className="language-icon">🐍</div>
            <h3>Python</h3>
            <p>
              A versatile language used for web development, data science, AI,
              and automation.
            </p>
            <button className="language-button">Start Learning</button>
          </div>

          <div
            className="language-card"
            onClick={() => onNavigate("learn", { languageId: "java" })}
          >
            <div className="language-icon">☕</div>
            <h3>Java</h3>
            <p>
              A popular language for building enterprise-grade applications and
              Android apps.
            </p>
            <button className="language-button">Start Learning</button>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>

        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "CodeQuest helped me transition from a complete beginner to a
                professional developer in just 6 months. The hands-on approach
                and real-world projects made all the difference."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JS</div>
              <div className="author-info">
                <h4>John Smith</h4>
                <p>Frontend Developer at TechCorp</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "I've tried many coding platforms, but CodeQuest stands out with
                its interactive challenges and AI tutor. It's like having a
                personal mentor guiding you through every step."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AJ</div>
              <div className="author-info">
                <h4>Amanda Johnson</h4>
                <p>Mobile App Developer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "As a self-taught developer, CodeQuest filled the gaps in my
                knowledge and helped me build a strong portfolio of projects. I
                landed my dream job thanks to the skills I gained here."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MC</div>
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Full Stack Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Your Coding Journey?</h2>
        <p>
          Join thousands of learners mastering programming skills on CodeQuest.
        </p>

        <div className="cta-buttons">
          {isAuthenticated ? (
            <button
              className="primary-button large"
              onClick={() => onNavigate("dashboard")}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                className="primary-button large"
                onClick={() => onNavigate("register")}
              >
                Sign Up for Free
              </button>
              <button
                className="secondary-button large"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
