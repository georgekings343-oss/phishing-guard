import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/ui/Header";
import SecurityAlertBanner from "../../components/ui/SecurityAlertBanner";
import RealTimeNotifications from "./components/RealTimeNotifications";
import AdminSidebar from "../../components/ui/AdminSidebar";

const SystemAdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);

  // Mock data for alerts and notifications
  const mockSecurityAlerts = [
    { id: "ALERT-001", title: "Critical Phishing Campaign Active", severity: "critical", timestamp: new Date() },
    { id: "ALERT-002", title: "Training Completion Overdue", severity: "medium", timestamp: new Date() }
  ];
  const mockNotifications = [
    { id: "NOTIF-001", type: "critical", title: "New Phishing Incident", message: "Suspicious email reported by 3 employees.", timestamp: new Date() }
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
        type: "info",
        title: "System Alert",
        message: "New security event detected.",
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
      <AdminSidebar />
      <div className="flex-1">
        {/* Header WITHOUT menu toggle button */}
        <Header userRole="admin" alertCount={securityAlerts.length} hideMenuToggle={true} />
        <SecurityAlertBanner alerts={securityAlerts} onDismiss={handleAlertDismiss} />
        <RealTimeNotifications notifications={notifications} onDismiss={handleNotificationDismiss} />

        <main className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemAdminLayout;
