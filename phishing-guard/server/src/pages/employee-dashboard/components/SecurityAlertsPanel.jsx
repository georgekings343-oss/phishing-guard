import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityAlertsPanel = ({ alerts, onViewAllAlerts }) => {
  const getAlertIcon = (type) => {
    const iconMap = {
      phishing: 'Mail',
      malware: 'Bug',
      'data-breach': 'Database',
      'policy-update': 'FileText',
      'system-update': 'Download',
      general: 'Info'
    };
    return iconMap?.[type] || 'AlertTriangle';
  };

  const getAlertColor = (severity) => {
    const colorMap = {
      critical: 'text-error',
      high: 'text-warning',
      medium: 'text-accent',
      low: 'text-text-secondary'
    };
    return colorMap?.[severity] || 'text-text-secondary';
  };

  const getAlertBgColor = (severity) => {
    const bgMap = {
      critical: 'bg-error/10 border-error/20',
      high: 'bg-warning/10 border-warning/20',
      medium: 'bg-accent/10 border-accent/20',
      low: 'bg-muted border-border'
    };
    return bgMap?.[severity] || 'bg-muted border-border';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Security Alerts</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={onViewAllAlerts}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Shield" size={48} className="text-success mx-auto mb-3" />
            <p className="text-text-secondary">No recent security alerts</p>
            <p className="text-sm text-text-secondary">Your security status is good</p>
          </div>
        ) : (
          alerts?.slice(0, 5)?.map((alert) => (
            <div
              key={alert?.id}
              className={`border rounded-lg p-4 transition-hover hover:shadow-elevation-1 ${getAlertBgColor(alert?.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getAlertColor(alert?.severity)}`}>
                  <Icon name={getAlertIcon(alert?.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-text-primary text-sm line-clamp-1">
                      {alert?.title}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      alert?.severity === 'critical' ? 'bg-error text-error-foreground' :
                      alert?.severity === 'high' ? 'bg-warning text-warning-foreground' :
                      alert?.severity === 'medium' ? 'bg-accent text-accent-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                    {alert?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {formatTimeAgo(alert?.timestamp)}
                    </span>
                    
                    {alert?.actionRequired && (
                      <div className="flex items-center space-x-1 text-xs text-warning">
                        <Icon name="AlertCircle" size={12} />
                        <span>Action Required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {alerts?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-secondary text-center">
            +{alerts?.length - 5} more alerts available
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityAlertsPanel;