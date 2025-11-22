// src/pages/login/index.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/*
  Dark Ops / SOC-style centered login page
  Self-contained: small Input, Button, Checkbox, Icon components are embedded
  Demo users are used for authentication & MFA (123456).
*/

const Icon = ({ name, size = 18, className = "" }) => {
  // very small inline icon set (no external deps)
  const common = { width: size, height: size, className };
  switch (name) {
    case "eye":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10.47 10.47a3 3 0 004.06 4.06" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7c1.66 0 3.2.33 4.6.93" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V5l7-3z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.6" />
          <path d="M7 11V8a5 5 0 0 1 10 0v3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 21v-2a4 4 0 0 1 3-3.87" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" strokeWidth="1.6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 6L9 17l-5-5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

/* Small Input component */
const Input = React.forwardRef(({ label, type = "text", value, onChange, placeholder, error, autoFocus = false }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-xs text-cyan-200 font-medium">{label}</label>}
      <input
        ref={ref}
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md bg-transparent border border-cyan-800 text-cyan-50 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition`}
      />
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
  );
});
Input.displayName = "Input";

/* Small Checkbox component */
const Checkbox = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center space-x-2 text-sm text-cyan-200 cursor-pointer">
    <input type="checkbox" className="w-4 h-4 rounded bg-transparent border border-cyan-700 text-cyan-400 focus:ring-cyan-500" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
    <span>{label}</span>
  </label>
);

/* Small Button */
const Button = ({ children, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition
      ${disabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-105"}
      bg-cyan-600 text-black ${className}`}
  >
    {children}
  </button>
);

/* Demo user store (replace with real backend) */
const DEMO_USERS = [
  { email: "admin@local.test", password: "AdminPass!23", role: "admin", firstName: "Alice" },
  { email: "employee@local.test", password: "EmployeePass!23", role: "employee", firstName: "Bob" },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // 'login' | 'mfa'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Login handler (demo)
  const handleSignIn = async (e) => {
    e?.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please provide email and password");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
      if (!found) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
      setCurrentUser(found);
      // For demo always require MFA
      setStep("mfa");
      setLoading(false);
    }, 700);
  };

  const handleVerifyMfa = async (e) => {
    e?.preventDefault();
    setError("");
    if (mfaCode.trim() === "") {
      setError("Enter verification code");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      if (mfaCode.trim() !== "123456") {
        setError("Invalid verification code");
        setLoading(false);
        return;
      }
      // Save auth
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", currentUser.role);
      localStorage.setItem("userEmail", currentUser.email);
      if (remember) localStorage.setItem("rememberMe", "true");
      // navigate based on role
      if (currentUser.role === "admin") navigate("/system-admin-dashboard");
      else navigate("/employee-dashboard");
    }, 700);
  };

  const handleResend = () => {
    // In production, call backend to send a real code
    alert("Demo: MFA code resent to " + currentUser?.email + " (use 123456)");
  };

  const handleForgotPassword = () => {
    // Navigate to your forgot-password route (if exists)
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071021] text-cyan-50 relative overflow-hidden">
      {/* Animated scan lines + subtle grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#071021] to-transparent opacity-50"></div>

        {/* horizontal scan line animation */}
        <div style={{ mixBlendMode: "overlay" }} className="absolute inset-0">
          <div className="w-full h-1/3 top-0 left-0 opacity-10 bg-gradient-to-b from-cyan-700/20 to-transparent animate-[scanY_6s_linear_infinite]"></div>
        </div>

        <style>
          {`
            @keyframes scanY {
              0% { transform: translateY(-40%); }
              100% { transform: translateY(140%); }
            }
          `}
        </style>

        {/* matrix grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0ea5a4" strokeOpacity="0.04" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      {/* Centered card */}
      <div className="relative z-10 max-w-md w-full p-6 rounded-xl bg-[rgba(6,10,16,0.6)] border border-cyan-800/40 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-md bg-gradient-to-br from-cyan-500 to-cyan-300">
            <Icon name="shield" size={22} className="text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-cyan-50">Dark Ops — Phishing Defender</h1>
            <p className="text-xs text-cyan-200/80">Secure access portal</p>
          </div>
        </div>

        {step === "login" ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.local" autoFocus />
            <div className="relative">
              <Input label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-9 text-cyan-300 hover:text-cyan-100"
                aria-label="Toggle show password"
              >
                {showPassword ? <Icon name="eye-off" /> : <Icon name="eye" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
              <button type="button" onClick={handleForgotPassword} className="text-sm text-cyan-300 hover:text-cyan-100">
                Forgot password?
              </button>
            </div>

            {error && <div className="text-sm text-red-400 font-medium">{error}</div>}

            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-cyan-200/80">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-300 hover:text-cyan-100 font-medium">
                Sign up
              </Link>
            </div>
          </form>
        ) : (
          // MFA step
          <form onSubmit={handleVerifyMfa} className="space-y-4">
            <div>
              <div className="text-sm text-cyan-200">Verification code sent to</div>
              <div className="text-sm font-medium text-cyan-50">{currentUser?.email}</div>
            </div>

            <Input label="6-digit code" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} placeholder="123456" />

            {error && <div className="text-sm text-red-400 font-medium">{error}</div>}

            <div className="grid grid-cols-2 gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </Button>
              <button type="button" onClick={handleResend} className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md border border-cyan-700 text-sm text-cyan-200 hover:bg-cyan-800/20">
                Resend
              </button>
            </div>

            <div className="text-center text-sm text-cyan-200/80">
              <button type="button" onClick={() => setStep("login")} className="text-cyan-300 hover:text-cyan-100">
                ← Back to login
              </button>
            </div>
          </form>
        )}

        {/* demo creds (toggle reveal) */}
        <div className="mt-4 text-xs text-cyan-300/70 border-t border-cyan-700/30 pt-3">
          Demo admin: <span className="font-medium">admin@local.test</span> / <span className="font-medium">AdminPass!23</span>
          <br />
          Demo employee: <span className="font-medium">employee@local.test</span> / <span className="font-medium">EmployeePass!23</span>
        </div>
      </div>
    </div>
  );
}
