/**
 * Dashboard.js - User dashboard component
 *
 * This file implements the user's personalized dashboard with learning progress,
 * recommended courses, and gamification elements.
 */

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { DashboardStats, ProgressBar, Badge, EmptyState } from "./Common";

// Main Dashboard Component
export const Dashboard = ({ onNavigate }) => {
  const {
    user,
    isAuthenticated,
    xp,
    level,
    streak,
    completedLessons,
    completedChallenges,
    language,
    languages,
    fetchLearningPath,
    learningPath,
  } = useContext(AppContext);

  const [recommendations, setRecommendations] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [badges, setBadges] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({
    level: 1,
    xpNeeded: 1000,
  });
  const [loading, setLoading] = useState(true);

  // Calculate level and XP needed for next level
  useEffect(() => {
    // Simple level calculation: each level requires more XP than the previous
    const calculateLevel = (currentXp) => {
      const baseXp = 1000;
      let levelNum = 1;
      let xpForNextLevel = baseXp;
      let accumulatedXp = 0;

      while (accumulatedXp + xpForNextLevel <= currentXp) {
        accumulatedXp += xpForNextLevel;
        levelNum += 1;
        xpForNextLevel = Math.floor(baseXp * (1 + (levelNum - 1) * 0.5));
      }

      return {
        level: levelNum,
        currentXp,
        xpForCurrentLevel: accumulatedXp,
        xpForNextLevel: xpForNextLevel,
        xpNeeded: xpForNextLevel - (currentXp - accumulatedXp),
      };
    };

    setCurrentLevel(calculateLevel(xp));
  }, [xp]);

  // Fetch recommendations and other dashboard data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboardData = async () => {
      setLoading(true);

      // In a real app, these would be API calls
      try {
        // Fetch learning path for current language if not already loaded
        if (language && (!learningPath || learningPath.length === 0)) {
          await fetchLearningPath(language);
        }

        // Mock activity data
        const mockActivity = [
          {
            id: "act1",
            type: "lesson_completed",
            title: "Completed Lesson: Dart Fundamentals for Flutter",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            xpEarned: 25,
          },
          {
            id: "act2",
            type: "challenge_completed",
            title: "Completed Challenge: Flutter Counter App",
            timestamp: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            xpEarned: 50,
          },
          {
            id: "act3",
            type: "streak_milestone",
            title: "Reached 7-day Streak!",
            timestamp: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            xpEarned: 100,
          },
        ];

        // Mock badge data
        const mockBadges = [
          {
            id: "badge1",
            type: "streak",
            name: "Consistent Coder",
            description: "Maintain a 7-day streak",
            earned: streak >= 7,
          },
          {
            id: "badge2",
            type: "challenge",
            name: "Challenge Champion",
            description: "Complete 5 coding challenges",
            earned: completedChallenges.length >= 5,
          },
          {
            id: "badge3",
            type: "lesson",
            name: "Knowledge Seeker",
            description: "Complete 10 lessons",
            earned: completedLessons.length >= 10,
          },
          {
            id: "badge4",
            type: "level",
            name: "Rising Star",
            description: "Reach level 5",
            earned: level >= 5,
          },
          {
            id: "badge5",
            type: "project",
            name: "Project Pioneer",
            description: "Complete your first project",
            earned: false,
          },
        ];

        // Generate personalized recommendations based on user progress
        const generateRecommendations = () => {
          const recommendations = [];

          // Recommend next lesson in learning path
          if (learningPath && learningPath.length > 0) {
            // Find the first lesson that hasn't been completed
            const nextLesson = learningPath.find(
              (lesson) => !completedLessons.includes(lesson.id)
            );

            if (nextLesson) {
              recommendations.push({
                id: "rec1",
                type: "lesson",
                title: nextLesson.title,
                description: "Continue your learning path",
                action: () => onNavigate("lesson", { lessonId: nextLesson.id }),
              });
            }
          }

          // Recommend a challenge
          recommendations.push({
            id: "rec2",
            type: "challenge",
            title: "Flutter: Todo List Builder",
            description: "Test your skills with this challenge",
            action: () => onNavigate("challenge", { challengeId: "flutter2" }),
          });

          // Recommend a project if they've completed several lessons
          if (completedLessons.length >= 3) {
            recommendations.push({
              id: "rec3",
              type: "project",
              title: "Flutter Weather App",
              description: "Build a complete project to practice your skills",
              action: () => onNavigate("project", { projectId: "proj1" }),
            });
          }

          // Recommend exploring a new language if they've made good progress in current one
          const currentLanguageProgress =
            completedLessons.length / (learningPath?.length || 1);
          if (currentLanguageProgress > 0.5 && languages.length > 1) {
            // Find a language they haven't started yet
            const otherLanguage = languages.find(
              (lang) => lang.id !== language
            );

            if (otherLanguage) {
              recommendations.push({
                id: "rec4",
                type: "language",
                title: `Try ${otherLanguage.name}`,
                description:
                  "Expand your skills with another programming language",
                action: () =>
                  onNavigate("language", { languageId: otherLanguage.id }),
              });
            }
          }

          return recommendations;
        };

        setRecommendations(generateRecommendations());
        setRecentActivity(mockActivity);
        setBadges(mockBadges);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [
    isAuthenticated,
    language,
    learningPath,
    completedLessons,
    completedChallenges,
    streak,
    level,
    onNavigate,
    fetchLearningPath,
    languages,
  ]);

  // Format date relative to now (e.g., "2 hours ago")
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  };

  if (!isAuthenticated) {
    return (
      <EmptyState
        icon="🔐"
        title="Login Required"
        message="Please login to view your personalized dashboard."
        actionLabel="Login"
        onAction={() => onNavigate("login")}
      />
    );
  }

  if (loading) {
    return <div className="loading-indicator">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome back, {user.name}!</h2>
        <p className="last-login">
          Last login: {new Date().toLocaleDateString()}
        </p>
      </div>

      <DashboardStats
        stats={{
          xp,
          level: currentLevel.level,
          streak,
          completedChallenges,
          completedLessons,
        }}
      />

      <div className="dashboard-level">
        <div className="level-header">
          <div className="level-badge">Level {currentLevel.level}</div>
          <div className="level-progress-text">
            {currentLevel.xpForNextLevel - currentLevel.xpNeeded}/
            {currentLevel.xpForNextLevel} XP to Level {currentLevel.level + 1}
          </div>
        </div>

        <ProgressBar
          value={currentLevel.xpForNextLevel - currentLevel.xpNeeded}
          max={currentLevel.xpForNextLevel}
          label="XP Progress"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-column">
          <div className="dashboard-card recommendations">
            <h3 className="card-title">Recommended for You</h3>

            {recommendations.length > 0 ? (
              <div className="recommendations-list">
                {recommendations.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className={`recommendation-item ${recommendation.type}`}
                    onClick={recommendation.action}
                  >
                    <div className="recommendation-icon">
                      {recommendation.type === "lesson" && "📚"}
                      {recommendation.type === "challenge" && "🏆"}
                      {recommendation.type === "project" && "🚀"}
                      {recommendation.type === "language" && "🌐"}
                    </div>

                    <div className="recommendation-content">
                      <h4 className="recommendation-title">
                        {recommendation.title}
                      </h4>
                      <p className="recommendation-description">
                        {recommendation.description}
                      </p>
                    </div>

                    <div className="recommendation-action">
                      <span className="action-arrow">→</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-recommendations">
                <p>
                  No recommendations available. Start learning to get
                  personalized suggestions!
                </p>
              </div>
            )}
          </div>

          <div className="dashboard-card streak">
            <h3 className="card-title">Daily Streak</h3>

            <div className="streak-container">
              <div className="streak-icon">🔥</div>
              <div className="streak-count">{streak} days</div>
              <div className="streak-message">
                {streak > 0
                  ? `Keep going! You're on a ${streak}-day streak.`
                  : "Start your streak by completing a lesson today!"}
              </div>

              {streak > 0 && (
                <div className="streak-next-milestone">
                  <p>
                    Next milestone: {streak < 7 ? 7 : streak < 30 ? 30 : 100}{" "}
                    days
                  </p>
                  <ProgressBar
                    value={streak % (streak < 7 ? 7 : streak < 30 ? 30 : 100)}
                    max={streak < 7 ? 7 : streak < 30 ? 30 : 100}
                    label=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="dashboard-card activity">
            <h3 className="card-title">Recent Activity</h3>

            {recentActivity.length > 0 ? (
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`activity-item ${activity.type}`}
                  >
                    <div className="activity-icon">
                      {activity.type === "lesson_completed" && "📚"}
                      {activity.type === "challenge_completed" && "🏆"}
                      {activity.type === "project_completed" && "🚀"}
                      {activity.type === "streak_milestone" && "🔥"}
                    </div>

                    <div className="activity-content">
                      <p className="activity-title">{activity.title}</p>
                      <div className="activity-meta">
                        <span className="activity-time">
                          {formatRelativeTime(activity.timestamp)}
                        </span>
                        <span className="activity-xp">
                          +{activity.xpEarned} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-activity">
                <p>
                  No recent activity. Start learning to track your progress!
                </p>
              </div>
            )}
          </div>

          <div className="dashboard-card badges">
            <h3 className="card-title">Achievements</h3>

            <div className="badges-grid">
              {badges.map((badge) => (
                <Badge
                  key={badge.id}
                  type={badge.type}
                  label={badge.name}
                  earned={badge.earned}
                  onClick={() => {
                    // Show badge details (in a real app)
                    console.log("Badge clicked:", badge);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button
          className="action-button primary"
          onClick={() => {
            // Navigate to the current learning path
            if (learningPath && learningPath.length > 0) {
              const nextLesson = learningPath.find(
                (lesson) => !completedLessons.includes(lesson.id)
              );
              if (nextLesson) {
                onNavigate("lesson", { lessonId: nextLesson.id });
              } else {
                onNavigate("learn");
              }
            } else {
              onNavigate("learn");
            }
          }}
        >
          Continue Learning
        </button>

        <button
          className="action-button secondary"
          onClick={() => onNavigate("challenges")}
        >
          Try a Challenge
        </button>

        <button
          className="action-button secondary"
          onClick={() => onNavigate("projects")}
        >
          Start a Project
        </button>
      </div>
    </div>
  );
};
