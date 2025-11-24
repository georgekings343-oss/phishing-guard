// src/components/TopNav.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/employee-dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        {userRole === "admin" && (
          <>
            <Link to="/admin-panel" className="hover:text-blue-400">
              Admin Panel
            </Link>
            <Link to="/user-management" className="hover:text-blue-400">
              Users
            </Link>
            <Link to="/analytics" className="hover:text-blue-400">
              Analytics
            </Link>
          </>
        )}

        <Link to="/help-center" className="hover:text-blue-400">
          Help Center
        </Link>
        <Link to="/settings" className="hover:text-blue-400">
          Settings
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default TopNav;
