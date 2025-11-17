import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../components/AppIcon';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      name: 'Create Training Campaign',
      description: 'Launch new security awareness training for employees',
      icon: 'BookOpen',
      path: '/training-campaigns',
      color: 'blue'
    },
    {
      name: 'Generate Phishing Exercise', 
      description: 'Create simulated phishing attack for training',
      icon: 'Fish',
      path: '/phishing-exercise',
      color: 'orange'
    },
    {
      name: 'View Full Analytics',
      description: 'Access comprehensive security reports and metrics',
      icon: 'BarChart3',
      path: '/analytics',
      color: 'green'
    },
    {
      name: 'Manage Users',
      description: 'Administer user accounts and permissions',
      icon: 'Users',
      path: '/user-management',
      color: 'purple'
    },
    {
      name: 'System Settings',
      description: 'Configure security policies and system preferences',
      icon: 'Settings',
      path: '/settings',
      color: 'gray'
    },
    {
      name: 'Threat Intelligence',
      description: 'Review latest threat information and indicators',
      icon: 'ShieldAlert',
      path: '/threat-intel',
      color: 'red'
    },
    {
      name: 'Email Analyzer',
      description: 'Check suspicious emails for phishing attempts',
      icon: 'Mail',
      path: '/email-analyzer',
      color: 'blue'
    },
    {
      name: 'URL Checker', 
      description: 'Verify suspicious links and websites',
      icon: 'Link',
      path: '/url-checker',
      color: 'green'
    }
  ];

  const additionalTools = [
    {
      name: 'Incident Reports',
      description: 'View and manage security incident reports',
      icon: 'FileText',
      path: '/incident-log-details',
      color: 'orange'
    },
    {
      name: 'Security Dashboard',
      description: 'Monitor real-time security metrics and alerts',
      icon: 'LayoutDashboard',
      path: '/system-admin-dashboard',
      color: 'blue'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      gray: 'bg-gray-100 text-gray-600',
      red: 'bg-red-100 text-red-600'
    };
    return colorMap[color] || 'bg-primary-100 text-primary-600';
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
          <Icon name="Zap" size={20} className="text-warning" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link 
              key={action.name} 
              to={action.path}
              className="block"
            >
              <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] h-full group">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getColorClasses(action.color)} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={action.icon} size={24} />
                </div>
                <h3 className="font-semibold text-text-primary text-sm mb-2">{action.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{action.description}</p>
                <div className="mt-3 flex items-center text-xs text-primary font-medium">
                  <span>Access Tool</span>
                  <Icon name="ArrowRight" size={12} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Tools Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Additional Tools</h2>
          <Icon name="Tool" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalTools.map((tool) => (
            <Link 
              key={tool.name} 
              to={tool.path}
              className="block"
            >
              <div className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] h-full group">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(tool.color)} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon name={tool.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-sm mb-1">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Threat Intelligence Section */}
        <div className="mt-4 pt-4 border-t border-border">
          <Link to="/threat-intel">
            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg hover:bg-warning/20 transition-colors duration-200 group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon name="ShieldAlert" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">Threat Intelligence</h3>
                  <p className="text-xs text-muted-foreground">Review latest threat information and indicators</p>
                </div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-warning" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;