import React from 'react';
import { Link } from 'react-router-dom';

// Simple icon mapping as fallback
const Icon = ({ name, size = 20 }) => {
  const iconMap = {
    LayoutDashboard: '📊',
    FileText: '📄',
    Mail: '📧',
    Link: '🔗',
    AlertTriangle: '⚠️',
    Users: '👥',
    Settings: '⚙️',
    BarChart3: '📈',
    ShieldAlert: '🛡️'
  };
  
  return <span style={{ fontSize: size }}>{iconMap[name] || '📁'}</span>;
};

const QuickActionsPanel = () => {
  const quickActions = [
    {
      name: 'Security Dashboard',
      description: 'Monitor real-time security metrics',
      icon: 'LayoutDashboard',
      path: '/system-admin-dashboard',
      color: 'blue'
    },
    {
      name: 'Incident Reports', 
      description: 'View and manage security incidents',
      icon: 'FileText',
      path: '/incident-log-details',
      color: 'orange'
    },
    {
      name: 'Email Analyzer',
      description: 'Check suspicious emails for phishing',
      icon: 'Mail',
      path: '/email-analyzer',
      color: 'green'
    },
    {
      name: 'URL Checker',
      description: 'Verify suspicious links and websites',
      icon: 'Link',
      path: '/url-checker',
      color: 'purple'
    },
    {
      name: 'Phishing Reporter',
      description: 'Report suspicious emails',
      icon: 'AlertTriangle',
      path: '/suspicious-email-reporter',
      color: 'red'
    },
    {
      name: 'Employee Portal',
      description: 'Access employee dashboard',
      icon: 'Users',
      path: '/employee-dashboard',
      color: 'gray'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      orange: 'bg-orange-100',
      purple: 'bg-purple-100',
      gray: 'bg-gray-100',
      red: 'bg-red-100'
    };
    return colorMap[color] || 'bg-blue-100';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link 
            key={action.name} 
            to={action.path}
            className="block"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] h-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${getColorClasses(action.color)}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.name}</h3>
              <p className="text-xs text-gray-600">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
