import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import IncidentOverview from './components/IncidentOverview';
import EmailAnalysisTab from './components/EmailAnalysisTab';
import UserResponseTab from './components/UserResponseTab';
import ResponseTeamTab from './components/ResponseTeamTab';
import InvestigationTimeline from './components/InvestigationTimeline';
import IncidentActions from './components/IncidentActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IncidentLogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('email-analysis');
  const [userRole] = useState('it-response'); // Mock user role
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock incident data
  const [incident] = useState({
    id: "INC-2025-001234",
    timestamp: "2025-01-03T10:30:00Z",
    affectedUser: "Emily Rodriguez",
    userEmail: "emily.rodriguez@company.com",
    threatType: "Phishing",
    threatDescription: "Credential harvesting attempt via fake login page",
    severity: "High",
    status: "Investigating",
    assignedTo: "John Smith",
    assignedTeam: "IT Response Team",
    responseTime: "15 minutes",
    slaStatus: "met",
    summary: `User reported suspicious email containing a link to a fake Microsoft 365 login page. Initial analysis confirms phishing attempt with credential harvesting intent. User did not click the malicious link and reported immediately through the PhishGuard system.`
  });

  const [emailData] = useState({
    from: "security-team@microsft-365.com",
    to: "emily.rodriguez@company.com",
    subject: "Urgent: Your Microsoft 365 Account Will Be Suspended",
    date: "2025-01-03T10:15:00Z",
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px;">
      <div style="background: #0078d4; color: white; padding: 20px; text-align: center;">
        <h2>Microsoft 365 Security Alert</h2>
      </div>
      <div style="padding: 20px; background: #f8f9fa;">
        <p>Dear Emily Rodriguez,</p>
        <p>We have detected unusual activity on your Microsoft 365 account. Your account will be suspended in 24 hours unless you verify your identity immediately.</p>
        <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;">
          <strong>Action Required:</strong> Click the link below to verify your account and prevent suspension.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://microsft-365-security.phishing-site.com/verify" style="background: #0078d4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px;">Verify Account Now</a>
        </div>
        <p>If you do not take action within 24 hours, your account will be permanently suspended.</p>
        <p>Best regards,<br>Microsoft Security Team</p>
      </div>
    </div>`,
    attachments: [
      {
        name: "security_verification.pdf",
        size: "245 KB",
        type: "PDF Document",
        threatLevel: "medium"
      }
    ],
    maliciousLinks: [
      {
        url: "https://microsft-365-security.phishing-site.com/verify",
        description: "Fake Microsoft 365 login page designed to steal credentials",
        threatLevel: "high"
      }
    ],
    phishTankAnalysis: {
      status: "Confirmed Phishing",
      confidence: 95,
      lastUpdated: "2025-01-03T10:45:00Z"
    },
    senderVerification: [
      {
        type: "SPF",
        status: "suspicious",
        result: "Soft Fail"
      },
      {
        type: "DKIM",
        status: "malicious",
        result: "Failed"
      },
      {
        type: "DMARC",
        status: "malicious",
        result: "Failed"
      }
    ],
    threatIntelligence: {
      ipReputation: "Malicious",
      domainAge: "3 days",
      blacklistStatus: "Listed on 5 blacklists"
    },
    rawHeaders: `Received: from mail.phishing-site.com (192.168.1.100)
      by mx.company.com with ESMTP id ABC123
      for <emily.rodriguez@company.com>; Fri, 03 Jan 2025 10:15:00 +0000
From: security-team@microsft-365.com
To: emily.rodriguez@company.com
Subject: Urgent: Your Microsoft 365 Account Will Be Suspended
Date: Fri, 03 Jan 2025 10:15:00 +0000
Message-ID: <fake123@phishing-site.com>
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8`
  });

  const [userResponse] = useState({
    timeline: [
      {
        action: "Received",
        timestamp: "2025-01-03T10:15:00Z",
        description: "Email received in user's inbox",
        riskLevel: "medium",
        details: {
          deliveryTime: "10:15 AM",
          folder: "Inbox",
          readStatus: "Unread"
        }
      },
      {
        action: "Opened",
        timestamp: "2025-01-03T10:20:00Z",
        description: "User opened the email",
        riskLevel: "medium",
        details: {
          openTime: "10:20 AM",
          device: "Desktop",
          location: "Office Network"
        }
      },
      {
        action: "Reported",
        timestamp: "2025-01-03T10:25:00Z",
        description: "User reported email as suspicious using PhishGuard button",
        riskLevel: "low",
        details: {
          reportMethod: "PhishGuard Button",
          responseTime: "5 minutes",
          confidence: "High"
        }
      }
    ],
    accountStatus: {
      status: "secure"
    },
    securityIndicators: [
      {
        name: "Login Activity",
        value: "Normal",
        status: "normal"
      },
      {
        name: "Password Changes",
        value: "None",
        status: "normal"
      },
      {
        name: "Account Access",
        value: "Authorized Only",
        status: "normal"
      },
      {
        name: "Data Downloads",
        value: "None",
        status: "normal"
      }
    ],
    remediationActions: [
      {
        name: "Email Quarantine",
        description: "Email moved to quarantine folder",
        completed: true
      },
      {
        name: "Account Monitoring",
        description: "Enhanced monitoring enabled for 30 days",
        completed: true
      },
      {
        name: "Security Awareness",
        description: "Additional training module assigned",
        completed: false
      }
    ],
    trainingAssignment: {
      title: "Advanced Phishing Recognition",
      description: "Interactive training module focusing on sophisticated phishing techniques",
      dueDate: "2025-01-10T23:59:59Z",
      status: "assigned"
    },
    clickAnalysis: {
      linksClicked: 0,
      totalLinks: 1,
      responseTime: "5 minutes",
      location: "New York, NY",
      ipAddress: "192.168.1.50"
    }
  });

  const [responseData] = useState({
    actions: [
      {
        title: "Initial Assessment",
        type: "investigation",
        description: "Analyzed email headers and content for phishing indicators",
        timestamp: "2025-01-03T10:30:00Z",
        assignedTo: "John Smith",
        team: "IT Response Team",
        status: "completed",
        priority: "high"
      },
      {
        title: "PhishTank Verification",
        type: "investigation",
        description: "Confirmed malicious URL through PhishTank database",
        timestamp: "2025-01-03T10:35:00Z",
        assignedTo: "Sarah Johnson",
        team: "Security Analysis",
        status: "completed",
        priority: "high"
      },
      {
        title: "Email Quarantine",
        type: "containment",
        description: "Quarantined similar emails across organization",
        timestamp: "2025-01-03T10:40:00Z",
        assignedTo: "Mike Chen",
        team: "Email Security",
        status: "completed",
        priority: "high"
      },
      {
        title: "User Notification",
        type: "communication",
        description: "Sent security awareness notification to affected user",
        timestamp: "2025-01-03T10:45:00Z",
        assignedTo: "Lisa Brown",
        team: "User Communications",
        status: "completed",
        priority: "medium",
        attachments: [
          { name: "security_notification.pdf" }
        ]
      },
      {
        title: "Training Assignment",
        type: "training",
        description: "Assigned advanced phishing recognition training",
        timestamp: "2025-01-03T11:00:00Z",
        assignedTo: "Training System",
        team: "Security Education",
        status: "in-progress",
        priority: "medium"
      }
    ],
    containmentMeasures: {
      immediate: [
        {
          action: "Email Quarantine",
          completed: true,
          timestamp: "2025-01-03T10:40:00Z"
        },
        {
          action: "URL Blocking",
          completed: true,
          timestamp: "2025-01-03T10:42:00Z"
        },
        {
          action: "Domain Blacklisting",
          completed: true,
          timestamp: "2025-01-03T10:45:00Z"
        }
      ]
    },
    userCommunications: [
      {
        type: "Security Alert",
        subject: "Phishing Attempt Detected - Action Required",
        recipient: "emily.rodriguez@company.com",
        sentAt: "2025-01-03T10:45:00Z",
        status: "delivered"
      },
      {
        type: "Training Notification",
        subject: "New Security Training Assignment",
        recipient: "emily.rodriguez@company.com",
        sentAt: "2025-01-03T11:00:00Z",
        status: "delivered"
      }
    ],
    followUpActions: [
      {
        title: "Security Posture Review",
        description: "Review and update email security policies",
        priority: "medium",
        dueDate: "2025-01-10T23:59:59Z",
        assignedTo: "Security Team"
      },
      {
        title: "User Training Completion",
        description: "Monitor completion of assigned training module",
        priority: "low",
        dueDate: "2025-01-15T23:59:59Z",
        assignedTo: "Training Coordinator"
      }
    ],
    trainingAssignments: [
      {
        title: "Advanced Phishing Recognition",
        description: "Interactive training focusing on sophisticated phishing techniques",
        assignedUsers: ["emily.rodriguez@company.com"],
        dueDate: "2025-01-10T23:59:59Z"
      }
    ]
  });

  const [timelineData] = useState([
    {
      title: "Incident Reported",
      type: "reported",
      description: "User reported suspicious email through PhishGuard system",
      timestamp: "2025-01-03T10:25:00Z",
      performer: "Emily Rodriguez",
      team: "End User",
      duration: "2 minutes",
      impact: "low"
    },
    {
      title: "Incident Assigned",
      type: "assigned",
      description: "Incident automatically assigned to IT Response Team",
      timestamp: "2025-01-03T10:27:00Z",
      performer: "PhishGuard System",
      team: "Automated System",
      duration: "Instant",
      impact: "low"
    },
    {
      title: "Initial Investigation",
      type: "investigation",
      description: "Security analyst began initial assessment of reported email",
      timestamp: "2025-01-03T10:30:00Z",
      performer: "John Smith",
      team: "IT Response Team",
      duration: "15 minutes",
      impact: "medium",
      details: {
        analysisType: "Email Header Analysis",
        toolsUsed: "Email Security Gateway, PhishTank API",
        findings: "Confirmed phishing attempt"
      }
    },
    {
      title: "Threat Confirmation",
      type: "investigation",
      description: "PhishTank database confirmed malicious URL in email",
      timestamp: "2025-01-03T10:35:00Z",
      performer: "Sarah Johnson",
      team: "Security Analysis",
      duration: "5 minutes",
      impact: "high",
      details: {
        confidence: "95%",
        threatType: "Credential Harvesting",
        riskLevel: "High"
      }
    },
    {
      title: "Containment Initiated",
      type: "containment",
      description: "Quarantined similar emails and blocked malicious URLs",
      timestamp: "2025-01-03T10:40:00Z",
      performer: "Mike Chen",
      team: "Email Security",
      duration: "10 minutes",
      impact: "high",
      details: {
        emailsQuarantined: "23",
        urlsBlocked: "5",
        domainsBlacklisted: "2"
      }
    },
    {
      title: "User Communication",
      type: "communication",
      description: "Sent security notification to affected user",
      timestamp: "2025-01-03T10:45:00Z",
      performer: "Lisa Brown",
      team: "User Communications",
      duration: "5 minutes",
      impact: "medium",
      attachments: [
        { name: "security_notification.pdf" }
      ]
    },
    {
      title: "Training Assignment",
      type: "training",
      description: "Assigned advanced phishing recognition training to user",
      timestamp: "2025-01-03T11:00:00Z",
      performer: "Training System",
      team: "Security Education",
      duration: "2 minutes",
      impact: "low",
      details: {
        trainingModule: "Advanced Phishing Recognition",
        dueDate: "2025-01-10",
        estimatedDuration: "30 minutes"
      }
    }
  ]);

  const [securityAlerts] = useState([
    {
      id: 'alert-001',
      title: 'Similar Phishing Attempts Detected',
      message: '5 additional emails with similar patterns detected in the last hour',
      severity: 'high',
      timestamp: new Date(Date.now() - 1800000),
      actionLabel: 'View Related',
      actionPath: '/incident-log-details'
    }
  ]);

  const tabs = [
    {
      id: 'email-analysis',
      label: 'Email Analysis',
      icon: 'Mail',
      component: <EmailAnalysisTab emailData={emailData} />
    },
    {
      id: 'user-response',
      label: 'User Response',
      icon: 'User',
      component: <UserResponseTab userResponse={userResponse} />
    },
    {
      id: 'response-team',
      label: 'Response Team',
      icon: 'Shield',
      component: <ResponseTeamTab 
        responseData={responseData}
        onAddNote={(note) => console.log('Adding note:', note)}
        onUpdateStatus={(status) => console.log('Updating status:', status)}
      />
    },
    {
      id: 'timeline',
      label: 'Investigation Timeline',
      icon: 'Clock',
      component: <InvestigationTimeline 
        timelineData={timelineData}
        onFilter={(filter) => console.log('Filtering timeline:', filter)}
      />
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStatusUpdate = (newStatus) => {
    console.log('Updating incident status to:', newStatus);
    // Handle status update logic
  };

  const handleAssignmentChange = (newAssignee) => {
    console.log('Changing assignment to:', newAssignee);
    // Handle assignment change logic
  };

  const handleGenerateReport = (reportType) => {
    console.log('Generating report of type:', reportType);
    // Handle report generation logic
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // Handle alert dismissal logic
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} alertCount={securityAlerts?.length} onMenuToggle={handleMenuToggle} />
        <SecurityAlertBanner alerts={securityAlerts} onDismiss={handleAlertDismiss} />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Icon name="Loader2" size={48} className="text-accent mx-auto mb-4 animate-spin" />
                <h2 className="text-xl font-semibold text-text-primary mb-2">Loading Incident Details</h2>
                <p className="text-text-secondary">Please wait while we fetch the incident information...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} alertCount={securityAlerts?.length} onMenuToggle={handleMenuToggle} />
      <SecurityAlertBanner alerts={securityAlerts} onDismiss={handleAlertDismiss} />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <BreadcrumbTrail />
          
          {/* Back Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate(-1)}
            >
              Back to Incidents
            </Button>
            
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Clock" size={16} />
              <span className="text-sm">
                Last updated: {new Date()?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Incident Overview */}
          <IncidentOverview incident={incident} />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Tabs Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg">
                <div className="flex items-center space-x-1 p-1 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-micro whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[600px]">
                {tabs?.find(tab => tab?.id === activeTab)?.component}
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 space-y-6">
                <IncidentActions
                  incident={incident}
                  userRole={userRole}
                  onStatusUpdate={handleStatusUpdate}
                  onAssignmentChange={handleAssignmentChange}
                  onGenerateReport={handleGenerateReport}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IncidentLogDetails;