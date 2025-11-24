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
import TenantDashboard from "./pages/tenant-dashboard/index.jsx";

/* ---------------------- TOOLS ----------------------------- */
import EmailAnalyzer from "./pages/email-analyzer/index.jsx";
import UrlChecker from "./pages/url-checker/index.jsx";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter/index.jsx";
import IncidentLogDetails from "./pages/incident-log-details/index.jsx";

/* ---------------------- ADMIN COMPONENTS ----------------- */
import AdminPanel from "./pages/system-admin-dashboard/components/AdminPanel.jsx";
import Analytics from "./pages/system-admin-dashboard/components/Analytics.jsx";
import AuditLog from "./pages/system-admin-dashboard/components/AuditLog.jsx";
import HelpCenter from "./pages/system-admin-dashboard/components/HelpCenter.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ThreatIntelligence from "./pages/ThreatIntelligence.jsx";
import ClientChecker from "./pages/ClientChecker.jsx";
import PublicChecker from "./pages/PublicChecker.jsx";
import Settings from "./pages/Settings.jsx";
import TrainingModules from "./pages/TrainingModules.jsx";

/* ---------------------- MISSING / PLACEHOLDER PAGES ----------------- */
const DeviceManagement = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Device Management</h1>
    <p>Manage connected devices here.</p>
  </div>
);

const SecurityPolicies = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Security Policies</h1>
    <p>Configure security rules and policies here.</p>
  </div>
);

const Logs = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Logs</h1>
    <p>Access system and security logs here.</p>
  </div>
);

const DashboardHome = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Dashboard Home</h1>
    <p>Overview of system security status and metrics.</p>
  </div>
);

/* ---------------------- 404 PAGE ------------------------- */
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

/* ---------------------- ROUTES ---------------------------- */
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
        path="/tenant-dashboard"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <TenantDashboard />
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
        path="/dashboard-home"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardHome />
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
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Analytics />
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
      <Route
        path="/help-center"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <HelpCenter />
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
        path="/threat-intelligence"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ThreatIntelligence />
          </ProtectedRoute>
        }
      />
      <Route
        path="/device-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DeviceManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/security-policies"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SecurityPolicies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Logs />
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
        path="/public-checker"
        element={
          <ProtectedRoute>
            <PublicChecker />
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
