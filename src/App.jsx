// In your main App.jsx or similar file
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import EmployeeDashboard from './pages/employee-dashboard';
import SystemAdminDashboard from './pages/SystemAdminDashboard';
import EmailAnalyzer from './pages/email-analyzer';
import UrlChecker from './pages/url-checker';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/system-admin-dashboard" element={<SystemAdminDashboard />} />
        <Route path="/email-analyzer" element={<EmailAnalyzer />} />
        <Route path="/url-checker" element={<UrlChecker />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;