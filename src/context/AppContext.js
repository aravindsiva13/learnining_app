/**
 * AppContext.js - Consolidated context for the entire application
 *
 * This file combines authentication, user progress, and editor state
 * into a single context provider to simplify state management.
 */

import React, { createContext, useState, useEffect, useCallback } from "react";
import { api } from "../api";

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Editor state
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("flutter");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  // Learning state
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);

  // Progress state
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Initialize app state on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for stored auth token
        const token = localStorage.getItem("codequest_token");
        const storedUser = localStorage.getItem("codequest_user");

        if (token && storedUser) {
          // In a real app, we would validate the token on the server
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);

          // Set user preferences
          setTheme(userData.preferences?.theme || "vs-dark");
          setFontSize(userData.preferences?.fontSize || 14);
          setLanguage(userData.preferences?.language || "flutter");

          // Set user progress
          if (userData.progress) {
            setXp(userData.progress.xp || 0);
            setLevel(userData.progress.level || 1);
            setStreak(userData.progress.streak || 0);
            setCompletedLessons(userData.progress.completedLessons || []);
            setCompletedChallenges(userData.progress.completedChallenges || []);
          }
        }

        // Load available languages
        const languagesResponse = await api.learning.getLanguages();
        if (languagesResponse.success) {
          setLanguages(languagesResponse.data);
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Auth methods
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const response = await api.auth.login(email, password);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);

        // Store auth data
        localStorage.setItem("codequest_token", response.token);
        localStorage.setItem("codequest_user", JSON.stringify(response.user));

        // Set user preferences
        if (response.user.preferences) {
          setTheme(response.user.preferences.theme || "vs-dark");
          setFontSize(response.user.preferences.fontSize || 14);
          setLanguage(response.user.preferences.language || "flutter");
        }

        // Set user progress
        if (response.user.progress) {
          setXp(response.user.progress.xp || 0);
          setLevel(response.user.progress.level || 1);
          setStreak(response.user.progress.streak || 0);
          setCompletedLessons(response.user.progress.completedLessons || []);
          setCompletedChallenges(
            response.user.progress.completedChallenges || []
          );
        }

        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    setAuthLoading(true);
    try {
      const response = await api.auth.register(userData);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);

        // Store auth data
        localStorage.setItem("codequest_token", response.token);
        localStorage.setItem("codequest_user", JSON.stringify(response.user));

        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "An error occurred during registration",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();

      // Clear local data
      localStorage.removeItem("codequest_token");
      localStorage.removeItem("codequest_user");

      // Reset state
      setUser(null);
      setIsAuthenticated(false);

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "An error occurred during logout" };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };

      const response = await api.auth.updateProfile(user.id, profileData);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("codequest_user", JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "An error occurred while updating profile",
      };
    }
  };

  // Editor methods
  const executeCode = async (codeToExecute, language) => {
    try {
      // In a real app, this would send the code to a backend service for execution
      console.log(`Executing ${language} code: ${codeToExecute}`);

      // Mock execution result
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        output: `Execution result: Success\nOutput: Hello, world!`,
        error: null,
      };
    } catch (error) {
      console.error("Code execution error:", error);
      return {
        success: false,
        output: null,
        error: "An error occurred during code execution",
      };
    }
  };

  // Learning methods
  const fetchLearningPath = async (languageId) => {
    setLoadingContent(true);
    try {
      const response = await api.learning.getLearningPath(languageId);
      if (response.success) {
        setLearningPath(response.data);
        setLanguage(languageId);
        if (user) {
          // Update user's preferred language
          updateProfile({
            preferences: { ...user.preferences, language: languageId },
          });
        }
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Fetch learning path error:", error);
      return { success: false, message: "Failed to fetch learning path" };
    } finally {
      setLoadingContent(false);
    }
  };

  const fetchLessonContent = async (lessonId) => {
    setLoadingContent(true);
    try {
      const response = await api.learning.getLessonContent(lessonId);
      if (response.success) {
        setCurrentLesson(response.data);
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Fetch lesson content error:", error);
      return { success: false, message: "Failed to fetch lesson content" };
    } finally {
      setLoadingContent(false);
    }
  };

  // Challenge methods
  const fetchChallenge = async (challengeId) => {
    setLoadingContent(true);
    try {
      const response = await api.challenges.getChallengeById(challengeId);
      if (response.success) {
        setCurrentChallenge(response.data);
        setCode(response.data.starterCode);
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Fetch challenge error:", error);
      return { success: false, message: "Failed to fetch challenge" };
    } finally {
      setLoadingContent(false);
    }
  };

  const submitChallenge = async (challengeId, submittedCode) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };

      const response = await api.challenges.submitSolution(
        user.id,
        challengeId,
        submittedCode
      );
      if (response.success) {
        if (response.passed && !completedChallenges.includes(challengeId)) {
          // Update XP and completed challenges
          const updatedXp = xp + response.xpEarned;
          const updatedCompletedChallenges = [
            ...completedChallenges,
            challengeId,
          ];

          setXp(updatedXp);
          setCompletedChallenges(updatedCompletedChallenges);

          // Update user progress in local storage
          const updatedUser = {
            ...user,
            progress: {
              ...user.progress,
              xp: updatedXp,
              completedChallenges: updatedCompletedChallenges,
            },
          };

          setUser(updatedUser);
          localStorage.setItem("codequest_user", JSON.stringify(updatedUser));
        }

        return response;
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Submit challenge error:", error);
      return { success: false, message: "Failed to submit challenge" };
    }
  };

  // Lesson completion tracking
  const completeLesson = async (lessonId) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };

      if (!completedLessons.includes(lessonId)) {
        // Add lesson to completed lessons
        const updatedCompletedLessons = [...completedLessons, lessonId];

        // Award XP for completing a lesson
        const lessonXp = 25; // Standard XP for lesson completion
        const updatedXp = xp + lessonXp;

        // Update state
        setXp(updatedXp);
        setCompletedLessons(updatedCompletedLessons);

        // Update user progress in local storage
        const updatedUser = {
          ...user,
          progress: {
            ...user.progress,
            xp: updatedXp,
            completedLessons: updatedCompletedLessons,
          },
        };

        setUser(updatedUser);
        localStorage.setItem("codequest_user", JSON.stringify(updatedUser));

        // Track progress on the server (in a real app)
        await api.learning.trackProgress(user.id, lessonId, true);

        return {
          success: true,
          xpEarned: lessonXp,
          message: `Lesson completed! You earned ${lessonXp} XP.`,
        };
      }

      return { success: true, message: "Lesson already completed" };
    } catch (error) {
      console.error("Complete lesson error:", error);
      return { success: false, message: "Failed to track lesson completion" };
    }
  };

  // Provide context value
  const contextValue = {
    // Auth state and methods
    user,
    isAuthenticated,
    authLoading,
    login,
    register,
    logout,
    updateProfile,

    // Editor state and methods
    code,
    setCode,
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    executeCode,

    // Learning state and methods
    languages,
    learningPath,
    currentLesson,
    currentChallenge,
    loadingContent,
    fetchLearningPath,
    fetchLessonContent,
    fetchChallenge,
    submitChallenge,
    completeLesson,

    // Progress state
    xp,
    level,
    streak,
    completedLessons,
    completedChallenges,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
