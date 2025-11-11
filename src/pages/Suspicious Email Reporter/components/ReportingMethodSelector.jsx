import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportingMethodSelector = ({ selectedMethod, onMethodSelect, className = "" }) => {
  const reportingMethods = [
    {
      id: 'forward',
      title: 'Forward Email',
      description: 'Forward the suspicious email directly from your email client',
      icon: 'Forward',
      recommended: true,
      steps: [
        'Open the suspicious email in your email client',
        'Click Forward and send to security@phishguard.com',
        'Do not modify the email content or subject line'
      ]
    },
    {
      id: 'manual',
      title: 'Manual Submission',
      description: 'Copy and paste email content for analysis',
      icon: 'Edit3',
      recommended: false,
      steps: [
        'Copy the email content including headers',
        'Paste into the form below',
        'Include sender information and subject line'
      ]
    },
    {
      id: 'screenshot',
      title: 'Screenshot Upload',
      description: 'Upload screenshots when forwarding is not possible',
      icon: 'Camera',
      recommended: false,
      steps: [
        'Take clear screenshots of the email',
        'Include sender, subject, and full content',
        'Upload multiple images if needed'
      ]
    }
  ];

  return (
    <div className={`reporting-method-selector ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Choose Reporting Method
        </h3>
        <p className="text-sm text-muted-foreground">
          Select how you'd like to report this suspicious email. Email forwarding provides the most accurate analysis.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {reportingMethods?.map((method) => (
          <div
            key={method?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-micro ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-accent hover:bg-accent/5'
            }`}
            onClick={() => onMethodSelect(method?.id)}
          >
            {method?.recommended && (
              <div className="absolute -top-2 left-4">
                <span className="px-2 py-1 text-xs font-medium bg-success text-success-foreground rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-md ${
                selectedMethod === method?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={method?.icon} size={20} />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-text-primary mb-1">
                  {method?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {method?.description}
                </p>

                <div className="space-y-1">
                  {method?.steps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedMethod === method?.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedMethod === method?.id && (
                  <div className="w-full h-full rounded-full bg-primary-foreground scale-50"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMethod === 'forward' && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-accent mb-2">Email Forwarding Instructions</h4>
              <div className="space-y-2 text-sm text-accent-foreground">
                <p>Forward suspicious emails to: <strong>security@phishguard.com</strong></p>
                <p>Our system will automatically analyze the email headers, links, and attachments for threats.</p>
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Copy"
                    iconPosition="left"
                    onClick={() => navigator.clipboard?.writeText('security@phishguard.com')}
                  >
                    Copy Email Address
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingMethodSelector;