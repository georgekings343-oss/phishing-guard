import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'SOC 2 Compliant',
      description: 'Type II certified'
    },
    {
      icon: 'Eye',
      title: 'ISO 27001',
      description: 'Security certified'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Ready',
      description: 'Privacy compliant'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          TRUSTED BY ORGANIZATIONS WORLDWIDE
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-hover"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            </div>
            <h4 className="text-xs font-semibold text-text-primary mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} PhishGuard Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;