import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import MFAForm from "./components/MFAForm";
import SecurityBadges from "./components/SecurityBadges";
import { users } from "../../utils/users.js";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleLoginSubmit = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) throw new Error("Invalid email or password");

      setCurrentUser(foundUser);
      setUserEmail(foundUser.email);
      setRequiresMFA(true); // For demo, all users require MFA
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMFASubmit = (code) => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (code === "123456") {
        // Save auth in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", currentUser.role);
        localStorage.setItem("userEmail", currentUser.email);
        alert(`Login successful! Welcome, ${currentUser.firstName}`);
        // Redirect based on role
        if (currentUser.role === "admin") navigate("/system-admin-dashboard");
        else navigate("/employee-dashboard");
      } else {
        setError("Invalid verification code");
      }
      setLoading(false);
    }, 1000);
  };

  const handleResendCode = () => {
    alert("Resending verification code to " + userEmail);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-50">
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-white md:bg-blue-600">
        <div className="w-full max-w-md">
          <LoginHeader />
          {!requiresMFA ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              loading={loading}
              error={error}
            />
          ) : (
            <MFAForm
              email={userEmail}
              onSubmit={handleMFASubmit}
              onResendCode={handleResendCode}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center p-8 md:p-16 bg-blue-700 text-white">
        <SecurityBadges />
      </div>
    </div>
  );
};

export default LoginPage;
