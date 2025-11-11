import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SecurityAlertBanner = ({ 
  alerts = [], 
  onDismiss, 
  className = "" 
}) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));
    setVisibleAlerts(filtered);
  }, [alerts, dismissedAlerts]);

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    if (onDismiss) {
      onDismiss(alertId);
    }
  };

  const handleAlertAction = (alert) => {
    if (alert?.actionPath) {
      navigate(alert?.actionPath);
    }
  };

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-error/10 border-error text-error-foreground',
          icon: 'AlertCircle',
          iconColor: 'var(--color-error)',
          pulse: true
        };
      case 'high':
        return {
          container: 'bg-warning/10 border-warning text-warning-foreground',
          icon: 'AlertTriangle',
          iconColor: 'var(--color-warning)',
          pulse: true
        };
      case 'medium':
        return {
          container: 'bg-accent/10 border-accent text-accent-foreground',
          icon: 'Info',
          iconColor: 'var(--color-accent)',
          pulse: false
        };
      case 'low':
        return {
          container: 'bg-muted border-border text-muted-foreground',
          icon: 'Bell',
          iconColor: 'var(--color-muted-foreground)',
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

  if (visibleAlerts?.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-16 left-0 right-0 z-1100 ${className}`}>
      <div className="space-y-1">
        {visibleAlerts?.slice(0, 3)?.map((alert) => {
          const styles = getAlertStyles(alert?.severity);
          
          return (
            <div
              key={alert?.id}
              className={`mx-4 lg:mx-6 px-4 py-3 border rounded-md shadow-elevation-1 ${styles?.container} ${
                styles?.pulse ? 'animate-pulse-slow' : ''
              }`}
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
                        {alert?.title}
                      </h4>
                      <span className="px-2 py-0.5 text-xs font-medium bg-surface/20 rounded-full">
                        {alert?.severity?.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm opacity-90 mb-2">
                      {alert?.message}
                    </p>
                    
                    {alert?.timestamp && (
                      <p className="text-xs opacity-70">
                        {new Date(alert.timestamp)?.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {alert?.actionLabel && alert?.actionPath && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlertAction(alert)}
                      className="text-xs"
                    >
                      {alert?.actionLabel}
                    </Button>
                  )}
                  
                  <button
                    onClick={() => handleDismiss(alert?.id)}
                    className="p-1 rounded-md hover:bg-surface/20 transition-hover"
                    title="Dismiss alert"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {visibleAlerts?.length > 3 && (
          <div className="mx-4 lg:mx-6 px-4 py-2 bg-muted border border-border rounded-md shadow-elevation-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                +{visibleAlerts?.length - 3} more security alerts
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/incident-log-details')}
                className="text-xs"
              >
                View All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAlertBanner;