// src/pages/forgot-password/index.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace with real API call
      alert(`Password reset link sent to ${email}`);
      navigate("/login");
    } catch (err) {
      alert("Error sending password reset link: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} fullWidth>
            Send Reset Link
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-700 text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
