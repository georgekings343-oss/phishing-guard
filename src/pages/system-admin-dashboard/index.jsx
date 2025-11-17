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

const SystemAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);

  // Updated metrics data with more appropriate icons
  const metricsData = [
    {
      title: "Active Phishing Incidents",
      value: "12",
      change: "+3",
      changeType: "negative",
      icon: "AlertTriangle",
      iconColor: "var(--color-error)",
      trend: true
    },
    {
      title: "Training Completion Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: "GraduationCap",
      iconColor: "var(--color-success)",
      trend: true
    },
    {
      title: "High Risk Users",
      value: "23",
      change: "-2",
      changeType: "positive",
      icon: "UserX",
      iconColor: "var(--color-warning)",
      trend: true
    },
    {
      title: "Threat Detections",
      value: "156",
      change: "+12",
      changeType: "negative",
      icon: "Shield",
      iconColor: "var(--color-accent)",
      trend: true
    }
  ];

  // Mock data for recent incidents
  const recentIncidents = [
    {
      id: "INC-2025-001",
      title: "Suspicious Email Campaign Detected",
      description: "Multiple employees received phishing emails from finance@company-secure.com attempting to harvest credentials.",
      severity: "critical",
      affectedUsers: 45,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "investigating"
    },
    {
      id: "INC-2025-002",
      title: "Malicious Link Clicked",
      description: "Employee in HR department clicked on suspicious link in email. System automatically quarantined the threat.",
      severity: "high",
      affectedUsers: 1,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "contained"
    },
    {
      id: "INC-2025-003",
      title: "Failed Login Attempts",
      description: "Multiple failed login attempts detected from unusual geographic location for user account.",
      severity: "medium",
      affectedUsers: 1,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: "monitoring"
    },
    {
      id: "INC-2025-004",
      title: "Suspicious Attachment Quarantined",
      description: "Email attachment with suspicious characteristics automatically quarantined by security system.",
      severity: "low",
      affectedUsers: 0,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      status: "resolved"
    }
  ];

  // Mock data for training programs
  const trainingPrograms = [
    {
      id: "TRN-001",
      name: "Q1 Phishing Awareness Training",
      status: "active",
      participants: 250,
      completionRate: 87,
      completedUsers: 218,
      dueDate: new Date(Date.now() + 604800000), // 1 week from now
      type: "mandatory"
    },
    {
      id: "TRN-002",
      name: "Advanced Email Security Workshop",
      status: "scheduled",
      participants: 45,
      completionRate: 0,
      completedUsers: 0,
      dueDate: new Date(Date.now() + 1209600000), // 2 weeks from now
      type: "optional"
    },
    {
      id: "TRN-003",
      name: "Social Engineering Defense",
      status: "active",
      participants: 180,
      completionRate: 62,
      completedUsers: 112,
      dueDate: new Date(Date.now() + 1814400000), // 3 weeks from now
      type: "mandatory"
    }
  ];

  // Mock data for threat trends chart
  const threatTrendsData = [
    { name: 'Mon', incidents: 12 },
    { name: 'Tue', incidents: 19 },
    { name: 'Wed', incidents: 8 },
    { name: 'Thu', incidents: 15 },
    { name: 'Fri', incidents: 22 },
    { name: 'Sat', incidents: 6 },
    { name: 'Sun', incidents: 4 }
  ];

  // Mock security alerts
  const mockSecurityAlerts = [
    {
      id: "ALERT-001",
      title: "Critical Phishing Campaign Active",
      message: "High-volume phishing campaign targeting financial credentials detected across multiple departments.",
      severity: "critical",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      actionLabel: "Investigate",
      actionPath: "/incident-log-details"
    },
    {
      id: "ALERT-002",
      title: "Training Completion Overdue",
      message: "23 employees have not completed mandatory security training within the deadline.",
      severity: "medium",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      actionLabel: "View Details",
      actionPath: "/training-campaigns"
    }
  ];

  // Mock real-time notifications
  const mockNotifications = [
    {
      id: "NOTIF-001",
      type: "critical",
      title: "New Phishing Incident",
      message: "Suspicious email reported by 3 employees in the last 5 minutes.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      action: {
        label: "Investigate Now",
        handler: () => console.log("Navigate to incident details")
      }
    },
    {
      id: "NOTIF-002",
      type: "success",
      title: "Training Campaign Completed",
      message: "Q4 Security Awareness training has been completed by all participants.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      id: "NOTIF-003",
      type: "warning",
      title: "System Update Required",
      message: "Security system requires update to maintain optimal protection.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setSecurityAlerts(mockSecurityAlerts);
      setNotifications(mockNotifications);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: `NOTIF-${Date.now()}`,
        type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
        title: "System Alert",
        message: "New security event detected and processed automatically.",
        timestamp: new Date()
      };
      
      setNotifications(prev => [newNotification, ...prev?.slice(0, 9)]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleAlertDismiss = (alertId) => {
    setSecurityAlerts(prev => prev?.filter(a => a?.id !== alertId));
  };

  const handleMenuToggle = () => {
    // Menu toggle functionality can be implemented as needed
    console.log('Menu toggled');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" alertCount={securityAlerts?.length} onMenuToggle={handleMenuToggle} />
      <SecurityAlertBanner 
        alerts={securityAlerts} 
        onDismiss={handleAlertDismiss}
      />
      <RealTimeNotifications 
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
      />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbTrail showHome={false} />
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-text-primary">System Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive cybersecurity oversight and management for your organization
              </p>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                iconColor={metric?.iconColor}
                trend={metric?.trend}
                loading={loading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Incidents Panel */}
            <IncidentAlertPanel 
              incidents={recentIncidents} 
              loading={loading}
            />

            {/* Training Status Panel */}
            <TrainingStatusPanel 
              trainingPrograms={trainingPrograms} 
              loading={loading}
            />
          </div>

          {/* Threat Trends Chart */}
          <div className="mb-8">
            <ThreatTrendsChart 
              data={threatTrendsData} 
              loading={loading}
            />
          </div>

          {/* Quick Actions Panel */}
          <QuickActionsPanel />
        </div>
      </main>
    </div>
  );
};

export default SystemAdminDashboard;