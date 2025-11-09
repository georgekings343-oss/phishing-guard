// File: src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes";
import "./styles/tailwind.css"; // ✅ make sure this file exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
