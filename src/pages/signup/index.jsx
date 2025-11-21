import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm.jsx";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData) => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      console.log("Signing up user:", formData);
      alert("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Create Your Account</h1>
        <SignupForm onSubmit={handleSignup} loading={loading} />
        <p className="mt-4 text-sm text-gray-700 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
        <p className="mt-2 text-sm text-gray-700 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
