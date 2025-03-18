/**
 * Learning.js - Learning components for CodeQuest platform
 *
 * This file implements the components for the learning experience,
 * including lesson viewer, AI tutor, and learning paths.
 */

import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CodeEditor } from "./CodeEditor";
import ReactMarkdown from "react-markdown"; // Imported for markdown rendering

// LessonViewer Component
export const LessonViewer = ({ lessonId }) => {
  const {
    fetchLessonContent,
    currentLesson,
    loadingContent,
    completeLesson,
    completedLessons,
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("content");
  const [exerciseCode, setExerciseCode] = useState("");
  const [completionMessage, setCompletionMessage] = useState("");

  // Fetch lesson content on mount or when lessonId changes
  useEffect(() => {
    if (lessonId) {
      fetchLessonContent(lessonId);
    }
  }, [lessonId, fetchLessonContent]);

  // Initialize exercise code when lesson changes
  useEffect(() => {
    if (currentLesson?.exercises?.[0]) {
      setExerciseCode(currentLesson.exercises[0].starterCode);
    }
  }, [currentLesson]);

  // Mark lesson as completed
  const handleMarkComplete = async () => {
    if (!lessonId) return;

    try {
      const result = await completeLesson(lessonId);
      if (result.success) {
        setCompletionMessage(result.message);
        setTimeout(() => {
          setCompletionMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error marking lesson as complete:", error);
    }
  };

  if (loadingContent) {
    return <div className="loading-indicator">Loading lesson content...</div>;
  }

  if (!currentLesson) {
    return <div className="empty-state">No lesson selected</div>;
  }

  const isCompleted = completedLessons.includes(lessonId);

  return (
    <div className="lesson-viewer">
      <div className="lesson-header">
        <h2>{currentLesson.title}</h2>
        <div className="lesson-controls">
          <div className="tab-buttons">
            <button
              className={`tab-button ${
                activeTab === "content" ? "active" : ""
              }`}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button
              className={`tab-button ${
                activeTab === "examples" ? "active" : ""
              }`}
              onClick={() => setActiveTab("examples")}
            >
              Examples
            </button>
            <button
              className={`tab-button ${
                activeTab === "exercises" ? "active" : ""
              }`}
              onClick={() => setActiveTab("exercises")}
            >
              Exercises
            </button>
          </div>

          <div className="completion-status">
            {isCompleted ? (
              <span className="completed-badge">Completed</span>
            ) : (
              <button className="complete-button" onClick={handleMarkComplete}>
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>

      {completionMessage && (
        <div className="completion-message success">{completionMessage}</div>
      )}

      <div className="lesson-content">
        {activeTab === "content" && (
          <div className="content-tab">
            <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="examples-tab">
            <h3>Code Examples</h3>
            {currentLesson.examples?.length > 0 ? (
              currentLesson.examples.map((example, index) => (
                <div key={index} className="code-example">
                  <pre className="example-code">{example.code}</pre>
                  <div className="example-explanation">
                    {example.explanation}
                  </div>
                </div>
              ))
            ) : (
              <p>No examples available for this lesson.</p>
            )}
          </div>
        )}

        {activeTab === "exercises" && (
          <div className="exercises-tab">
            <h3>Exercises</h3>
            {currentLesson.exercises?.length > 0 ? (
              currentLesson.exercises.map((exercise, index) => (
                <div key={index} className="exercise">
                  <div className="exercise-prompt">{exercise.prompt}</div>
                  <CodeEditor
                    initialCode={exercise.starterCode}
                    onExecute={(result) =>
                      console.log("Exercise result:", result)
                    }
                  />
                </div>
              ))
            ) : (
              <p>No exercises available for this lesson.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// AITutor Component
export const AITutor = ({ code, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock function to get AI response
  const getAIResponse = async (userQuery, codeContext) => {
    setLoading(true);

    try {
      // In a real app, this would call an AI API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock responses based on query keywords
      let response;

      if (userQuery.toLowerCase().includes("error")) {
        response =
          "I see you're having an error. Let's debug this together. First, check if all your variables are properly declared and if there are any typos in your code.";
      } else if (userQuery.toLowerCase().includes("explain")) {
        response = `Let me explain this code:\n\n\`\`\`${language}\n${codeContext}\n\`\`\`\n\nThis code is creating a function that processes data. The main part is where it iterates through the input and transforms each item.`;
      } else if (userQuery.toLowerCase().includes("improve")) {
        response =
          "Here are some ways to improve your code:\n\n1. Use more descriptive variable names\n2. Add comments to explain complex logic\n3. Consider breaking large functions into smaller ones\n4. Add error handling for edge cases";
      } else if (userQuery.toLowerCase().includes("help")) {
        response =
          "I'm here to help! I can explain code concepts, help debug errors, suggest improvements, or answer any programming questions you have. Just let me know what you need assistance with.";
      } else {
        response =
          "I'm your AI programming tutor. I can help explain concepts, debug your code, or suggest improvements. What specific question do you have about your code?";
      }

      return response;
    } catch (error) {
      console.error("AI Tutor error:", error);
      return "I'm having trouble providing a response right now. Please try again later.";
    } finally {
      setLoading(false);
    }
  };

  // Handle sending message to AI tutor
  const handleSendMessage = async () => {
    if (!query.trim()) return;

    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      sender: "user",
      content: query,
    };

    setConversation([...conversation, userMessage]);
    setQuery("");

    // Get AI response
    const aiResponse = await getAIResponse(query, code);

    // Add AI response to conversation
    const aiMessage = {
      id: Date.now() + 1,
      sender: "ai",
      content: aiResponse,
    };

    setConversation([...conversation, userMessage, aiMessage]);
  };

  return (
    <div className={`ai-tutor-container ${isOpen ? "open" : "closed"}`}>
      <div className="ai-tutor-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="toggle-icon">{isOpen ? "×" : "AI"}</span>
        <span className="toggle-text">
          {isOpen ? "Close Tutor" : "AI Tutor"}
        </span>
      </div>

      {isOpen && (
        <div className="ai-tutor-panel">
          <div className="ai-tutor-header">
            <h3>AI Programming Tutor</h3>
            <p>Ask questions about your code or programming concepts</p>
          </div>

          <div className="conversation-container">
            {conversation.length === 0 ? (
              <div className="empty-conversation">
                <p>Start a conversation with your AI tutor</p>
                <div className="suggestion-chips">
                  <button
                    className="suggestion-chip"
                    onClick={() => setQuery("Explain this code to me")}
                  >
                    Explain this code
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => setQuery("How can I improve this code?")}
                  >
                    How to improve?
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => setQuery("Help me fix the error in my code")}
                  >
                    Debug my code
                  </button>
                </div>
              </div>
            ) : (
              <div className="messages">
                {conversation.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="message ai loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="message-input">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your AI tutor a question..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!query.trim() || loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// LearningPath Component
export const LearningPath = ({ languageId }) => {
  const { fetchLearningPath, learningPath, loadingContent, completedLessons } =
    useContext(AppContext);

  const [currentLanguage, setCurrentLanguage] = useState(
    languageId || "flutter"
  );

  // Fetch learning path when language changes
  useEffect(() => {
    if (currentLanguage) {
      fetchLearningPath(currentLanguage);
    }
  }, [currentLanguage, fetchLearningPath]);

  // Calculate overall progress
  const calculateProgress = () => {
    if (!learningPath.length) return 0;

    const totalLessons = learningPath.length;
    const completedCount = learningPath.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;

    return (completedCount / totalLessons) * 100;
  };

  if (loadingContent) {
    return <div className="loading-indicator">Loading learning path...</div>;
  }

  return (
    <div className="learning-path">
      <div className="path-header">
        <h2>Your Learning Path</h2>
        <div className="language-selector">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
          >
            <option value="flutter">Flutter</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      <div className="progress-overview">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {Math.round(calculateProgress())}% Complete
        </div>
      </div>

      <div className="path-modules">
        {learningPath.length > 0 ? (
          <div className="modules-list">
            {learningPath.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive =
                index === 0 ||
                completedLessons.includes(learningPath[index - 1].id);

              return (
                <div
                  key={lesson.id}
                  className={`module-item ${isCompleted ? "completed" : ""} ${
                    isActive ? "active" : "locked"
                  }`}
                >
                  <div className="module-status">
                    {isCompleted ? (
                      <span className="status-icon completed">✓</span>
                    ) : isActive ? (
                      <span className="status-icon active">•</span>
                    ) : (
                      <span className="status-icon locked">🔒</span>
                    )}
                  </div>

                  <div className="module-content">
                    <h3 className="module-title">{lesson.title}</h3>
                    <div className="module-meta">
                      {lesson.duration && (
                        <span className="duration">{lesson.duration}</span>
                      )}
                    </div>
                  </div>

                  <div className="module-action">
                    {isCompleted ? (
                      <button className="review-button">Review</button>
                    ) : isActive ? (
                      <button className="start-button">Start</button>
                    ) : (
                      <button className="locked-button" disabled>
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-path">
            <p>No learning path available for this language yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Language Selection Component
export const LanguageSelection = ({ onSelect }) => {
  const { languages } = useContext(AppContext);

  return (
    <div className="language-selection">
      <h2>Choose a Language to Learn</h2>

      <div className="languages-grid">
        {languages.map((language) => (
          <div
            key={language.id}
            className="language-card"
            onClick={() => onSelect(language.id)}
          >
            <div className="language-icon">{language.icon}</div>
            <h3 className="language-name">{language.name}</h3>
            <p className="language-description">{language.description}</p>
            <div className="language-difficulty">{language.difficulty}</div>
            <button className="select-button">Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
};
