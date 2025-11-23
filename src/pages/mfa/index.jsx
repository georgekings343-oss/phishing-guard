import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MFA = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleVerify = () => {
        if (code !== "123456") {
            alert("Invalid MFA code");
            return;
        }

        // Move pending user into real auth
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", localStorage.getItem("pendingRole"));

        // Cleanup
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("pendingRole");

        // Redirect based on role
        const role = localStorage.getItem("userRole");

        if (role === "admin") navigate("/system-admin-dashboard");
        else if (role === "tenant") navigate("/client-dashboard");
        else navigate("/employee-dashboard");
    };

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>MFA Verification</h1>
            <p>Enter the 6-digit code: <b>123456</b></p>

            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter MFA code"
                style={{ padding: "10px", marginTop: "20px" }}
            />

            <button
                onClick={handleVerify}
                style={{ display: "block", margin: "20px auto", padding: "10px 20px" }}
            >
                Verify
            </button>
        </div>
    );
};

export default MFA;
