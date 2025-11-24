import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import IncidentAlertPanel from './components/IncidentAlertPanel';
import TrainingStatusPanel from './components/TrainingStatusPanel';
import ThreatTrendsChart from './components/ThreatTrendsChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import RealTimeNotifications from './components/RealTimeNotifications';

/* ---------------- ADMIN COMPONENTS ---------------- */
import AdminPanel from './components/AdminPanel';
import Analytics from './components/Analytics';
import AuditLog from './components/AuditLog';
import HelpCenter from './components/HelpCenter';

/* ---------------- SIDEBAR ---------------- */
import AdminSidebar from '../../components/ui/AdminSidebar';

const SystemAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);

  // Dashboard Metrics
  const metricsData = [
    { title: "Active Phishing Incidents", value: "12", change: "+3", changeType: "negative", icon: "AlertTriangle", iconColor: "var(--color-error)", trend: true },
    { title: "Training Completion Rate", value: "87%", change: "+5%", changeType: "positive", icon: "GraduationCap", iconColor: "var(--color-success)", trend: true },
    { title: "High Risk Users", value: "23", change: "-2", changeType: "positive", icon: "UserX", iconColor: "var(--color-warning)", trend: true },
    { title: "Threat Detections", value: "156", change: "+12", changeType: "negative", icon: "Shield", iconColor: "var(--color-accent)", trend: true }
  ];

  // Recent Incidents
  const recentIncidents = [
    { id: "INC-2025-001", title: "Suspicious Email Campaign Detected", description: "Multiple employees received phishing emails from finance@company-secure.com.", severity: "critical", affectedUsers: 45, timestamp: new Date(Date.now() - 1800000), status: "investigating" },
    { id: "INC-2025-002", title: "Malicious Link Clicked", description: "Employee clicked suspicious link. System quarantined threat.", severity: "high", affectedUsers: 1, timestamp: new Date(Date.now() - 3600000), status: "contained" },
    { id: "INC-2025-003", title: "Failed Login Attempts", description: "Multiple failed login attempts from unusual location.", severity: "medium", affectedUsers: 1, timestamp: new Date(Date.now() - 7200000), status: "monitoring" },
    { id: "INC-2025-004", title: "Suspicious Attachment Quarantined", description: "Email attachment automatically quarantined.", severity: "low", affectedUsers: 0, timestamp: new Date(Date.now() - 10800000), status: "resolved" }
  ];

  // Training Programs
  const trainingPrograms = [
    { id: "TRN-001", name: "Q1 Phishing Awareness Training", status: "active", participants: 250, completionRate: 87, completedUsers: 218, dueDate: new Date(Date.now() + 604800000), type: "mandatory" },
    { id: "TRN-002", name: "Advanced Email Security Workshop", status: "scheduled", participants: 45, completionRate: 0, completedUsers: 0, dueDate: new Date(Date.now() + 1209600000), type: "optional" },
    { id: "TRN-003", name: "Social Engineering Defense", status: "active", participants: 180, completionRate: 62, completedUsers: 112, dueDate: new Date(Date.now() + 1814400000), type: "mandatory" }
  ];

  // Threat Trends
  const threatTrendsData = [
    { name: 'Mon', incidents: 12 },
    { name: 'Tue', incidents: 19 },
    { name: 'Wed', incidents: 8 },
    { name: 'Thu', incidents: 15 },
    { name: 'Fri', incidents: 22 },
    { name: 'Sat', incidents: 6 },
    { name: 'Sun', incidents: 4 }
  ];

  // Mock Security Alerts
  const mockSecurityAlerts = [
    { id: "ALERT-001", title: "Critical Phishing Campaign Active", message: "High-volume phishing campaign targeting financial credentials detected.", severity: "critical", timestamp: new Date(Date.now() - 900000), actionLabel: "Investigate", actionPath: "/incident-log-details" },
    { id: "ALERT-002", title: "Training Completion Overdue", message: "23 employees have not completed mandatory security training.", severity: "medium", timestamp: new Date(Date.now() - 3600000), actionLabel: "View Details", actionPath: "/training-campaigns" }
  ];

  // Mock Notifications
  const mockNotifications = [
    { id: "NOTIF-001", type: "critical", title: "New Phishing Incident", message: "Suspicious email reported by 3 employees in last 5 minutes.", timestamp: new Date(Date.now() - 300000), action: { label: "Investigate Now", handler: () => console.log("Navigate to incident details") } },
    { id: "NOTIF-002", type: "success", title: "Training Campaign Completed", message: "Q4 Security Awareness training has been completed by all participants.", timestamp: new Date(Date.now() - 1800000) },
    { id: "NOTIF-003", type: "warning", title: "System Update Required", message: "Security system requires update to maintain optimal protection.", timestamp: new Date(Date.now() - 3600000) }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSecurityAlerts(mockSecurityAlerts);
      setNotifications(mockNotifications);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: `NOTIF-${Date.now()}`,
        type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
        title: "System Alert",
        message: "New security event detected and processed automatically.",
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationDismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const handleAlertDismiss = (id) => setSecurityAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar userRole="admin" />

      <div className="flex-1">
        {/* Removed onMenuToggle prop to remove hamburger menu */}
        <Header userRole="admin" alertCount={securityAlerts.length} />
        <SecurityAlertBanner alerts={securityAlerts} onDismiss={handleAlertDismiss} />
        <RealTimeNotifications notifications={notifications} onDismiss={handleNotificationDismiss} />

        <main className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <BreadcrumbTrail showHome={false} />
            <div className="mt-4 mb-8">
              <h1 className="text-3xl font-bold text-text-primary">System Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive cybersecurity oversight and management for your organization
              </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metricsData.map((metric, i) => (
                <MetricsCard key={i} {...metric} loading={loading} />
              ))}
            </div>

            {/* Incident and Training Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <IncidentAlertPanel incidents={recentIncidents} loading={loading} />
              <TrainingStatusPanel trainingPrograms={trainingPrograms} loading={loading} />
            </div>

            {/* Threat Trends Chart */}
            <ThreatTrendsChart data={threatTrendsData} loading={loading} />

            {/* Quick Actions */}
            <QuickActionsPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
