import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopupContext } from '../../contexts/PopupContext';

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
  const { popupsEnabled } = useContext(PopupContext); // <-- ADDED

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // --- Popup-safe open handler ---
  const handleOpenReportModal = () => {
    if (!popupsEnabled) return; // <-- BLOCK MODAL IF DISABLED
    setIsReportModalOpen(true);
  };

  // Mock data for employee dashboard
  const progressData = {
    completionPercentage: 78,
    currentModules: 3,
    upcomingDeadlines: 2,
    totalModules: 12,
    completedModules: 9
  };

  const trainingModules = [
    // ... (UNCHANGED, your full data remains)
  ];

  const securityAlerts = [
    // ... (UNCHANGED)
  ];

  const bannerAlerts = [
    // ... (UNCHANGED)
  ];

  const personalizedTips = [
    // ... (UNCHANGED)
  ];

  const userRiskProfile = {
    // ... (UNCHANGED)
  };

  const achievements = [
    // ... (UNCHANGED)
  ];

  const certificates = [
    // ... (UNCHANGED)
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartTraining = (moduleId) => {};
  const handleContinueTraining = (moduleId) => {};
  const handleViewAllAlerts = () => navigate('/incident-log-details');
  const handleViewCertificate = (certificateId) => {};

  const handleReportSubmit = async (reportData) => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBannerDismiss = (alertId) => {};

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="employee" alertCount={securityAlerts?.length} onMenuToggle={() => {}} />
      <SecurityAlertBanner alerts={bannerAlerts} onDismiss={handleBannerDismiss} />

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

              {/* Debug feedback */}
              <p className="text-xs opacity-50 mt-1">(Popups: {popupsEnabled ? "ON" : "OFF"})</p>
            </div>

            <div className="mt-4 lg:mt-0">
              <QuickActionToolbar userRole="employee" variant="horizontal" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              <ProgressOverviewCard progressData={progressData} />

              {/* Training Modules */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">Training Modules</h2>
                  <Button variant="outline" size="sm" iconName="Grid" iconPosition="left">
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

              <AchievementBadgesSection
                achievements={achievements}
                certificates={certificates}
                onViewCertificate={handleViewCertificate}
              />
            </div>

            {/* Right sidebar */}
            <div className="space-y-8">
              <SecurityAlertsPanel alerts={securityAlerts} onViewAllAlerts={handleViewAllAlerts} />
              <PersonalizedTipsCard tips={personalizedTips} userRiskProfile={userRiskProfile} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Button (only if popups enabled) */}
      {popupsEnabled && showFloatingButton && (
        <button
          onClick={handleOpenReportModal}
          className="fixed bottom-6 right-6 w-14 h-14 bg-error text-error-foreground rounded-full shadow-elevation-2 hover:shadow-lg transition-all duration-200 flex items-center justify-center z-1200 animate-pulse-slow lg:hidden"
          title="Report Suspicious Email"
        >
          <Icon name="AlertTriangle" size={24} />
        </button>
      )}

      {/* Desktop Button */}
      {popupsEnabled && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-1200">
          <Button
            variant="default"
            size="lg"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={handleOpenReportModal}
            className="shadow-elevation-2 hover:shadow-lg transition-all duration-200"
          >
            Report Suspicious Email
          </Button>
        </div>
      )}

      {/* Modal (only if popups enabled) */}
      {popupsEnabled && (
        <SuspiciousEmailReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
