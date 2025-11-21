// src/pages/login/index.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import MFAForm from './components/MFAForm';
import SecurityBadges from './components/SecurityBadges';

export default function Login() {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' | 'mfa'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mfaId, setMfaId] = useState(null);
  const [devCode, setDevCode] = useState(null); // for dev display only
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.mfaRequired) {
        setUserEmail(formData.email);
        setMfaId(data.mfaId);
        if (data.devCode) setDevCode(data.devCode); // dev-only
        setCurrentStep('mfa');
      } else if (data.token) {
        // fallback if backend returned token directly
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/employee-dashboard');
      }
    } catch (err) {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleMFAVerification = async (verificationCode) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mfaId, code: verificationCode })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Verification failed');
        setLoading(false);
        return;
      }

      // Save token & user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userRole', data.user.role);

      // Navigate based on role
      if (data.user.role === 'admin') navigate('/system-admin-dashboard');
      else navigate('/employee-dashboard');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // Optionally implement resend route later.
    // For now we call login again to regenerate an MFA code.
    if (!userEmail) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: '' }) // backend will reject password; better to implement dedicated resend endpoint
      });
      // Not implementing resend properly now; we leave UI to inform user to re-login if needed.
    } catch (err) { /* ignore */ } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-security-gradient text-foreground">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="security-card rounded-2xl shadow-elevation-2 p-8 border border-border">
            <LoginHeader />

            {currentStep === 'login' ? (
              <>
                <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-accent hover:text-accent/90 transition-colors">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <MFAForm
                  onSubmit={handleMFAVerification}
                  onResendCode={handleResendCode}
                  loading={loading}
                  error={error}
                  email={userEmail}
                />
                {devCode && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    DEV MFA CODE: <span className="font-medium text-accent">{devCode}</span>
                  </div>
                )}
              </>
            )}

            <SecurityBadges />
          </div>

          <div className="mt-6 p-4 security-card backdrop-blur-sm rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium text-primary">System Admin:</div>
                <div className="text-muted-foreground">admin@smartmove.com / Admin123! / MFA will be generated</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium text-accent">Employee:</div>
                <div className="text-muted-foreground">employee@company.com / Employee123! / MFA will be generated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
