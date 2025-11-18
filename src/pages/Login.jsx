import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Replace broken imports with existing UI components
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SecurityAlertBanner from '../components/ui/SecurityAlertBanner'; // Used as SecurityBadges replacement

const Login = () => {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' | 'mfa'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Mock credentials for different user roles
  const mockCredentials = {
    'admin@smartmove.com': {
      password: 'Admin123!',
      role: 'admin',
      mfaCode: '123456',
      dashboard: '/system-admin-dashboard'
    },
    'employee@company.com': {
      password: 'Employee123!',
      role: 'employee',
      mfaCode: '654321',
      dashboard: '/employee-dashboard'
    },
    'itresponse@company.com': {
      password: 'ITResponse123!',
      role: 'it-response',
      mfaCode: '789012',
      dashboard: '/employee-dashboard'
    }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = mockCredentials?.[formData?.email];

      if (!user || user?.password !== formData?.password) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      setUserEmail(formData?.email);

      if (formData?.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', formData?.email);
      }

      setCurrentStep('mfa');
      setLoading(false);
    } catch (err) {
      setError('An error occurred during login.');
      setLoading(false);
    }
  };

  const handleMFAVerification = async (verificationCode) => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockCredentials?.[userEmail];

      if (user?.mfaCode !== verificationCode) {
        setError('Invalid verification code.');
        setLoading(false);
        return;
      }

      localStorage.setItem('userRole', user?.role);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());

      navigate(user.dashboard);
    } catch (err) {
      setError('An error occurred during verification.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-security-gradient text-foreground">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="security-card rounded-2xl shadow-elevation-2 p-8 border border-border">

            {/* Login Header Replacement */}
            <Header title="Secure Login" subtitle="Access your dashboard" />

            {currentStep === 'login' ? (
              <>
                {/* Login Form Replacement */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = {
                      email: e.target.email.value,
                      password: e.target.password.value,
                      rememberMe: e.target.rememberMe.checked,
                    };
                    handleLogin(formData);
                  }}
                  className="space-y-4"
                >
                  <Input label="Email" name="email" type="email" required />
                  <Input label="Password" name="password" type="password" required />
                  
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" name="rememberMe" />
                    <span>Remember me</span>
                  </label>

                  {error && <SecurityAlertBanner message={error} />}

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Authenticating..." : "Continue"}
                  </Button>
                </form>

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
              // MFA Form Replacement
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMFAVerification(e.target.code.value);
                }}
                className="space-y-4"
              >
                <Header title="Multi-Factor Authentication" subtitle={`Code sent to ${userEmail}`} />

                <Input label="Verification Code" name="code" required />

                {error && <SecurityAlertBanner message={error} />}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </form>
            )}
          </div>

          {/* Demo credentials unchanged */}
          <div className="mt-6 p-4 security-card backdrop-blur-sm rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-xs">
              <p>System Admin → admin@smartmove.com / Admin123! / MFA: 123456</p>
              <p>Employee → employee@company.com / Employee123! / MFA: 654321</p>
              <p>IT Response → itresponse@company.com / ITResponse123! / MFA: 789012</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
