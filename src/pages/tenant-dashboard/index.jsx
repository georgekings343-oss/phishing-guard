// src/pages/tenant-dashboard/index.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark"); // default dark theme
  const [showSettings, setShowSettings] = useState(false);

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleQuickAction = (action) => {
    switch (action) {
      case "scan":
        alert("Running security scan...");
        break;
      case "addUser":
        alert("Opening user management...");
        break;
      case "report":
        alert("Generating report...");
        break;
      case "lockdown":
        alert("Activating emergency lockdown!");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-purple-800 via-pink-800 to-yellow-700 text-gray-100" : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900"} font-sans`}>
      
      {/* Top Panel */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-white">Tenant Dashboard</h1>
        <div className="flex gap-4 items-center">
          <Link
            to="/url-checker"
            className="px-4 py-2 bg-white text-purple-800 rounded hover:bg-purple-800 hover:text-white transition"
          >
            URL Checker
          </Link>
          <Link
            to="/email-analyzer"
            className="px-4 py-2 bg-white text-pink-700 rounded hover:bg-pink-700 hover:text-white transition"
          >
            Email Analyzer
          </Link>

          {/* Settings / Theme / Logout */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
            >
              ⚙️ Settings
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-90 backdrop-blur-md text-gray-900 rounded shadow-lg p-3 z-50 flex flex-col gap-2">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                >
                  Toggle {theme === "dark" ? "Light" : "Dark"} Theme
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Security Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">{theme === "dark" ? "Security Overview" : "Security Overview"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 dark:bg-gray-700 p-4 rounded shadow">
              <div className="text-gray-300">Security Score</div>
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-green-300 text-sm mt-1">+5% from last week</div>
            </div>
            <div className="bg-white bg-opacity-20 dark:bg-gray-700 p-4 rounded shadow">
              <div className="text-gray-300">Active Threats</div>
              <div className="text-2xl font-bold text-red-400">3</div>
              <div className="text-sm mt-1">Requires attention</div>
            </div>
            <div className="bg-white bg-opacity-20 dark:bg-gray-700 p-4 rounded shadow">
              <div className="text-gray-300">Protected Devices</div>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-sm mt-1">All devices secure</div>
            </div>
            <div className="bg-white bg-opacity-20 dark:bg-gray-700 p-4 rounded shadow">
              <div className="text-gray-300">Last Scan</div>
              <div className="text-2xl font-bold text-white">2 hours ago</div>
              <div className="text-sm mt-1">Scheduled scan running</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleQuickAction("scan")}
              className="bg-white bg-opacity-20 p-4 rounded shadow hover:bg-white hover:text-gray-900 flex flex-col items-center transition"
            >
              <i className="fas fa-shield-check text-white text-2xl mb-2"></i>
              Run Security Scan
            </button>
            <button
              onClick={() => handleQuickAction("addUser")}
              className="bg-white bg-opacity-20 p-4 rounded shadow hover:bg-white hover:text-gray-900 flex flex-col items-center transition"
            >
              <i className="fas fa-user-plus text-white text-2xl mb-2"></i>
              Add User
            </button>
            <button
              onClick={() => handleQuickAction("report")}
              className="bg-white bg-opacity-20 p-4 rounded shadow hover:bg-white hover:text-gray-900 flex flex-col items-center transition"
            >
              <i className="fas fa-file-alt text-white text-2xl mb-2"></i>
              Generate Report
            </button>
            <button
              onClick={() => handleQuickAction("lockdown")}
              className="bg-white bg-opacity-20 p-4 rounded shadow hover:bg-red-400 hover:text-white flex flex-col items-center transition"
            >
              <i className="fas fa-lock text-white text-2xl mb-2"></i>
              Emergency Lockdown
            </button>
          </div>
        </section>

        {/* Activity Feed */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
          <div className="bg-white bg-opacity-20 p-4 rounded shadow space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-shield-check"></i>
              </div>
              <div>
                <div>Security scan completed</div>
                <div className="text-sm text-gray-200">10 minutes ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div>
                <div>Suspicious login detected</div>
                <div className="text-sm text-gray-200">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-user-check"></i>
              </div>
              <div>
                <div>New user added: Sarah</div>
                <div className="text-sm text-gray-200">5 hours ago</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
