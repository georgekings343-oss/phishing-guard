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
          <Icon name="Shield" size={24} color="var(--color-accent)" />
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
        <Input
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={handleCodeChange}
          maxLength={6}
          required
          disabled={loading}
          className="text-center text-lg tracking-widest"
        />

        {error && (
          <div className="p-3 bg-error/10 border border-error rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error font-medium">{error}</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          disabled={verificationCode?.length !== 6}
          iconName="Shield"
          iconPosition="left"
        >
          Verify Code
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || loading}
            className={`text-sm font-medium transition-hover ${
              canResend 
                ? 'text-accent hover:text-primary' :'text-muted-foreground cursor-not-allowed'
            }`}
          >
            {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => window.location?.reload()}
        className="w-full text-sm text-muted-foreground hover:text-text-primary transition-hover"
        disabled={loading}
      >
        ← Back to login
      </button>
    </div>
  );
};

export default MFAForm;