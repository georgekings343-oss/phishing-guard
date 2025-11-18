// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/login";
import Signup from "./pages/signup";

// Dashboards
import EmployeeDashboard from "./pages/employee-dashboard";
import SystemAdminDashboard from "./pages/system-admin-dashboard";

// Tools
import EmailAnalyzer from "./pages/email-analyzer";
import UrlChecker from "./pages/url-checker";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter";
import IncidentLogDetails from "./pages/incident-log-details";

// Main pages
import TrainingModules from "./pages/TrainingModules";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import AdminPanel from "./pages/AdminPanel";

// Generic
import NotFound from "./pages/NotFound";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/employee-dashboard"
          element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>}
        />
        <Route
          path="/system-admin-dashboard"
          element={<ProtectedRoute><SystemAdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/email-analyzer"
          element={<ProtectedRoute><EmailAnalyzer /></ProtectedRoute>}
        />
        <Route
          path="/url-checker"
          element={<ProtectedRoute><UrlChecker /></ProtectedRoute>}
        />
        <Route
          path="/suspicious-email-reporter"
          element={<ProtectedRoute><SuspiciousEmailReporter /></ProtectedRoute>}
        />
        <Route
          path="/incident-log-details"
          element={<ProtectedRoute><IncidentLogDetails /></ProtectedRoute>}
        />
        <Route
          path="/training-modules"
          element={<ProtectedRoute><TrainingModules /></ProtectedRoute>}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute><Analytics /></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />
        <Route
          path="/help-center"
          element={<ProtectedRoute><HelpCenter /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}
        />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
