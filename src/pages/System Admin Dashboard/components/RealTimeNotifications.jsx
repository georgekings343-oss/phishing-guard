import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeNotifications = ({ notifications = [], onDismiss, className = "" }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(new Set());

  useEffect(() => {
    const filtered = notifications?.filter(notification => !dismissedIds?.has(notification?.id));
    setVisibleNotifications(filtered);
  }, [notifications, dismissedIds]);

  const handleDismiss = (notificationId) => {
    setDismissedIds(prev => new Set([...prev, notificationId]));
    if (onDismiss) {
      onDismiss(notificationId);
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          container: 'bg-error/10 border-error text-error-foreground',
          icon: 'AlertCircle',
          iconColor: 'var(--color-error)',
          pulse: true
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning text-warning-foreground',
          icon: 'AlertTriangle',
          iconColor: 'var(--color-warning)',
          pulse: true
        };
      case 'info':
        return {
          container: 'bg-accent/10 border-accent text-accent-foreground',
          icon: 'Info',
          iconColor: 'var(--color-accent)',
          pulse: false
        };
      case 'success':
        return {
          container: 'bg-success/10 border-success text-success-foreground',
          icon: 'CheckCircle',
          iconColor: 'var(--color-success)',
          pulse: false
        };
      default:
        return {
          container: 'bg-muted border-border text-muted-foreground',
          icon: 'Bell',
          iconColor: 'var(--color-muted-foreground)',
          pulse: false
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime?.toLocaleDateString();
  };

  if (visibleNotifications?.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-20 right-4 z-1200 space-y-2 max-w-sm ${className}`}>
      {visibleNotifications?.slice(0, 5)?.map((notification) => {
        const styles = getNotificationStyles(notification?.type);
        
        return (
          <div
            key={notification?.id}
            className={`p-4 border rounded-lg shadow-elevation-2 ${styles?.container} ${
              styles?.pulse ? 'animate-pulse-slow' : ''
            } transition-all duration-300 transform translate-x-0`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon 
                  name={styles?.icon} 
                  size={20} 
                  color={styles?.iconColor}
                  className="mt-0.5 flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium">
                      {notification?.title}
                    </h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-surface/20 rounded-full">
                      {notification?.type?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-sm opacity-90 mb-2">
                    {notification?.message}
                  </p>
                  
                  <p className="text-xs opacity-70">
                    {formatTimestamp(notification?.timestamp)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDismiss(notification?.id)}
                className="p-1 rounded-md hover:bg-surface/20 transition-hover ml-2"
                title="Dismiss notification"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            {notification?.action && (
              <div className="mt-3 pt-3 border-t border-surface/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={notification?.action?.handler}
                  className="text-xs w-full"
                >
                  {notification?.action?.label}
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {visibleNotifications?.length > 5 && (
        <div className="p-3 bg-muted border border-border rounded-lg shadow-elevation-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              +{visibleNotifications?.length - 5} more notifications
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setDismissedIds(new Set(visibleNotifications.map(n => n.id)))}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;