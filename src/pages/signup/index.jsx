import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'employee'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Account created successfully! Please log in.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-security-gradient text-foreground">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="security-card rounded-2xl shadow-elevation-2 p-8 border border-border">
            <div className="text-center mb-8">
              <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Create Account</h2>
              <p className="text-muted-foreground">Join SMARTMOVE today</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-error">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-error">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="john.doe@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-2">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
                )}
              </div>

              {errors.submit && (
                <div className="p-4 bg-error/10 border border-error rounded-lg text-error text-sm">
                  {errors.submit}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent hover:text-accent/90 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="mt-6 p-4 security-card rounded-lg border border-border">
            <div className="text-center mb-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Enterprise-Grade Security
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="text-text-primary">
                <div className="text-lg font-bold text-success">99.9%</div>
                <div className="text-xs text-muted-foreground">Detection Rate</div>
              </div>
              <div className="text-text-primary">
                <div className="text-lg font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Monitoring</div>
              </div>
              <div className="text-text-primary">
                <div className="text-lg font-bold text-accent">256-bit</div>
                <div className="text-xs text-muted-foreground">Encryption</div>
              </div>
              <div className="text-text-primary">
                <div className="text-lg font-bold text-warning">SOC 2</div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;