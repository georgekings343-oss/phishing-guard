import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/signup/index.jsx";

import EmployeeDashboard from "./pages/employee-dashboard/index.jsx";
import AdminDashboard from "./pages/system-admin-dashboard/index.jsx";

import EmailAnalyzer from "./pages/email-analyzer/index.jsx";
import UrlChecker from "./pages/url-checker/index.jsx";
import SuspiciousEmailReporter from "./pages/suspicious-email-reporter/index.jsx";
import IncidentLogDetails from "./pages/incident-log-details/index.jsx";

import Analytics from "./pages/Analytics.jsx";
import ThreatIntelligence from "./pages/ThreatIntelligence.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Settings from "./pages/Settings.jsx";

import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      <Route path="/email-analyzer" element={<EmailAnalyzer />} />
      <Route path="/url-checker" element={<UrlChecker />} />
      <Route path="/report-email" element={<SuspiciousEmailReporter />} />
      <Route path="/incident/:id" element={<IncidentLogDetails />} />

      <Route path="/analytics" element={<Analytics />} />
      <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
