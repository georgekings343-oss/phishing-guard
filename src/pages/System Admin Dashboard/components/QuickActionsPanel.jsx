import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ className = "" }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Training Campaign',
      description: 'Launch new security awareness training for employees',
      icon: 'GraduationCap',
      iconColor: 'var(--color-success)',
      action: () => navigate('/training-campaigns/create'),
      variant: 'default',
      featured: true
    },
    {
      title: 'Generate Phishing Exercise',
      description: 'Create simulated phishing attack for testing',
      icon: 'Target',
      iconColor: 'var(--color-warning)',
      action: () => navigate('/phishing-exercises/create'),
      variant: 'outline',
      featured: true
    },
    {
      title: 'View Full Analytics',
      description: 'Access comprehensive security reports and metrics',
      icon: 'BarChart3',
      iconColor: 'var(--color-accent)',
      action: () => navigate('/reports'),
      variant: 'outline',
      featured: true
    },
    {
      title: 'Manage Users',
      description: 'Administer user accounts and permissions',
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      action: () => navigate('/user-management'),
      variant: 'ghost',
      featured: false
    },
    {
      title: 'System Settings',
      description: 'Configure security policies and system preferences',
      icon: 'Settings',
      iconColor: 'var(--color-muted-foreground)',
      action: () => navigate('/settings'),
      variant: 'ghost',
      featured: false
    },
    {
      title: 'Threat Intelligence',
      description: 'Review latest threat information and indicators',
      icon: 'Eye',
      iconColor: 'var(--color-error)',
      action: () => navigate('/threat-intelligence'),
      variant: 'ghost',
      featured: false
    }
  ];

  const featuredActions = quickActions?.filter(action => action?.featured);
  const secondaryActions = quickActions?.filter(action => !action?.featured);

  return (
    <div className={`quick-actions-panel ${className}`}>
      {/* Featured Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Quick Actions</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredActions?.map((action, index) => (
            <div
              key={index}
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-micro cursor-pointer"
              onClick={action?.action}
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-muted group-hover:bg-primary/10 rounded-lg transition-micro">
                  <Icon name={action?.icon} size={20} color={action?.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-micro">
                    {action?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {action?.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-3">
                <Button
                  variant={action?.variant}
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    action?.action();
                  }}
                  className="w-full"
                >
                  {action?.title?.split(' ')?.[0]}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Secondary Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Grid3X3" size={20} />
          <span>Additional Tools</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {secondaryActions?.map((action, index) => (
            <button
              key={index}
              onClick={action?.action}
              className="flex items-center space-x-3 p-3 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-micro group"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-muted group-hover:bg-primary/10 rounded-lg transition-micro">
                <Icon name={action?.icon} size={16} color={action?.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-micro">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {action?.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-micro" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;