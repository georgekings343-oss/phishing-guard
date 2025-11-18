import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login";
import EmployeeDashboard from "./pages/employee-dashboard";
import SystemAdminDashboard from "./pages/system-admin-dashboard";
import EmailAnalyzer from "./pages/email-analyzer";
import UrlChecker from "./pages/url-checker";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter";
import IncidentLogDetails from "./pages/incident-log-details";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import ThreatIntelligence from "./pages/ThreatIntelligence";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route wrapper (for login/signup)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Navigate to="/employee-dashboard" replace /> : children;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

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

        {/* Default & fallback */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
