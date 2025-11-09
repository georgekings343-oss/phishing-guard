import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentAlertPanel = ({ incidents = [], loading = false }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const navigate = useNavigate();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error';
      case 'high': return 'text-warning bg-warning/10 border-warning';
      case 'medium': return 'text-accent bg-accent/10 border-accent';
      case 'low': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertCircle';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'Bell';
      default: return 'Bell';
    }
  };

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    navigate('/incident-log-details', { state: { incidentId: incident?.id } });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4]?.map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-muted rounded"></div>
                  <div className="w-1/2 h-3 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Shield" size={20} />
          <span>Recent Incidents</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => navigate('/incident-log-details')}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {incidents?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No recent incidents</p>
            <p className="text-sm text-muted-foreground">Your organization is secure</p>
          </div>
        ) : (
          incidents?.map((incident) => (
            <div
              key={incident?.id}
              onClick={() => handleIncidentClick(incident)}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-micro"
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${getSeverityColor(incident?.severity)}`}>
                <Icon name={getSeverityIcon(incident?.severity)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {incident?.title}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getSeverityColor(incident?.severity)}`}>
                    {incident?.severity?.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {incident?.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{incident?.affectedUsers} users affected</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatTimestamp(incident?.timestamp)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentAlertPanel;