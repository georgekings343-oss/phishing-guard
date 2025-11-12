import React from 'react';
import Icon from '../../../components/AppIcon';

const IncidentOverview = ({ incident }) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-error bg-error/10 border-error';
      case 'high':
        return 'text-warning bg-warning/10 border-warning';
      case 'medium':
        return 'text-accent bg-accent/10 border-accent';
      case 'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'text-error bg-error/10 border-error';
      case 'investigating':
        return 'text-warning bg-warning/10 border-warning';
      case 'resolved':
        return 'text-success bg-success/10 border-success';
      case 'closed':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-accent bg-accent/10 border-accent';
    }
  };

  const getThreatTypeIcon = (threatType) => {
    switch (threatType?.toLowerCase()) {
      case 'phishing':
        return 'Mail';
      case 'malware':
        return 'Bug';
      case 'social engineering':
        return 'Users';
      case 'credential theft':
        return 'Key';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Incident #{incident?.id}
          </h2>
          <p className="text-text-secondary">
            Reported on {new Date(incident.timestamp)?.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-sm font-medium border rounded-full ${getSeverityColor(incident?.severity)}`}>
            {incident?.severity}
          </span>
          <span className={`px-3 py-1 text-sm font-medium border rounded-full ${getStatusColor(incident?.status)}`}>
            {incident?.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="User" size={16} />
            <span className="text-sm font-medium">Affected User</span>
          </div>
          <p className="text-text-primary font-medium">{incident?.affectedUser}</p>
          <p className="text-sm text-text-secondary">{incident?.userEmail}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name={getThreatTypeIcon(incident?.threatType)} size={16} />
            <span className="text-sm font-medium">Threat Type</span>
          </div>
          <p className="text-text-primary font-medium">{incident?.threatType}</p>
          <p className="text-sm text-text-secondary">{incident?.threatDescription}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Shield" size={16} />
            <span className="text-sm font-medium">Assigned To</span>
          </div>
          <p className="text-text-primary font-medium">{incident?.assignedTo}</p>
          <p className="text-sm text-text-secondary">{incident?.assignedTeam}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={16} />
            <span className="text-sm font-medium">Response Time</span>
          </div>
          <p className="text-text-primary font-medium">{incident?.responseTime}</p>
          <p className="text-sm text-text-secondary">
            SLA: {incident?.slaStatus === 'met' ? 'Met' : 'Exceeded'}
          </p>
        </div>
      </div>
      {incident?.summary && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium text-text-primary mb-2">Incident Summary</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {incident?.summary}
          </p>
        </div>
      )}
    </div>
  );
};

export default IncidentOverview;