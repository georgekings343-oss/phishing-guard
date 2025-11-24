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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-10 right-1/4 w-5 h-5 bg-blue-300 rounded-full animate-pulse"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-repeat bg-[length:40px_40px]" 
           style={{backgroundImage: 'linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)'}}>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with welcoming message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Aboard
            </h1>
          </div>
          <p className="text-blue-200 text-lg">
            Join SmartMove Security today
          </p>
          <p className="text-gray-400 mt-2">
            Start your journey to better cybersecurity
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-blue-500/20 shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white text-center">
              Create Your Account
            </h2>
            <p className="text-gray-400 text-sm text-center mt-2">
              Secure your digital life in minutes
            </p>
          </div>

          <SignupForm onSubmit={handleSignup} loading={loading} />

          {/* Additional links */}
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-400 text-center">
              Already part of our community?{" "}
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
              >
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-gray-400 text-center">
              <Link 
                to="/forgot-password" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>

        {/* Security features highlight */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Privacy first</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;