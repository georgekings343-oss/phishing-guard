import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import './AnimatedLogin.css';

const AnimatedLogin = () => {
    const navigate = useNavigate();

    // Handle login submission
    const handleLogin = (formData) => {
        const { email, password } = formData;

        // ⛔ Fake authentication for now (until backend added)
        if (!email || !password) return;

        // If login succeeds
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "employee"); // TEMP — replace with backend

        navigate("/employee-dashboard");
    };

    return (
        <div className="centered-login-container">
            <div className="login-card">

                {/* Header Section */}
                <div className="login-header-section">
                    <h1>SMARTMOVE SECURITY SYSTEM</h1>
                    <p>Sign in to your cybersecurity dashboard</p>

                    <div className="security-features">
                        <div className="feature-item">
                            <span className="feature-icon">👥</span>
                            <span>Multi-Role Access</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔒</span>
                            <span>Secure Authentication</span>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="form-section">
                    <LoginForm onSubmit={handleLogin} loading={false} error={null} />
                </div>

                {/* Sign Up Link */}
                <div className="signup-section">
                    <p>
                        Don't have an account?{" "}
                        <button
                            className="signup-link"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up here
                        </button>
                    </p>
                </div>

                {/* Trusted Section */}
                <div className="trusted-section">
                    <p>TRUSTED BY ORGANIZATIONS WORLDWIDE</p>
                    <SecurityBadges />
                </div>

                {/* Footer */}
                <div className="login-footer">
                    <p>© 2025 SMARTMOVE. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </div>
    );
};

export default AnimatedLogin;
