/**
 * CodeEditor.js - Monaco-based code editor component
 *
 * This file implements the main code editor for the CodeQuest platform
 * with support for different languages, themes, and code execution.
 */

import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

// Mock Monaco Editor Component (in a real app, you would import Monaco Editor)
const MonacoEditor = ({
  language,
  theme,
  value,
  onChange,
  options,
  editorDidMount,
}) => {
  // In a real implementation, this would use the actual Monaco Editor
  // For this mockup, we'll use a simple textarea

  useEffect(() => {
    if (editorDidMount) {
      // Mock editor instance
      const editor = {
        focus: () => {},
        getModel: () => ({
          getValueInRange: () => value,
        }),
        setValue: (val) => onChange(val),
      };

      editorDidMount(editor);
    }
  }, [editorDidMount]);

  return (
    <div className="monaco-editor-container">
      <div className="editor-header">
        <span className="language-indicator">{language.toUpperCase()}</span>
        <span className="theme-indicator">{theme}</span>
      </div>
      <textarea
        className="mock-monaco-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#ffffff",
          color: theme === "vs-dark" ? "#d4d4d4" : "#000000",
          fontFamily: "monospace",
          fontSize: `${options?.fontSize || 14}px`,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          resize: "none",
        }}
      />
    </div>
  );
};

// Code Editor Component
export const CodeEditor = ({
  initialCode = "",
  readOnly = false,
  autoFocus = true,
  onExecute,
  onSubmit,
}) => {
  const {
    code,
    setCode,
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    executeCode,
    currentChallenge,
  } = useContext(AppContext);

  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize editor with code
  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode, setCode]);

  // Handle code execution
  const handleExecuteCode = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput("Running code...");

    try {
      const result = await executeCode(code, language);

      if (result.success) {
        setOutput(
          result.output || "Code executed successfully with no output."
        );
      } else {
        setError(result.error || "An error occurred during execution.");
        setOutput("");
      }

      if (onExecute) {
        onExecute(result);
      }
    } catch (err) {
      setError("An unexpected error occurred during execution.");
      setOutput("");
      console.error("Code execution error:", err);
    } finally {
      setIsExecuting(false);
    }
  };

  // Handle challenge submission
  const handleSubmitChallenge = async () => {
    if (!currentChallenge) {
      setError("No active challenge to submit.");
      return;
    }

    setIsExecuting(true);
    setError(null);
    setOutput("Submitting solution...");

    try {
      if (onSubmit) {
        const result = await onSubmit(code);

        if (result.success) {
          if (result.passed) {
            setOutput(`Challenge passed! ${result.message || ""}`);
          } else {
            setOutput(
              `Your solution didn't pass all test cases. ${
                result.feedback || ""
              }`
            );
          }
        } else {
          setError(result.message || "Failed to submit solution.");
          setOutput("");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during submission.");
      setOutput("");
      console.error("Challenge submission error:", err);
    } finally {
      setIsExecuting(false);
    }
  };

  // Editor options
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: true,
    readOnly,
    cursorStyle: "line",
    automaticLayout: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontSize,
    tabSize: 2,
  };

  // Editor instance reference
  const editorRef = useRef(null);

  // Editor initialization
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    if (autoFocus) {
      editor.focus();
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <div className="language-selector">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={readOnly}
          >
            <option value="flutter">Flutter (Dart)</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="theme-selector">
          <label htmlFor="theme-select">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        </div>

        <div className="font-size-selector">
          <label htmlFor="font-size-select">Font Size:</label>
          <select
            id="font-size-select"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          >
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
          </select>
        </div>
      </div>

      <div className="editor-main">
        <MonacoEditor
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value)}
          options={editorOptions}
          editorDidMount={handleEditorDidMount}
        />
      </div>

      <div className="editor-actions">
        <button
          className="run-button"
          onClick={handleExecuteCode}
          disabled={isExecuting || !code.trim() || readOnly}
        >
          {isExecuting ? "Running..." : "Run Code"}
        </button>

        {onSubmit && (
          <button
            className="submit-button"
            onClick={handleSubmitChallenge}
            disabled={isExecuting || !code.trim() || readOnly}
          >
            {isExecuting ? "Submitting..." : "Submit Solution"}
          </button>
        )}

        <button
          className="reset-button"
          onClick={() => {
            if (currentChallenge) {
              setCode(currentChallenge.starterCode);
            } else {
              setCode("");
            }
            setOutput("");
            setError(null);
          }}
          disabled={isExecuting || readOnly}
        >
          Reset Code
        </button>
      </div>

      <div className="output-container">
        <h3>Output</h3>
        {error ? (
          <div className="error-output">
            <h4>Error:</h4>
            <pre>{error}</pre>
          </div>
        ) : output ? (
          <pre className="code-output">{output}</pre>
        ) : (
          <div className="empty-output">
            <p>Run your code to see the output here</p>
          </div>
        )}
      </div>

      {currentChallenge && (
        <div className="challenge-details">
          <h3>Challenge: {currentChallenge.title}</h3>
          <p>{currentChallenge.description}</p>

          <div className="test-cases">
            <h4>Test Cases:</h4>
            <ul>
              {currentChallenge.testCases.map((testCase, index) => (
                <li key={index}>
                  <strong>Input:</strong> {testCase.input}
                  <br />
                  <strong>Expected Output:</strong> {testCase.expected}
                </li>
              ))}
            </ul>
          </div>

          <div className="hints-container">
            <h4>Hints:</h4>
            <ul>
              {currentChallenge.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Code Comparison Component
export const CodeComparison = ({ sourceCode, targetLanguage }) => {
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock function to translate code to another language
  const translateCode = async (source, language) => {
    setLoading(true);

    try {
      // In a real app, this would call an API to translate the code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock translation result
      let result;
      if (language === "python") {
        result = sourceCode
          .replace(/const /g, "")
          .replace(/let /g, "")
          .replace(/;/g, "");
      } else if (language === "java") {
        result = `
public class Main {
    public static void main(String[] args) {
        // Translated from JavaScript
        ${sourceCode
          .replace(/const /g, "final ")
          .replace(/let /g, "")
          .replace(/console.log/g, "System.out.println")}
    }
}`;
      } else {
        result = sourceCode;
      }

      setComparisonResult(result);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger translation when parameters change
  useEffect(() => {
    if (sourceCode && targetLanguage) {
      translateCode(sourceCode, targetLanguage);
    }
  }, [sourceCode, targetLanguage]);

  return (
    <div className="code-comparison-container">
      <h2>Code Comparison</h2>

      <div className="comparison-panel">
        <div className="source-code">
          <h3>Original Code (JavaScript)</h3>
          <pre className="code-block">{sourceCode}</pre>
        </div>

        <div className="translated-code">
          <h3>Translated to {targetLanguage}</h3>
          {loading ? (
            <div className="loading-indicator">Translating code...</div>
          ) : comparisonResult ? (
            <pre className="code-block">{comparisonResult}</pre>
          ) : (
            <div className="empty-result">
              <p>No translation available</p>
            </div>
          )}
        </div>
      </div>

      <div className="syntax-differences">
        <h3>Key Syntax Differences</h3>
        {targetLanguage === "python" && (
          <ul>
            <li>
              Python uses indentation instead of braces {"{}"} for code blocks
            </li>
            <li>No semicolons at the end of statements</li>
            <li>Variable declarations don't use const, let, or var keywords</li>
            <li>
              Python uses <code>def</code> for functions instead of{" "}
              <code>function</code>
            </li>
            <li>
              Python uses <code>print()</code> instead of{" "}
              <code>console.log()</code>
            </li>
          </ul>
        )}

        {targetLanguage === "java" && (
          <ul>
            <li>
              Java is statically typed - all variables need explicit types
            </li>
            <li>All code must be inside a class</li>
            <li>
              Java uses <code>System.out.println()</code> instead of{" "}
              <code>console.log()</code>
            </li>
            <li>
              Java uses <code>final</code> keyword for constants
            </li>
            <li>Each Java file typically contains a single public class</li>
          </ul>
        )}
      </div>
    </div>
  );
};
