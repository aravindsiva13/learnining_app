/**
 * index.js - Application entry point for CodeQuest
 *
 * This file serves as the entry point for the CodeQuest learning platform.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
