import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityStats = [
    {
      value: "99.9%",
      label: "Detection Rate",
      color: "text-success"
    },
    {
      value: "24/7",
      label: "Monitoring",
      color: "text-primary"
    },
    {
      value: "Cost",
      label: "Efficient Solution",
      color: "text-accent"
    }
  ];

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
      {/* Security Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {securityStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-lg font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Security Features */}
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Enterprise-Grade Security
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
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

      {/* Footer */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SMARTMOVE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;