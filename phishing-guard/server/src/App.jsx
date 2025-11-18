import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import EmployeeDashboard from './pages/employee-dashboard';
import SystemAdminDashboard from './pages/system-admin-dashboard';
import EmailAnalyzer from './pages/email-analyzer';
import UrlChecker from './pages/url-checker';
import SuspiciousEmailReporter from './pages/suspicious-email-reporter';
import IncidentLogDetails from './pages/incident-log-details';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import ThreatIntelligence from './pages/ThreatIntelligence';
import './App.css';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

        {/* New pages */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/threat-intel"
          element={
            <ProtectedRoute>
              <ThreatIntelligence />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Navigate to="/employee-dashboard" />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
