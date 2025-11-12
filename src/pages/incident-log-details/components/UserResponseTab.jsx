import React from 'react';
import Icon from '../../../components/AppIcon';

const UserResponseTab = ({ userResponse }) => {
  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case 'clicked':
        return 'text-error bg-error/10 border-error';
      case 'reported':
        return 'text-success bg-success/10 border-success';
      case 'deleted':
        return 'text-warning bg-warning/10 border-warning';
      case 'forwarded':
        return 'text-accent bg-accent/10 border-accent';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCompromiseStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'compromised':
        return 'text-error bg-error/10 border-error';
      case 'secure':
        return 'text-success bg-success/10 border-success';
      case 'monitoring':
        return 'text-warning bg-warning/10 border-warning';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case 'clicked':
        return 'MousePointer';
      case 'reported':
        return 'Flag';
      case 'deleted':
        return 'Trash2';
      case 'forwarded':
        return 'Forward';
      case 'opened':
        return 'Mail';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Actions Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">User Response Timeline</h3>
        
        <div className="space-y-4">
          {userResponse?.timeline?.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 border border-accent rounded-full flex items-center justify-center">
                <Icon name={getActionIcon(event?.action)} size={14} className="text-accent" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">{event?.action}</span>
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getActionColor(event?.action)}`}>
                      {event?.riskLevel}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {new Date(event.timestamp)?.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">{event?.description}</p>
                
                {event?.details && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(event?.details)?.map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-text-secondary capitalize">{key?.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-text-primary font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Account Security Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Account Security Status</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Account Status</p>
                  <p className="text-xs text-text-secondary">Current security state</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium border rounded-full ${getCompromiseStatusColor(userResponse?.accountStatus?.status)}`}>
                {userResponse?.accountStatus?.status}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-text-primary">Security Indicators</h4>
              {userResponse?.securityIndicators?.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={indicator?.status === 'normal' ? 'CheckCircle' : 'AlertTriangle'} 
                      size={16} 
                      className={indicator?.status === 'normal' ? 'text-success' : 'text-warning'} 
                    />
                    <span className="text-sm text-text-primary">{indicator?.name}</span>
                  </div>
                  <span className="text-sm text-text-secondary">{indicator?.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Remediation Actions</h4>
              <div className="space-y-2">
                {userResponse?.remediationActions?.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={action?.completed ? 'CheckCircle' : 'Clock'} 
                        size={16} 
                        className={action?.completed ? 'text-success' : 'text-warning'} 
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{action?.name}</p>
                        <p className="text-xs text-text-secondary">{action?.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {action?.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Training Assignment</h4>
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name="GraduationCap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">
                    {userResponse?.trainingAssignment?.title}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  {userResponse?.trainingAssignment?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    Due: {new Date(userResponse.trainingAssignment.dueDate)?.toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium border rounded ${
                    userResponse?.trainingAssignment?.status === 'completed' 
                      ? 'text-success bg-success/10 border-success' :'text-warning bg-warning/10 border-warning'
                  }`}>
                    {userResponse?.trainingAssignment?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Click Analysis */}
      {userResponse?.clickAnalysis && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Click Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MousePointer" size={16} className="text-error" />
                <span className="text-sm font-medium text-text-primary">Links Clicked</span>
              </div>
              <p className="text-2xl font-bold text-error">{userResponse?.clickAnalysis?.linksClicked}</p>
              <p className="text-xs text-text-secondary">Out of {userResponse?.clickAnalysis?.totalLinks} links</p>
            </div>

            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-text-primary">Response Time</span>
              </div>
              <p className="text-2xl font-bold text-warning">{userResponse?.clickAnalysis?.responseTime}</p>
              <p className="text-xs text-text-secondary">From email receipt</p>
            </div>

            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MapPin" size={16} className="text-accent" />
                <span className="text-sm font-medium text-text-primary">Location</span>
              </div>
              <p className="text-sm font-medium text-accent">{userResponse?.clickAnalysis?.location}</p>
              <p className="text-xs text-text-secondary">{userResponse?.clickAnalysis?.ipAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserResponseTab;