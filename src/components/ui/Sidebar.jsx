// src/components/ui/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const isActive = (path) => location.pathname === path ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200";

  return (
    <aside className="w-64 h-full bg-white shadow-md p-4 fixed">
      <h2 className="text-xl font-bold mb-6">SmartMove Admin</h2>
      <nav>
        <ul className="space-y-2">
          {/* Universal Links */}
          <li>
            <Link className={`block px-3 py-2 rounded ${isActive("/employee-dashboard")}`} to="/employee-dashboard">
              Employee Dashboard
            </Link>
          </li>
          <li>
            <Link className={`block px-3 py-2 rounded ${isActive("/training-modules")}`} to="/training-modules">
              Training Modules
            </Link>
          </li>
          {/* Admin Links */}
          {userRole === "admin" && (
            <>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/admin-panel")}`} to="/admin-panel">
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/analytics")}`} to="/analytics">
                  Analytics
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/audit-log")}`} to="/audit-log">
                  Audit Log
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/help-center")}`} to="/help-center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/system-admin-dashboard")}`} to="/system-admin-dashboard">
                  System Admin Dashboard
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/user-management")}`} to="/user-management">
                  User Management
                </Link>
              </li>
              <li>
                <Link className={`block px-3 py-2 rounded ${isActive("/threat-intelligence")}`} to="/threat-intelligence">
                  Threat Intelligence
                </Link>
              </li>
            </>
          )}
          {/* Universal Tools */}
          <li>
            <Link className={`block px-3 py-2 rounded ${isActive("/email-analyzer")}`} to="/email-analyzer">
              Email Analyzer
            </Link>
          </li>
          <li>
            <Link className={`block px-3 py-2 rounded ${isActive("/url-checker")}`} to="/url-checker">
              URL Checker
            </Link>
          </li>
          <li>
            <Link className={`block px-3 py-2 rounded ${isActive("/client-checker")}`} to="/client-checker">
              Client Checker
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
