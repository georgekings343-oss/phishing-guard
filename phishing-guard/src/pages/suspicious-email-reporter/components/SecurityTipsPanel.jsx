import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityTipsPanel = ({ className = "" }) => {
  const [expandedTip, setExpandedTip] = useState(null);

  const securityTips = [
    {
      id: 'identify-phishing',
      title: 'How to Identify Phishing Emails',
      icon: 'Eye',
      category: 'Detection',
      summary: 'Learn the common signs of phishing attempts',
      details: [
        'Check sender email address carefully for misspellings or suspicious domains',
        'Look for urgent language like "Act now" or "Verify immediately"',
        'Be wary of generic greetings like "Dear Customer" instead of your name',
        'Hover over links to see the actual destination before clicking',
        'Check for poor grammar, spelling errors, or formatting issues',
        'Be suspicious of unexpected attachments or download requests'
      ]
    },
    {
      id: 'suspicious-links',
      title: 'Handling Suspicious Links',
      icon: 'Link',
      category: 'Prevention',
      summary: 'Best practices for dealing with questionable links',
      details: [
        'Never click links in suspicious emails directly',
        'Hover over links to preview the destination URL',
        'Look for URL shorteners (bit.ly, tinyurl) which can hide destinations',
        'Check for misspelled domain names (e.g., "arnazon.com" instead of "amazon.com")',
        'When in doubt, navigate to the website directly through your browser',
        'Use link checking tools or security extensions when available'
      ]
    },
    {
      id: 'safe-reporting',
      title: 'Safe Reporting Practices',
      icon: 'Shield',
      category: 'Response',
      summary: 'How to safely report suspicious emails',
      details: [
        'Forward suspicious emails as attachments, not inline text',
        'Do not click any links or download attachments before reporting',
        'Include the full email headers when possible',
        'Report immediately - time is critical in cybersecurity',
        'Keep the original email until IT security confirms it\'s safe to delete',
        'Document any actions you may have taken before realizing it was suspicious'
      ]
    },
    {
      id: 'immediate-actions',
      title: 'If You Clicked a Suspicious Link',
      icon: 'AlertTriangle',
      category: 'Response',
      summary: 'Steps to take if you\'ve already interacted with a threat',
      details: [
        'Disconnect from the internet immediately if possible',
        'Do not enter any personal information on suspicious websites',
        'Change your passwords, starting with the most critical accounts',
        'Run a full antivirus scan on your device',
        'Report the incident to IT security immediately',
        'Monitor your accounts for unusual activity',
        'Consider enabling two-factor authentication on all accounts'
      ]
    },
    {
      id: 'email-security',
      title: 'General Email Security',
      icon: 'Mail',
      category: 'Prevention',
      summary: 'Everyday practices to stay secure',
      details: [
        'Keep your email client and security software updated',
        'Use strong, unique passwords for your email accounts',
        'Enable two-factor authentication when available',
        'Be cautious about what information you share in emails',
        'Regularly review and clean up your email contacts',
        'Use encrypted email services for sensitive communications'
      ]
    },
    {
      id: 'social-engineering',
      title: 'Recognizing Social Engineering',
      icon: 'Users',
      category: 'Detection',
      summary: 'Understanding manipulation tactics used by attackers',
      details: [
        'Be wary of emails creating false urgency or fear',
        'Question requests for sensitive information via email',
        'Verify requests through alternative communication channels',
        'Be suspicious of offers that seem too good to be true',
        'Watch for emails impersonating authority figures or colleagues',
        'Trust your instincts - if something feels wrong, investigate further'
      ]
    }
  ];

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Detection':
        return 'bg-accent/10 text-accent';
      case 'Prevention':
        return 'bg-success/10 text-success';
      case 'Response':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`security-tips-panel ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Security Tips & Best Practices
        </h3>
        <p className="text-sm text-muted-foreground">
          Learn how to identify and safely handle suspicious emails to protect yourself and your organization.
        </p>
      </div>
      <div className="space-y-4">
        {securityTips?.map((tip) => (
          <div
            key={tip?.id}
            className="border border-border rounded-lg overflow-hidden transition-micro hover:shadow-elevation-1"
          >
            <button
              onClick={() => toggleTip(tip?.id)}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-hover"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Icon name={tip?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">
                    {tip?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {tip?.summary}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(tip?.category)}`}>
                  {tip?.category}
                </span>
                <Icon 
                  name={expandedTip === tip?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground" 
                />
              </div>
            </button>

            {expandedTip === tip?.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <ul className="space-y-3 mt-4">
                  {tip?.details?.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon 
                        name="CheckCircle" 
                        size={16} 
                        className="text-success mt-0.5 flex-shrink-0" 
                      />
                      <span className="text-sm text-text-primary">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-primary mb-2">
              Remember: When in Doubt, Report It Out
            </h4>
            <p className="text-sm text-primary/80 mb-3">
              It's always better to report a legitimate email as suspicious than to miss a real threat. 
              Our security team would rather investigate 100 false positives than miss one real attack.
            </p>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => window.open('/security-training', '_blank')}
            >
              Access Full Training
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTipsPanel;