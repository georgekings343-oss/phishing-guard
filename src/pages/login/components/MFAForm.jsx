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
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
  }, [resendTimer]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (verificationCode.length === 6) onSubmit(verificationCode);
  };

  const handleResend = () => {
    if (canResend) {
      onResendCode();
      setResendTimer(30);
      setCanResend(false);
    }
  };

  return (
    <div className="space-y-6 text-black">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        <p className="text-sm">We've sent a code to</p>
        <p className="text-sm font-medium">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6}
          required
          disabled={loading}
          className="text-center text-lg tracking-widest text-black placeholder-gray-500"
        />

        {error && (
          <div className="p-3 bg-error/10 border border-error rounded-md text-black">
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={verificationCode.length !== 6}
          loading={loading}
        >
          Verify Code
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend || loading}
          className="text-sm"
        >
          {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
        </button>
      </form>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="w-full text-sm"
      >
        ← Back to login
      </button>
    </div>
  );
};

export default MFAForm;
