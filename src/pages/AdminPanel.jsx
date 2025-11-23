// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, deviceRes, alertRes, logRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/devices"),
          axios.get("/api/alerts"),
          axios.get("/api/logs"),
        ]);
        setUsers(userRes.data);
        setDevices(deviceRes.data);
        setAlerts(alertRes.data);
        setLogs(logRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePromote = async (userId) => {
    try {
      await axios.post(`/api/users/${userId}/promote`);
      alert("User promoted successfully!");
    } catch (err) {
      alert("Failed to promote user");
    }
  };

  const renderDashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-4 bg-card rounded-md shadow-md">
        <h2 className="font-semibold text-lg">System Health</h2>
        <p>All systems operational ✅</p>
      </div>
      <div className="p-4 bg-card rounded-md shadow-md">
        <h2 className="font-semibold text-lg">Recent Alerts</h2>
        {alerts.slice(0, 3).map((alert, i) => (
          <p key={i} className="text-sm">• {alert.message}</p>
        ))}
      </div>
      <div className="p-4 bg-card rounded-md shadow-md">
        <h2 className="font-semibold text-lg">Statistics</h2>
        <p>Users: {users.length}</p>
        <p>Devices: {devices.length}</p>
        <p>Threats Blocked: {alerts.filter(a => a.type === "threat").length}</p>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="p-4 bg-card rounded-md shadow-md">
            <h3 className="font-semibold">{user.name}</h3>
            <p>Role: {user.role}</p>
            <button
              onClick={() => handlePromote(user.id)}
              className="mt-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/80"
            >
              Promote
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeviceManagement = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Device Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map(device => (
          <div key={device.id} className="p-4 bg-card rounded-md shadow-md">
            <h3 className="font-semibold">{device.name}</h3>
            <p>Type: {device.type}</p>
            <p>OS: {device.os}</p>
            <p>Last Seen: {device.lastSeen}</p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 bg-success text-white rounded-md">Scan</button>
              <button className="px-3 py-1 bg-warning text-white rounded-md">Quarantine</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderThreatMonitoring = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Threat Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alerts.map((alert, i) => (
          <div key={i} className={`p-4 rounded-md shadow-md ${alert.type === "threat" ? "bg-danger text-white" : "bg-card"}`}>
            <p>{alert.message}</p>
            <p className="text-sm">{alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPolicyManagement = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Policy Management</h2>
      <p>Define security policies, access rules, and compliance settings here.</p>
    </div>
  );

  const renderReports = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Reports & Analytics</h2>
      <p>Generate security reports, view charts/graphs, export data.</p>
    </div>
  );

  const renderSystemSettings = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <p>General system configuration, integrations, backup/restore.</p>
    </div>
  );

  const renderAuditLogs = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i} className="p-2 bg-card rounded-md shadow-sm text-sm">
            <p><strong>{log.user}</strong> - {log.action}</p>
            <p className="text-xs text-gray-500">{log.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <p className="p-8">Loading data...</p>;

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 flex-wrap mb-6">
        {["dashboard","users","devices","threats","policies","reports","settings","logs"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${activeTab===tab ? "bg-primary text-white" : "bg-card text-foreground"} hover:bg-primary/80 transition`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "dashboard" ? "Dashboard Overview" :
             tab === "users" ? "User Management" :
             tab === "devices" ? "Device Management" :
             tab === "threats" ? "Threat Monitoring" :
             tab === "policies" ? "Policy Management" :
             tab === "reports" ? "Reports & Analytics" :
             tab === "settings" ? "System Settings" :
             tab === "logs" ? "Audit Logs" : tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="space-y-6">
        {activeTab === "dashboard" && renderDashboardOverview()}
        {activeTab === "users" && renderUserManagement()}
        {activeTab === "devices" && renderDeviceManagement()}
        {activeTab === "threats" && renderThreatMonitoring()}
        {activeTab === "policies" && renderPolicyManagement()}
        {activeTab === "reports" && renderReports()}
        {activeTab === "settings" && renderSystemSettings()}
        {activeTab === "logs" && renderAuditLogs()}
      </div>
    </div>
  );
};

export default AdminPanel;
