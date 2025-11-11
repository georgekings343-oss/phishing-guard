import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'employee', alertCount = 0, onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'admin' ? '/system-admin-dashboard' : '/employee-dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'employee', 'it-response'],
      primary: true
    },
    {
      label: 'Incident Management',
      path: '/incident-log-details',
      icon: 'Shield',
      roles: ['admin', 'it-response'],
      primary: true
    },
    {
      label: 'Report Threat',
      path: '/suspicious-email-reporter',
      icon: 'AlertTriangle',
      roles: ['employee', 'admin', 'it-response'],
      primary: true
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      roles: ['admin', 'employee', 'it-response']
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle',
      roles: ['admin', 'employee', 'it-response']
    },
    {
      label: 'Admin Panel',
      path: '/admin',
      icon: 'Users',
      roles: ['admin']
    }
  ];

  const filteredPrimaryItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole) && item?.primary
  );

  const filteredSecondaryItems = secondaryItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuToggle) {
      onMenuToggle(!isMenuOpen);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMoreMenuOpen && !event?.target?.closest('.more-menu-container')) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMoreMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation(userRole === 'admin' ? '/system-admin-dashboard' : '/employee-dashboard')}
            className="flex items-center space-x-3 transition-hover hover:opacity-80"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-primary font-sans">
              PhishGuard Pro
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredPrimaryItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-primary hover:bg-muted hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {item?.label === 'Report Threat' && alertCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-error text-error-foreground rounded-full animate-pulse-slow">
                  {alertCount}
                </span>
              )}
            </button>
          ))}

          {/* More Menu */}
          {filteredSecondaryItems?.length > 0 && (
            <div className="relative more-menu-container">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-text-primary hover:bg-muted hover:text-primary transition-micro"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1">
                  {filteredSecondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Bell"
            iconPosition="left"
            className="relative"
          >
            Alerts
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center animate-pulse-slow">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="LogOut"
            iconPosition="left"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md text-text-primary hover:bg-muted transition-hover"
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {filteredPrimaryItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium transition-micro ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.label === 'Report Threat' && alertCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs bg-error text-error-foreground rounded-full">
                    {alertCount}
                  </span>
                )}
              </button>
            ))}

            {filteredSecondaryItems?.length > 0 && (
              <>
                <div className="border-t border-border my-2"></div>
                {filteredSecondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium text-text-primary hover:bg-muted transition-micro"
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </>
            )}

            <div className="border-t border-border my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium text-text-primary hover:bg-muted transition-micro"
            >
              <Icon name="LogOut" size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;