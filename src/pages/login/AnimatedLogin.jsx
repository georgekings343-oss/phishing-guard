import React from 'react';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import './AnimatedLogin.css';

const AnimatedLogin = () => {
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
                    <LoginForm />
                </div>

                {/* Sign Up Link */}
                <div className="signup-section">
                    <p>Don't have an account? <button className="signup-link">Sign up here</button></p>
                </div>

                {/* Single Trusted Section */}
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