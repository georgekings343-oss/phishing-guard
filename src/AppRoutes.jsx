import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/login";

// Dashboards
import EmployeeDashboard from "./pages/employee-dashboard";
import SystemAdminDashboard from "./pages/system-admin-dashboard";

// Tools
import EmailAnalyzer from "./pages/email-analyzer";
import UrlChecker from "./pages/url-checker";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter";
import IncidentLogDetails from "./pages/incident-log-details";

// Generic pages
import NotFound from "./pages/NotFound";

// Extra pages that were inline
const Settings = () => <div className="p-8"><h1>Settings</h1></div>;
const Analytics = () => <div className="p-8"><h1>Analytics</h1></div>;
const UserManagement = () => <div className="p-8"><h1>User Management</h1></div>;
const ThreatIntelligence = () => <div className="p-8"><h1>Threat Intelligence</h1></div>;

// Authentication wrapper
const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("isAuthenticated") === "true";
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/system-admin-dashboard" element={<ProtectedRoute><SystemAdminDashboard /></ProtectedRoute>} />
      <Route path="/email-analyzer" element={<ProtectedRoute><EmailAnalyzer /></ProtectedRoute>} />
      <Route path="/url-checker" element={<ProtectedRoute><UrlChecker /></ProtectedRoute>} />
      <Route path="/suspicious-email-reporter" element={<ProtectedRoute><SuspiciousEmailReporter /></ProtectedRoute>} />
      <Route path="/incident-log-details" element={<ProtectedRoute><IncidentLogDetails /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/threat-intel" element={<ProtectedRoute><ThreatIntelligence /></ProtectedRoute>} />

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
