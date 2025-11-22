import React from 'react';

const SecurityBadges = () => {
    return (
        <div className="security-badges-grid">
            <div className="badge-item">
                <div className="badge-icon">🔒</div>
                <div className="badge-title">SSL</div>
                <div className="badge-subtitle">Encrypted</div>
                <div className="badge-description">256-BIT ENCRYPTION</div>
            </div>
            <div className="badge-item">
                <div className="badge-icon">🏅</div>
                <div className="badge-title">SOC 2</div>
                <div className="badge-subtitle">Compliant</div>
                <div className="badge-description">TYPE II CERTIFIED</div>
            </div>
            <div className="badge-item">
                <div className="badge-icon">🛡️</div>
                <div className="badge-title">ISO</div>
                <div className="badge-subtitle">27001</div>
                <div className="badge-description">SECURITY CERTIFIED</div>
            </div>
            <div className="badge-item">
                <div className="badge-icon">✓</div>
                <div className="badge-title">GDPR</div>
                <div className="badge-subtitle">Ready</div>
                <div className="badge-description">PRIVACY COMPLIANT</div>
            </div>
        </div>
    );
};

export default SecurityBadges;