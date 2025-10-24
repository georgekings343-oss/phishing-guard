import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Shield" size={28} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-primary">
          PhishGuard Pro
        </h1>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-text-primary">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your cybersecurity dashboard
        </p>
      </div>
      
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={12} />
          <span>Multi-Role Access</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Secure Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;