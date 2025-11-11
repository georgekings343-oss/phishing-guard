import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailAnalysisTab = ({ emailData }) => {
  const [showRawHeaders, setShowRawHeaders] = useState(false);

  const getThreatLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'text-error bg-error/10 border-error';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning';
      case 'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getVerificationStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'suspicious':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'malicious':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'HelpCircle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Original Email</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Email
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-secondary">From:</span>
              <p className="text-text-primary">{emailData?.from}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">To:</span>
              <p className="text-text-primary">{emailData?.to}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">Subject:</span>
              <p className="text-text-primary">{emailData?.subject}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">Date:</span>
              <p className="text-text-primary">
                {new Date(emailData.date)?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-surface">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: emailData?.content }} />
            </div>
          </div>

          {emailData?.attachments && emailData?.attachments?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-primary">Attachments</h4>
              <div className="space-y-2">
                {emailData?.attachments?.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Paperclip" size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{attachment?.name}</p>
                        <p className="text-xs text-text-secondary">{attachment?.size} • {attachment?.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getThreatLevelColor(attachment?.threatLevel)}`}>
                      {attachment?.threatLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Threat Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Threat Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Malicious Links</h4>
              <div className="space-y-2">
                {emailData?.maliciousLinks?.map((link, index) => (
                  <div key={index} className="p-3 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="ExternalLink" size={16} className="text-error mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono text-text-primary break-all">{link?.url}</p>
                        <p className="text-xs text-text-secondary mt-1">{link?.description}</p>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium border rounded ${getThreatLevelColor(link?.threatLevel)}`}>
                          {link?.threatLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">PhishTank Analysis</h4>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Database" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">PhishTank Results</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status:</span>
                    <span className="text-text-primary font-medium">{emailData?.phishTankAnalysis?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Confidence:</span>
                    <span className="text-text-primary font-medium">{emailData?.phishTankAnalysis?.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Last Updated:</span>
                    <span className="text-text-primary font-medium">
                      {new Date(emailData.phishTankAnalysis.lastUpdated)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Sender Verification</h4>
              <div className="space-y-3">
                {emailData?.senderVerification?.map((check, index) => {
                  const status = getVerificationStatus(check?.status);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name={status?.icon} size={16} className={status?.color} />
                        <span className="text-sm font-medium text-text-primary">{check?.type}</span>
                      </div>
                      <span className="text-sm text-text-secondary">{check?.result}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Threat Intelligence</h4>
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">IP Reputation:</span>
                    <span className="text-text-primary font-medium">{emailData?.threatIntelligence?.ipReputation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Domain Age:</span>
                    <span className="text-text-primary font-medium">{emailData?.threatIntelligence?.domainAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Blacklist Status:</span>
                    <span className="text-text-primary font-medium">{emailData?.threatIntelligence?.blacklistStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Email Headers */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Email Headers</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRawHeaders(!showRawHeaders)}
          >
            {showRawHeaders ? 'Hide Raw Headers' : 'Show Raw Headers'}
          </Button>
        </div>

        {showRawHeaders && (
          <div className="p-4 bg-muted rounded-lg">
            <pre className="text-xs text-text-primary font-mono whitespace-pre-wrap overflow-x-auto">
              {emailData?.rawHeaders}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailAnalysisTab;