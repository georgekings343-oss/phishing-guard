// src/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import EmployeeDashboard from "./pages/employee-dashboard";
import SystemAdminDashboard from "./pages/system-admin-dashboard";
import EmailAnalyzer from "./pages/email-analyzer";
import UrlChecker from "./pages/url-checker";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter";
import IncidentLogDetails from "./pages/incident-log-details";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import UserManagement from "./pages/UserManagement";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import NotFound from "./pages/NotFound";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/system-admin-dashboard" element={<ProtectedRoute><SystemAdminDashboard /></ProtectedRoute>} />
      <Route path="/email-analyzer" element={<ProtectedRoute><EmailAnalyzer /></ProtectedRoute>} />
      <Route path="/url-checker" element={<ProtectedRoute><UrlChecker /></ProtectedRoute>} />
      <Route path="/suspicious-email-reporter" element={<ProtectedRoute><SuspiciousEmailReporter /></ProtectedRoute>} />
      <Route path="/incident-log-details" element={<ProtectedRoute><IncidentLogDetails /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/threat-intel" element={<ProtectedRoute><ThreatIntelligence /></ProtectedRoute>} />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Navigate to="/employee-dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
