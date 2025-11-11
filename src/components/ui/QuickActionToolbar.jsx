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
            label: 'Create Training Campaign',
            icon: 'GraduationCap',
            action: () => navigate('/training-campaigns/create'),
            variant: 'default',
            description: 'Launch new security awareness training'
          },
          {
            label: 'Generate Exercise',
            icon: 'Target',
            action: () => navigate('/phishing-exercises/create'),
            variant: 'outline',
            description: 'Create phishing simulation exercise'
          },
          {
            label: 'View Reports',
            icon: 'BarChart3',
            action: () => navigate('/reports'),
            variant: 'outline',
            description: 'Access security analytics and reports'
          },
          {
            label: 'Manage Users',
            icon: 'Users',
            action: () => navigate('/user-management'),
            variant: 'ghost',
            description: 'Administer user accounts and permissions'
          }
        ];
      
      case 'it-response':
        return [
          {
            label: 'Investigate Incident',
            icon: 'Search',
            action: () => navigate('/incident-log-details'),
            variant: 'default',
            description: 'Review and analyze security incidents'
          },
          {
            label: 'Report Threat',
            icon: 'AlertTriangle',
            action: () => navigate('/suspicious-email-reporter'),
            variant: 'outline',
            description: 'Submit suspicious email or threat'
          },
          {
            label: 'Threat Intelligence',
            icon: 'Shield',
            action: () => navigate('/threat-intelligence'),
            variant: 'outline',
            description: 'Access latest threat information'
          },
          {
            label: 'Response Playbook',
            icon: 'BookOpen',
            action: () => navigate('/response-playbook'),
            variant: 'ghost',
            description: 'View incident response procedures'
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
            label: 'Security Training',
            icon: 'GraduationCap',
            action: () => navigate('/training'),
            variant: 'outline',
            description: 'Access security awareness training'
          },
          {
            label: 'Security Tips',
            icon: 'Lightbulb',
            action: () => navigate('/security-tips'),
            variant: 'ghost',
            description: 'Learn security best practices'
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

  const getButtonSize = () => {
    return variant === 'grid' ? 'default' : 'sm';
  };

  if (actions?.length === 0) {
    return null;
  }

  return (
    <div className={`quick-action-toolbar ${className}`}>
      <div className={getLayoutClasses()}>
        {actions?.map((action, index) => (
          <div key={index} className={variant === 'grid' ? 'group' : ''}>
            <Button
              variant={action?.variant}
              size={getButtonSize()}
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.action}
              className={`
                transition-micro
                ${variant === 'grid' ? 'w-full h-auto py-4 flex-col space-y-2' : ''}
                ${variant === 'vertical' ? 'w-full justify-start' : ''}
              `}
            >
              <span className={variant === 'grid' ? 'text-center' : ''}>
                {action?.label}
              </span>
              {variant === 'grid' && action?.description && (
                <span className="text-xs opacity-70 font-normal mt-1 leading-tight">
                  {action?.description}
                </span>
              )}
            </Button>
            
            {variant !== 'grid' && action?.description && (
              <div className="hidden lg:block absolute z-1200 px-2 py-1 text-xs bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-micro pointer-events-none">
                {action?.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionToolbar;