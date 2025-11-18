// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page imports
import Login from "./pages/login";
import Signup from "./pages/signup"; // Add this import
import EmployeeDashboard from "./pages/employee-dashboard";
import SystemAdminDashboard from "./pages/system-admin-dashboard";
import EmailAnalyzer from "./pages/email-analyzer";
import UrlChecker from "./pages/url-checker";
import NotFound from "./pages/NotFound";

// Optional: add Suspicious Email Reporter & Incident Log Details if needed
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter";
import IncidentLogDetails from "./pages/incident-log-details";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> {/* Add this route */}

      {/* Protected routes */}
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/system-admin-dashboard"
        element={
          <ProtectedRoute>
            <SystemAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/email-analyzer"
        element={
          <ProtectedRoute>
            <EmailAnalyzer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/url-checker"
        element={
          <ProtectedRoute>
            <UrlChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suspicious-email-reporter"
        element={
          <ProtectedRoute>
            <SuspiciousEmailReporter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incident-log-details"
        element={
          <ProtectedRoute>
            <IncidentLogDetails />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;