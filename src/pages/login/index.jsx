// src/pages/login/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { users } from "../../utils/users"; // ensure this file exists

export default function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError("");
    setLoading(true);

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.password === formData.password
    );

    setTimeout(() => {
      if (!foundUser) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Save session
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", foundUser.role);

      // Redirect based on role
      if (foundUser.role === "admin") {
        navigate("/system-admin-dashboard");
      } else if (foundUser.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    }, 900);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <LoginForm 
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
