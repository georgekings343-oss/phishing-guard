import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import MFAForm from './components/MFAForm';
import SecurityBadges from './components/SecurityBadges';

const Login = () => {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' | 'mfa'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Mock credentials for different user roles
  const mockCredentials = {
    'admin@phishguard.com': { 
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = mockCredentials?.[formData?.email];
      
      if (!user || user?.password !== formData?.password) {
        setError('Invalid email or password. Please check your credentials and try again.');
        setLoading(false);
        return;
      }

      // Store user email for MFA step
      setUserEmail(formData?.email);
      
      // Store remember me preference
      if (formData?.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', formData?.email);
      }

      // Proceed to MFA
      setCurrentStep('mfa');
      setLoading(false);
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  const handleMFAVerification = async (verificationCode) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockCredentials?.[userEmail];
      
      if (user?.mfaCode !== verificationCode) {
        setError('Invalid verification code. Please check and try again.');
        setLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem('userRole', user?.role);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', new Date()?.toISOString());

      // Navigate to appropriate dashboard
      navigate(user?.dashboard);
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // Simulate resend code API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real app, this would trigger a new MFA code to be sent
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-2xl shadow-elevation-2 p-8 border border-border">
          <LoginHeader />
          
          {currentStep === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          ) : (
            <MFAForm
              onSubmit={handleMFAVerification}
              onResendCode={handleResendCode}
              loading={loading}
              error={error}
              email={userEmail}
            />
          )}
          
          <SecurityBadges />
        </div>
        
        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-surface/80 backdrop-blur-sm rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Demo Credentials:</h3>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-1 gap-1">
              <div className="font-medium text-primary">System Admin:</div>
              <div className="text-muted-foreground">admin@phishguard.com / Admin123! / MFA: 123456</div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="font-medium text-accent">Employee:</div>
              <div className="text-muted-foreground">employee@company.com / Employee123! / MFA: 654321</div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="font-medium text-success">IT Response:</div>
              <div className="text-muted-foreground">itresponse@company.com / ITResponse123! / MFA: 789012</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;