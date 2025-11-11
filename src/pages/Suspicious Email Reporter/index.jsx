import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ReportingMethodSelector from './components/ReportingMethodSelector';
import ManualSubmissionForm from './components/ManualSubmissionForm';
import ScreenshotUploader from './components/ScreenshotUploader';
import ThreatAnalysisProgress from './components/ThreatAnalysisProgress';
import SecurityTipsPanel from './components/SecurityTipsPanel';

const SuspiciousEmailReporter = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('method-selection');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [submissionData, setSubmissionData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Mock security alerts
  const [securityAlerts] = useState([
    {
      id: 'alert-001',
      title: 'Phishing Campaign Detected',
      message: 'Multiple reports of suspicious emails from "security-update@company-verify.com" received in the last hour.',
      severity: 'high',
      timestamp: new Date(Date.now() - 1800000),
      actionLabel: 'View Details',
      actionPath: '/incident-log-details'
    }
  ]);

  const [userRole] = useState('employee'); // Mock user role

  useEffect(() => {
    // Auto-show tips panel on mobile or for first-time users
    const isMobile = window.innerWidth < 768;
    const isFirstTime = !localStorage.getItem('phishguard_reporter_visited');
    
    if (isMobile || isFirstTime) {
      setShowTips(true);
      localStorage.setItem('phishguard_reporter_visited', 'true');
    }
  }, []);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === 'forward') {
      // For email forwarding, show instructions and tips
      setCurrentStep('instructions');
    } else {
      setCurrentStep('form-submission');
    }
  };

  const handleSubmission = async (data) => {
    setIsSubmitting(true);
    setSubmissionData(data);
    
    // Simulate API submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setCurrentStep('analysis');
  };

  const handleAnalysisComplete = (results) => {
    setAnalysisComplete(true);
    // Could navigate to incident details or show success message
  };

  const handleViewDetails = (results) => {
    navigate('/incident-log-details', { 
      state: { incidentId: results?.incidentId } 
    });
  };

  const handleStartOver = () => {
    setCurrentStep('method-selection');
    setSelectedMethod('');
    setSubmissionData(null);
    setIsSubmitting(false);
    setAnalysisComplete(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'method-selection':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReportingMethodSelector
                selectedMethod={selectedMethod}
                onMethodSelect={handleMethodSelect}
              />
            </div>
            <div className="lg:col-span-1">
              <SecurityTipsPanel />
            </div>
          </div>
        );

      case 'instructions':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={32} className="text-success" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Email Forwarding Instructions
              </h2>
              <p className="text-muted-foreground">
                Follow these steps to safely forward the suspicious email for analysis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Step-by-Step Process</h3>
                  <div className="space-y-4">
                    {[
                      'Open your email client (Outlook, Gmail, etc.)',
                      'Locate the suspicious email in your inbox',
                      'Click "Forward" or use Ctrl+F (Cmd+F on Mac)',
                      'Enter security@phishguard.com as the recipient',
                      'Do NOT modify the subject line or content',
                      'Click Send to submit for analysis'
                    ]?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground text-sm rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-text-primary">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-success/10 border border-success rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success mb-1">What Happens Next?</h4>
                      <ul className="text-sm text-success-foreground space-y-1">
                        <li>• Automatic analysis begins immediately</li>
                        <li>• You'll receive a confirmation email with incident ID</li>
                        <li>• Results typically available within 15-30 minutes</li>
                        <li>• Critical threats trigger immediate alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Email Client Guides</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Microsoft Outlook', icon: 'Mail' },
                      { name: 'Gmail', icon: 'Mail' },
                      { name: 'Apple Mail', icon: 'Mail' },
                      { name: 'Thunderbird', icon: 'Mail' }
                    ]?.map((client, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted transition-hover"
                        onClick={() => window.open(`/help/email-forwarding/${client?.name?.toLowerCase()?.replace(' ', '-')}`, '_blank')}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={client?.icon} size={16} className="text-accent" />
                          <span className="text-sm font-medium text-text-primary">
                            {client?.name}
                          </span>
                        </div>
                        <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning mb-1">Important Reminders</h4>
                      <ul className="text-sm text-warning-foreground space-y-1">
                        <li>• Don't click any links in the suspicious email</li>
                        <li>• Don't download or open attachments</li>
                        <li>• Keep the original email until analysis is complete</li>
                        <li>• Report immediately - time is critical</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => setCurrentStep('method-selection')}
              >
                Choose Different Method
              </Button>
              <Button
                variant="default"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={() => setCurrentStep('analysis')}
              >
                I've Forwarded the Email
              </Button>
            </div>
          </div>
        );

      case 'form-submission':
        return (
          <div className="max-w-4xl mx-auto">
            {selectedMethod === 'manual' ? (
              <ManualSubmissionForm
                onSubmit={handleSubmission}
                isSubmitting={isSubmitting}
              />
            ) : (
              <ScreenshotUploader
                onSubmit={handleSubmission}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        );

      case 'analysis':
        return (
          <div className="max-w-3xl mx-auto">
            <ThreatAnalysisProgress
              submissionData={submissionData}
              onComplete={handleAnalysisComplete}
              onViewDetails={handleViewDetails}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'method-selection':
        return 'Report Suspicious Email';
      case 'instructions':
        return 'Email Forwarding Guide';
      case 'form-submission':
        return selectedMethod === 'manual' ? 'Manual Email Report' : 'Screenshot Upload';
      case 'analysis':
        return 'Threat Analysis in Progress';
      default:
        return 'Suspicious Email Reporter';
    }
  };

  const handleMenuToggle = () => {
    // Handle menu toggle functionality
  };

  const handleAlertDismiss = (alertId) => {
    // Handle alert dismissal
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        alertCount={securityAlerts?.length} 
        onMenuToggle={handleMenuToggle}
      />
      <SecurityAlertBanner 
        alerts={securityAlerts} 
        onDismiss={handleAlertDismiss}
      />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-error/10 rounded-lg">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    {getStepTitle()}
                  </h1>
                  <p className="text-muted-foreground">
                    Quickly report and analyze potential phishing attempts
                  </p>
                </div>
              </div>

              {currentStep !== 'method-selection' && (
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleStartOver}
                >
                  Start Over
                </Button>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 mb-6">
              {[
                { key: 'method-selection', label: 'Method' },
                { key: 'form-submission', label: 'Submit' },
                { key: 'analysis', label: 'Analysis' }
              ]?.map((step, index) => (
                <React.Fragment key={step?.key}>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                    currentStep === step?.key
                      ? 'bg-primary text-primary-foreground'
                      : currentStep === 'instructions' && step?.key === 'form-submission'
                      ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}>
                    <span className="w-5 h-5 rounded-full bg-current opacity-20 flex items-center justify-center">
                      <span className="w-2 h-2 bg-current rounded-full"></span>
                    </span>
                    <span>{step?.label}</span>
                  </div>
                  {index < 2 && (
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Emergency Contact */}
          <div className="mt-12 bg-error/5 border border-error/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-error/10 rounded-lg">
                <Icon name="Phone" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-error mb-2">
                  Emergency Security Contact
                </h3>
                <p className="text-sm text-error/80 mb-3">
                  If you believe you've clicked a malicious link or provided sensitive information, 
                  contact our security team immediately.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => window.location.href = 'tel:+1-555-SEC-HELP'}
                  >
                    Call: +1-555-SEC-HELP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => window.location.href = 'mailto:emergency@phishguard.com'}
                  >
                    Email: emergency@phishguard.com
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuspiciousEmailReporter;