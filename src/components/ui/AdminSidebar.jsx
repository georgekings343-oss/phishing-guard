import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiAlertTriangle,
  FiMail,
  FiShield,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiUser,
  FiUsers,
  FiLogOut,
  FiHardDrive,
  FiFileText
} from "react-icons/fi";

const AdminSidebar = () => {
  const sidebarItems = [
    { label: "Dashboard", path: "/system-admin-dashboard", icon: <FiHome /> },
    { label: "Incident Management", path: "/system-admin-dashboard/audit-log", icon: <FiAlertTriangle /> },
    { label: "Report Threat", path: "/system-admin-dashboard/incident-log-details", icon: <FiShield /> },
    { label: "Email Analyzer", path: "/email-analyzer", icon: <FiMail /> },
    { label: "URL Checker", path: "/url-checker", icon: <FiShield /> },
    { label: "Training Modules", path: "/system-admin-dashboard/training-modules", icon: <FiBarChart2 /> },
    { label: "Analytics", path: "/system-admin-dashboard/analytics", icon: <FiBarChart2 /> },
    { label: "Settings", path: "/settings", icon: <FiSettings /> },
    { label: "Help Center", path: "/system-admin-dashboard/help-center", icon: <FiHelpCircle /> },
    { label: "Admin Panel", path: "/system-admin-dashboard/admin-panel", icon: <FiUser /> },
    { label: "User Management", path: "/system-admin-dashboard/user-management", icon: <FiUsers /> },
    { label: "Threat Intelligence", path: "/system-admin-dashboard/threat-intelligence", icon: <FiHardDrive /> },
    { label: "Logs", path: "/system-admin-dashboard/logs", icon: <FiFileText /> },
    { label: "Device Management", path: "/system-admin-dashboard/device-management", icon: <FiHardDrive /> },
    { label: "Security Policies", path: "/system-admin-dashboard/security-policies", icon: <FiSettings /> },
    { label: "Logout", path: "/logout", icon: <FiLogOut /> }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col p-4">
      <div className="text-xl font-bold mb-8">Admin Account</div>
      {sidebarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
