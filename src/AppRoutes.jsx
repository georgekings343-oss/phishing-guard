// src/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages (correct paths)
import Login from "./pages/login/index.jsx";
import Signup from "./pages/signup/index.jsx";
import EmployeeDashboard from "./pages/employee-dashboard/index.jsx";
import SystemAdminDashboard from "./pages/system-admin-dashboard/index.jsx";

import EmailAnalyzer from "./pages/email-analyzer/index.jsx";
import UrlChecker from "./pages/url-checker/index.jsx";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter/index.jsx";
import IncidentLogDetails from "./pages/incident-log-details/index.jsx";

import Settings from "./pages/Settings.jsx"; 
import Analytics from "./pages/Analytics.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ThreatIntelligence from "./pages/ThreatIntelligence.jsx";
import AuditLog from "./pages/AuditLog.jsx";
import ClientChecker from "./pages/ClientChecker.jsx";
import PublicChecker from "./pages/PublicChecker.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";

import NotFound from "./pages/NotFound.jsx";

// Protected route system
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
      <Route path="/public-checker" element={<PublicChecker />} />

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
      <Route path="/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
      <Route path="/client-checker" element={<ProtectedRoute><ClientChecker /></ProtectedRoute>} />
      <Route path="/help-center" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Navigate to="/employee-dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
