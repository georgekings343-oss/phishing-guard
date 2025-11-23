// src/pages/mfa/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MFA_METHODS = [
  { key: "sms", label: "SMS", description: "Receive code via SMS" },
  { key: "email", label: "Email", description: "Receive code via Email" },
  { key: "authenticator", label: "Authenticator", description: "Use Google Authenticator or similar (TOTP)" },
  { key: "backup", label: "Backup Codes", description: "One-time use codes if primary methods fail" }
];

const MFA = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("sms");
  const [code, setCode] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(120);
  const [trustedDevice, setTrustedDevice] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (idx, val) => {
    if (!/^\d*$/.test(val)) return; // only digits
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    if (val && idx < 5) {
      document.getElementById(`mfa-${idx + 1}`).focus();
    }
  };

  const handleVerify = () => {
    if (code.join("") !== "123456") {
      alert("Invalid MFA code");
      return;
    }
    const role = localStorage.getItem("pendingRole");
    const email = localStorage.getItem("pendingEmail");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);
    localStorage.removeItem("pendingEmail");
    localStorage.removeItem("pendingRole");

    if (role === "admin") navigate("/system-admin-dashboard");
    else if (role === "tenant") navigate("/tenant-dashboard");
    else navigate("/employee-dashboard");
  };

  const handleResend = () => {
    alert(`New code sent via ${selectedMethod.toUpperCase()}`);
    setTimer(120);
  };

  return (
    <div className="centered-login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="login-card" style={{ padding: "40px", width: "100%", maxWidth: "480px" }}>
        {/* Header */}
        <div className="login-header-section">
          <h1>MFA Verification</h1>
          <p>Secure your account by verifying your identity</p>
        </div>

        {/* Method Selection */}
        <div className="security-features" style={{ flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          {MFA_METHODS.map(method => (
            <div
              key={method.key}
              className={`feature-item ${selectedMethod === method.key ? "active" : ""}`}
              onClick={() => setSelectedMethod(method.key)}
              style={{
                cursor: "pointer",
                background: selectedMethod === method.key ? "rgba(66,153,225,0.25)" : "rgba(255,255,255,0.15)"
              }}
            >
              <span className="feature-icon">🔒</span>
              <div>
                <div style={{ fontWeight: "700" }}>{method.label}</div>
                <div style={{ fontSize: "0.75rem" }}>{method.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* MFA Code Inputs */}
        <div className="form-section" style={{ marginBottom: "20px" }}>
          <div className="flex justify-between" style={{ gap: "0.5rem" }}>
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`mfa-${idx}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={e => handleInput(idx, e.target.value)}
                style={{
                  width: "3rem",
                  height: "3rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "#0c2461",
                  background: "#f1f5f9",
                  border: "2px solid #4299e1",
                  borderRadius: "8px",
                  outline: "none"
                }}
              />
            ))}
          </div>
        </div>

        {/* Timer & Resend */}
        <div className="form-options" style={{ justifyContent: "space-between", marginBottom: "20px" }}>
          <div>Code expires in: {timer}s</div>
          <button
            className="hacker-button"
            style={{ width: "120px", fontSize: "0.85rem", padding: "8px 12px" }}
            onClick={handleResend}
            disabled={timer > 0}
          >
            Resend
          </button>
        </div>

        {/* Trust Device */}
        <div className="checkbox-container" style={{ marginBottom: "20px" }}>
          <input
            type="checkbox"
            id="trust-device"
            checked={trustedDevice}
            onChange={e => setTrustedDevice(e.target.checked)}
          />
          <label htmlFor="trust-device">Trust this device</label>
        </div>

        {/* Verify Button */}
        <button className="hacker-button" onClick={handleVerify}>
          Verify
        </button>

        {/* Help / Info */}
        <div className="trusted-section" style={{ marginTop: "24px" }}>
          <p>Having trouble? <button className="signup-link" onClick={() => alert("Contact support@smartmove.com")}>Get Help</button></p>
        </div>
      </div>
    </div>
  );
};

export default MFA;
