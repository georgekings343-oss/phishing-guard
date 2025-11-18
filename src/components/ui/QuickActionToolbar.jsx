// src/components/ui/QuickActionToolbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const QuickActionToolbar = ({ 
  userRole = 'employee', 
  className = "",
  variant = 'horizontal' // 'horizontal' | 'vertical' | 'grid'
}) => {
  const navigate = useNavigate();

  const getActionsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          {
            label: 'Training Modules',
            icon: 'GraduationCap',
            action: () => navigate('/training-modules'),
            variant: 'default',
            description: 'Access and manage training modules'
          },
          {
            label: 'Analytics',
            icon: 'BarChart3',
            action: () => navigate('/analytics'),
            variant: 'outline',
            description: 'View security reports and analytics'
          },
          {
            label: 'Settings',
            icon: 'Settings',
            action: () => navigate('/settings'),
            variant: 'ghost',
            description: 'Configure system settings'
          },
          {
            label: 'Admin Panel',
            icon: 'Users',
            action: () => navigate('/admin'),
            variant: 'default',
            description: 'Manage users and permissions'
          },
          {
            label: 'Help Center',
            icon: 'HelpCircle',
            action: () => navigate('/help-center'),
            variant: 'outline',
            description: 'Access support resources'
          }
        ];

      case 'employee':
      default:
        return [
          {
            label: 'Report Suspicious Email',
            icon: 'Mail',
            action: () => navigate('/suspicious-email-reporter'),
            variant: 'default',
            description: 'Report potentially malicious emails'
          },
          {
            label: 'Training Modules',
            icon: 'GraduationCap',
            action: () => navigate('/training-modules'),
            variant: 'outline',
            description: 'Access security awareness training'
          },
          {
            label: 'Help Center',
            icon: 'HelpCircle',
            action: () => navigate('/help-center'),
            variant: 'ghost',
            description: 'Learn security best practices and guides'
          }
        ];
    }
  };

  const actions = getActionsForRole(userRole);

  const getLayoutClasses = () => {
    switch (variant) {
      case 'vertical':
        return 'flex flex-col space-y-3';
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';
      case 'horizontal':
      default:
        return 'flex flex-wrap gap-3';
    }
  };

  const getButtonSize = () => (variant === 'grid' ? 'default' : 'sm');

  if (!actions || actions.length === 0) return null;

  return (
    <div className={`quick-action-toolbar ${className}`}>
      <div className={getLayoutClasses()}>
        {actions.map((action, index) => (
          <div key={index} className={variant === 'grid' ? 'group' : ''}>
            <Button
              variant={action.variant}
              size={getButtonSize()}
              iconName={action.icon}
              iconPosition="left"
              onClick={action.action}
              className={`
                transition-micro
                ${variant === 'grid' ? 'w-full h-auto py-4 flex-col space-y-2' : ''}
                ${variant === 'vertical' ? 'w-full justify-start' : ''}
              `}
            >
              <span className={variant === 'grid' ? 'text-center' : ''}>
                {action.label}
              </span>
              {variant === 'grid' && action.description && (
                <span className="text-xs opacity-70 font-normal mt-1 leading-tight">
                  {action.description}
                </span>
              )}
            </Button>

            {variant !== 'grid' && action.description && (
              <div className="hidden lg:block absolute z-1200 px-2 py-1 text-xs bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-micro pointer-events-none">
                {action.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionToolbar;
