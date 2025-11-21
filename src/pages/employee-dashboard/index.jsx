import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import TrainingModuleCard from './components/TrainingModuleCard';
import SecurityAlertsPanel from './components/SecurityAlertsPanel';
import PersonalizedTipsCard from './components/PersonalizedTipsCard';
import AchievementBadgesSection from './components/AchievementBadgesSection';
import SuspiciousEmailReportModal from './components/SuspiciousEmailReportModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Mock data for employee dashboard
  const progressData = {
    completionPercentage: 78,
    currentModules: 3,
    upcomingDeadlines: 2,
    totalModules: 12,
    completedModules: 9
  };

  const trainingModules = [
    {
      id: 1,
      title: "Advanced Phishing Detection",
      description: "Learn to identify sophisticated phishing attempts and social engineering tactics used by cybercriminals.",
      estimatedTime: "45 min",
      difficulty: "intermediate",
      status: "in-progress",
      progress: 65,
      deadline: "2025-10-10",
      category: "Email Security"
    },
    {
      id: 2,
      title: "Password Security Best Practices",
      description: "Master the art of creating strong passwords and implementing multi-factor authentication.",
      estimatedTime: "30 min",
      difficulty: "beginner",
      status: "pending",
      deadline: "2025-10-15",
      category: "Password Management"
    },
    {
      id: 3,
      title: "Social Engineering Awareness",
      description: "Understand psychological manipulation techniques and how to protect yourself from social attacks.",
      estimatedTime: "60 min",
      difficulty: "advanced",
      status: "completed",
      progress: 100,
      category: "Social Engineering"
    },
    {
      id: 4,
      title: "Data Protection Fundamentals",
      description: "Learn essential data handling practices and privacy protection measures for sensitive information.",
      estimatedTime: "40 min",
      difficulty: "intermediate",
      status: "pending",
      deadline: "2025-10-20",
      category: "Data Protection"
    },
    {
      id: 5,
      title: "Incident Response Procedures",
      description: "Know what to do when you encounter a security incident and how to report it effectively.",
      estimatedTime: "35 min",
      difficulty: "beginner",
      status: "in-progress",
      progress: 25,
      deadline: "2025-10-12",
      category: "Incident Response"
    },
    {
      id: 6,
      title: "Network Security Basics",
      description: "Understand network threats and learn how to secure your connections when working remotely.",
      estimatedTime: "50 min",
      difficulty: "intermediate",
      status: "pending",
      deadline: "2025-10-25",
      category: "Network Security"
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      title: "Phishing Campaign Detected",
      description: "A new phishing campaign targeting our organization has been identified. Be cautious of emails claiming to be from IT support.",
      type: "phishing",
      severity: "high",
      timestamp: new Date(Date.now() - 3600000),
      actionRequired: true
    },
    {
      id: 2,
      title: "Security Policy Update",
      description: "New password requirements have been implemented. Please update your passwords by the end of this week.",
      type: "policy-update",
      severity: "medium",
      timestamp: new Date(Date.now() - 7200000),
      actionRequired: true
    },
    {
      id: 3,
      title: "Suspicious Login Attempt",
      description: "An unusual login attempt was detected on your account from an unrecognized device.",
      type: "general",
      severity: "medium",
      timestamp: new Date(Date.now() - 10800000),
      actionRequired: false
    }
  ];

  const bannerAlerts = [
    {
      id: 'banner-1',
      title: 'Critical Security Update Required',
      message: 'Please complete the mandatory phishing awareness training by October 10th to maintain system access.',
      severity: 'critical',
      timestamp: new Date(),
      actionLabel: 'Start Training',
      actionPath: '/training'
    }
  ];

  const personalizedTips = [
    {
      id: 1,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security to your accounts by enabling 2FA. This significantly reduces the risk of unauthorized access even if your password is compromised.",
      category: "password",
      actionUrl: "https://example.com/2fa-guide"
    },
    {
      id: 2,
      title: "Verify Email Senders",
      description: "Always verify the sender's identity before clicking links or downloading attachments. Look for spelling errors, unusual domains, or urgent language that creates pressure.",
      category: "email"
    },
    {
      id: 3,
      title: "Keep Software Updated",
      description: "Regularly update your operating system, browsers, and applications. Security patches often fix vulnerabilities that cybercriminals exploit.",
      category: "device"
    },
    {
      id: 4,
      title: "Use Secure Wi-Fi Networks",
      description: "Avoid public Wi-Fi for sensitive activities. If you must use public networks, consider using a VPN to encrypt your connection.",
      category: "browsing"
    }
  ];

  const userRiskProfile = {
    level: "medium",
    score: 72,
    description: "Your security awareness is good, but there's room for improvement in password management and email security practices.",
    lastAssessment: "September 28, 2025"
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first security training module",
      type: "first-training",
      rarity: "common",
      earnedDate: "2025-09-15",
      isNew: false
    },
    {
      id: 2,
      title: "Phishing Detector",
      description: "Successfully identified 10 phishing attempts",
      type: "phishing-detector",
      rarity: "uncommon",
      earnedDate: "2025-09-22",
      isNew: false
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Achieved 100% on a training assessment",
      type: "perfect-score",
      rarity: "rare",
      earnedDate: "2025-09-30",
      isNew: true
    },
    {
      id: 4,
      title: "Quick Learner",
      description: "Completed a training module in record time",
      type: "quick-learner",
      rarity: "uncommon",
      earnedDate: "2025-10-01",
      isNew: true
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Email Security Fundamentals",
      issuedDate: "2025-09-20",
      score: 95,
      isVerified: true,
      expiryDate: "2026-09-20"
    },
    {
      id: 2,
      title: "Social Engineering Awareness",
      issuedDate: "2025-09-30",
      score: 100,
      isVerified: true,
      expiryDate: "2026-09-30"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartTraining = (moduleId) => {
    console.log('Starting training for module:', moduleId);
    // Navigate to training module or open training interface
  };

  const handleContinueTraining = (moduleId) => {
    console.log('Continuing training for module:', moduleId);
    // Navigate to training module or open training interface
  };

  const handleViewAllAlerts = () => {
    navigate('/incident-log-details');
  };

  const handleViewCertificate = (certificateId) => {
    console.log('Viewing certificate:', certificateId);
    // Open certificate viewer or download certificate
  };

  const handleReportSubmit = async (reportData) => {
    console.log('Submitting suspicious email report:', reportData);
    // Submit report to backend
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBannerDismiss = (alertId) => {
    console.log('Dismissing banner alert:', alertId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="employee" alertCount={securityAlerts?.length} onMenuToggle={() => {}} />
      <SecurityAlertBanner 
        alerts={bannerAlerts}
        onDismiss={handleBannerDismiss}
      />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <BreadcrumbTrail showHome={false} />
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Welcome back, John!
              </h1>
              <p className="text-text-secondary">
                Stay secure and keep learning. Your security awareness makes a difference.
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <QuickActionToolbar userRole="employee" variant="horizontal" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Overview */}
              <ProgressOverviewCard progressData={progressData} />

              {/* Training Modules */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">Training Modules</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Grid"
                    iconPosition="left"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trainingModules?.slice(0, 4)?.map((module) => (
                    <TrainingModuleCard
                      key={module.id}
                      module={module}
                      onStartTraining={handleStartTraining}
                      onContinueTraining={handleContinueTraining}
                    />
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <AchievementBadgesSection
                achievements={achievements}
                certificates={certificates}
                onViewCertificate={handleViewCertificate}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Security Alerts */}
              <SecurityAlertsPanel
                alerts={securityAlerts}
                onViewAllAlerts={handleViewAllAlerts}
              />

              {/* Personalized Tips */}
              <PersonalizedTipsCard
                tips={personalizedTips}
                userRiskProfile={userRiskProfile}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      {showFloatingButton && (
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-error text-error-foreground rounded-full shadow-elevation-2 hover:shadow-lg transition-all duration-200 flex items-center justify-center z-1200 animate-pulse-slow lg:hidden"
          title="Report Suspicious Email"
        >
          <Icon name="AlertTriangle" size={24} />
        </button>
      )}
      {/* Desktop Report Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-1200">
        <Button
          variant="default"
          size="lg"
          iconName="AlertTriangle"
          iconPosition="left"
          onClick={() => setIsReportModalOpen(true)}
          className="shadow-elevation-2 hover:shadow-lg transition-all duration-200"
        >
          Report Suspicious Email
        </Button>
      </div>
      {/* Suspicious Email Report Modal */}
      <SuspiciousEmailReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default EmployeeDashboard;