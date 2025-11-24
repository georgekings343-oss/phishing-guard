// src/pages/login/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
// import { users } from "../../utils/users"; // replaced with API call

export default function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.mfaRequired) {
        // Store MFA state in localStorage or context as needed
        localStorage.setItem("pendingMfaId", data.mfaId);
        localStorage.setItem("pendingEmail", formData.email);
        // Redirect to MFA verification page (implement this route/UI)
        navigate("/login/mfa");
        setLoading(false);
        return;
      }

      // Success: store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", data.user?.role || "client");

      // Redirect based on role
      if (data.user?.role === "admin") {
        navigate("/system-admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      setError("Login failed. " + err.message);
    } finally {
      setLoading(false);
    }
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
