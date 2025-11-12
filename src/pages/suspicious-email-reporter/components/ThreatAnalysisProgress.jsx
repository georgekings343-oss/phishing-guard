import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatAnalysisProgress = ({ 
  submissionData, 
  onComplete, 
  onViewDetails,
  className = "" 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(45);

  const analysisSteps = [
    {
      id: 'parsing',
      title: 'Email Parsing',
      description: 'Extracting email headers and content',
      icon: 'FileText',
      duration: 5
    },
    {
      id: 'sender-verification',
      title: 'Sender Verification',
      description: 'Checking sender reputation and authenticity',
      icon: 'UserCheck',
      duration: 10
    },
    {
      id: 'link-scanning',
      title: 'Link Analysis',
      description: 'Scanning URLs for malicious content',
      icon: 'Link',
      duration: 15
    },
    {
      id: 'attachment-scan',
      title: 'Attachment Scanning',
      description: 'Analyzing attachments for threats',
      icon: 'Paperclip',
      duration: 10
    },
    {
      id: 'threat-assessment',
      title: 'Threat Assessment',
      description: 'Generating final threat level and recommendations',
      icon: 'Shield',
      duration: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          setEstimatedTime(prevTime => Math.max(0, prevTime - 1));
          return prev + 1;
        } else {
          // Analysis complete
          clearInterval(timer);
          generateAnalysisResults();
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const generateAnalysisResults = () => {
    // Mock analysis results based on submission data
    const mockResults = {
      incidentId: `INC-${Date.now().toString().slice(-6)}`, // removed optional chaining for compatibility
      threatLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
      findings: [
        {
          category: 'Sender Analysis',
          status: Math.random() > 0.5 ? 'suspicious' : 'clean',
          details: 'Sender domain reputation check completed'
        },
        {
          category: 'Link Analysis',
          status: Math.random() > 0.6 ? 'malicious' : 'clean',
          details: `${Math.floor(Math.random() * 5) + 1} links analyzed`
        },
        {
          category: 'Content Analysis',
          status: Math.random() > 0.4 ? 'suspicious' : 'clean',
          details: 'Phishing indicators detected in email content'
        }
      ],
      recommendations: [],
      estimatedResponseTime: '2-4 hours'
    };

    // Generate recommendations based on threat level
    if (mockResults.threatLevel === 'high') {
      mockResults.recommendations = [
        'Do not click any links or download attachments',
        'Change your password immediately if you interacted with this email',
        'Report to your IT security team',
        'Monitor your accounts for suspicious activity'
      ];
    } else if (mockResults.threatLevel === 'medium') {
      mockResults.recommendations = [
        'Exercise caution with this email',
        'Verify sender through alternative communication',
        'Do not provide sensitive information'
      ];
    } else {
      mockResults.recommendations = [
        'Email appears to be legitimate',
        'Continue normal security practices',
        'Thank you for reporting suspicious activity'
      ];
    }

    setAnalysisResults(mockResults);

    setTimeout(() => {
      if (onComplete) {
        onComplete(mockResults);
      }
    }, 1000);
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'malicious':
        return 'text-error';
      case 'suspicious':
        return 'text-warning';
      case 'clean':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`threat-analysis-progress ${className}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Analyzing Suspicious Email
        </h2>
        <p className="text-muted-foreground">
          Our security systems are analyzing the reported email for potential threats
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4 mb-8">
        {analysisSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-4 p-4 rounded-lg border transition-micro ${
              index < currentStep
                ? 'border-success bg-success/5'
                : index === currentStep
                ? 'border-primary bg-primary/5'
                : 'border-border bg-muted/30'
            }`}
          >
            <div className={`p-2 rounded-full ${
              index < currentStep
                ? 'bg-success text-success-foreground'
                : index === currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {index < currentStep ? (
                <Icon name="Check" size={20} />
              ) : (
                <Icon name={step.icon} size={20} />
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-text-primary">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>

            {index === currentStep && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-primary">Processing...</span>
              </div>
            )}

            {index < currentStep && (
              <Icon name="CheckCircle" size={20} className="text-success" />
            )}
          </div>
        ))}
      </div>

      {/* Estimated Time */}
      {!analysisResults && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent rounded-full">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm text-accent-foreground">
              Estimated time remaining: {estimatedTime} seconds
            </span>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Analysis Complete
            </h3>
            <p className="text-muted-foreground">
              Incident ID: <span className="font-mono font-medium">{analysisResults.incidentId}</span>
            </p>
          </div>

          {/* Threat Level */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-text-primary">Threat Assessment</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="font-medium text-text-primary">{analysisResults.confidence}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                analysisResults.threatLevel === 'high' ? 'bg-error/10 text-error'
                  : analysisResults.threatLevel === 'medium' ? 'bg-warning/10 text-warning'
                  : 'bg-success/10 text-success'
              }`}>
                {analysisResults.threatLevel.toUpperCase()} RISK
              </div>
              <span className="text-sm text-muted-foreground">
                Expected response time: {analysisResults.estimatedResponseTime}
              </span>
            </div>

            {/* Findings */}
            <div className="space-y-3 mb-6">
              <h5 className="font-medium text-text-primary">Analysis Findings:</h5>
              {analysisResults.findings.map((finding, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-text-primary">{finding.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getStatusColor(finding.status)}`}>
                      {finding.status.toUpperCase()}
                    </span>
                    <Icon 
                      name={finding.status === 'clean' ? 'CheckCircle' : 'AlertCircle'} 
                      size={16} 
                      className={getStatusColor(finding.status)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div>
              <h5 className="font-medium text-text-primary mb-3">Recommended Actions:</h5>
              <ul className="space-y-2">
                {analysisResults.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-primary">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              onClick={() => onViewDetails && onViewDetails(analysisResults)}
            >
              View Full Report
            </Button>
            <Button
              variant="default"
              iconName="Home"
              iconPosition="left"
              onClick={() => window.location.href = '/employee-dashboard'}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatAnalysisProgress;
