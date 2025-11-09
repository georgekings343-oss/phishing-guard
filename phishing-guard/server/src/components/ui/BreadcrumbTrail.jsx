import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ 
  customBreadcrumbs = null,
  className = "",
  showHome = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/employee-dashboard',
        icon: 'Home'
      });
    }

    // Map path segments to readable labels
    const pathMap = {
      'system-admin-dashboard': 'Admin Dashboard',
      'employee-dashboard': 'Employee Dashboard',
      'incident-log-details': 'Incident Management',
      'suspicious-email-reporter': 'Report Threat',
      'training': 'Security Training',
      'reports': 'Reports',
      'settings': 'Settings',
      'help': 'Help Center',
      'user-management': 'User Management',
      'threat-intelligence': 'Threat Intelligence',
      'response-playbook': 'Response Playbook',
      'phishing-exercises': 'Phishing Exercises',
      'training-campaigns': 'Training Campaigns'
    };

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments?.length - 1;
      
      // Skip if this is the home path and we already added it
      if (showHome && (currentPath === '/employee-dashboard' || currentPath === '/system-admin-dashboard')) {
        return;
      }

      breadcrumbs?.push({
        label: pathMap?.[segment] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
        path: isLast ? null : currentPath, // Don't make the current page clickable
        icon: getBreadcrumbIcon(segment)
      });
    });

    return breadcrumbs;
  };

  const getBreadcrumbIcon = (segment) => {
    const iconMap = {
      'incident-log-details': 'Shield',
      'suspicious-email-reporter': 'AlertTriangle',
      'training': 'GraduationCap',
      'reports': 'BarChart3',
      'settings': 'Settings',
      'help': 'HelpCircle',
      'user-management': 'Users',
      'threat-intelligence': 'Eye',
      'response-playbook': 'BookOpen',
      'phishing-exercises': 'Target',
      'training-campaigns': 'Megaphone'
    };
    return iconMap?.[segment] || 'ChevronRight';
  };

  const breadcrumbs = customBreadcrumbs || getDefaultBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`breadcrumb-trail ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-1 text-sm">
        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-1" 
              />
            )}
            
            <div className="flex items-center space-x-1">
              {crumb?.icon && (
                <Icon 
                  name={crumb?.icon} 
                  size={14} 
                  className={crumb?.path ? 'text-accent' : 'text-muted-foreground'} 
                />
              )}
              
              {crumb?.path ? (
                <button
                  onClick={() => handleBreadcrumbClick(crumb?.path)}
                  className="text-accent hover:text-primary transition-hover font-medium"
                >
                  {crumb?.label}
                </button>
              ) : (
                <span className="text-text-primary font-medium">
                  {crumb?.label}
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;