// src/AppRoutes.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* ---------------------- PUBLIC PAGES ---------------------- */
import Login from "./pages/login/AnimatedLogin.jsx";
import Signup from "./pages/signup/index.jsx";
import ForgotPassword from "./pages/forgot-password/index.jsx";
import MFA from "./pages/mfa/index.jsx";

/* ---------------------- DASHBOARDS ------------------------ */
import EmployeeDashboard from "./pages/employee-dashboard/index.jsx";
import SystemAdminDashboard from "./pages/system-admin-dashboard/index.jsx";

/* ---------------------- TOOLS ----------------------------- */
import EmailAnalyzer from "./pages/email-analyzer/index.jsx";
import UrlChecker from "./pages/url-checker/index.jsx";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter/index.jsx";
import IncidentLogDetails from "./pages/incident-log-details/index.jsx";

/* ---------------------- SINGLE-FILE PAGES ----------------- */
import Settings from "./pages/Settings.jsx";
import Analytics from "./pages/Analytics.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ThreatIntelligence from "./pages/ThreatIntelligence.jsx";
import AuditLog from "./pages/AuditLog.jsx";
import ClientChecker from "./pages/ClientChecker.jsx";
import PublicChecker from "./pages/PublicChecker.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import TrainingModules from "./pages/TrainingModules.jsx";

import NotFound from "./pages/NotFound.jsx";

/* ---------------------- AUTH PROTECTION ------------------- */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole))
    return <Navigate to="/employee-dashboard" replace />;

  return children;
};

/* ---------------------- ROUTES ----------------------------- */
export default function AppRoutes() {
  return (
    <Routes>

      {/* ======= PUBLIC ======= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/mfa" element={<MFA />} />
  
      {/* ======= EMPLOYEE ======= */}
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee", "tenant"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/training-modules"
        element={
          <ProtectedRoute allowedRoles={["employee", "tenant"]}>
            <TrainingModules />
          </ProtectedRoute>
        }
      />

      {/* ======= ADMIN ======= */}
      <Route
        path="/system-admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SystemAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/threat-intelligence"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ThreatIntelligence />
          </ProtectedRoute>
        }
      />

      <Route
        path="/audit-log"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AuditLog />
          </ProtectedRoute>
        }
      />

      {/* ======= UNIVERSAL TOOLS ======= */}
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

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client-checker"
        element={
          <ProtectedRoute>
            <ClientChecker />
          </ProtectedRoute>
        }
      />

      <Route
        path="/help-center"
        element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        }
      />

      {/* DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
