import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MFAForm = ({ onSubmit, onResendCode, loading, error, email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (verificationCode?.length === 6) {
      onSubmit(verificationCode);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResendCode();
      setResendTimer(30);
      setCanResend(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
    setVerificationCode(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Shield" size={24} className="text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">
          Two-Factor Authentication
        </h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-sm font-medium text-text-primary">
          {email}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Verification Code
          </label>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={handleCodeChange}
            maxLength={6}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-center text-lg tracking-widest font-mono"
          />
        </div>

        {error && (
          <div className="p-3 bg-error/10 border border-error rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error font-medium">{error}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || verificationCode?.length !== 6}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </div>
          ) : (
            'Verify Code'
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || loading}
            className={`text-sm font-medium transition-colors ${
              canResend 
                ? 'text-accent hover:text-primary' 
                : 'text-muted-foreground cursor-not-allowed'
            }`}
          >
            {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
          </button>
        </div>
      </form>
      
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="w-full text-sm text-muted-foreground hover:text-text-primary transition-colors text-center"
        disabled={loading}
      >
        ← Back to login
      </button>
    </div>
  );
};

export default MFAForm;