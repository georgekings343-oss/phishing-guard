 import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';  // FIXED IMPORT
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email)
      errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Enter a valid email";

    if (!formData.password)
      errors.password = "Password is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div className="input-group">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={validationErrors.email}
          disabled={loading}
          className="hacker-input"
        />
      </div>

      {/* Password */}
      <div className="input-group">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={validationErrors.password}
            disabled={loading}
            className="hacker-input pr-10"
          />

          <button
            type="button"
            className="password-toggle absolute right-3 top-9"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
      </div>

      {/* Remember / Forgot */}
      <div className="flex items-center justify-between pt-2">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          disabled={loading}
          className="hacker-checkbox"
        />

        <button type="button" className="forgot-password text-sm">
          Forgot password?
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-md text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          iconName="LogIn"
          iconPosition="left"
          className="hacker-button"
        >
          Sign In
        </Button>
      </div>

    </form>
  );
};

export default LoginForm;
