import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import QuickActionsPanel from './components/QuickActionsPanel';

// Simple placeholder components
const SecurityAlertBanner = () => null;
const RealTimeNotifications = () => null;
const IncidentAlertPanel = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Incidents</h2>
    <p className="text-gray-600">Incident data is temporarily unavailable.</p>
  </div>
);

const TrainingStatusPanel = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Status</h2>
    <p className="text-gray-600">Training data is temporarily unavailable.</p>
  </div>
);

const ThreatTrendsChart = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Threat Trends</h2>
    <p className="text-gray-600">Chart data is temporarily unavailable.</p>
  </div>
);

const SystemAdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" alertCount={0} onMenuToggle={() => {}} />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="mb-8">
            <BreadcrumbTrail showHome={false} />
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900">System Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive cybersecurity oversight and management for your organization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Active Phishing Incidents"
              value="12"
              change="+3"
              changeType="negative"
              icon="AlertTriangle"
              loading={loading}
            />
            <MetricsCard
              title="Training Completion Rate"
              value="87%"
              change="+5%"
              changeType="positive"
              icon="GraduationCap"
              loading={loading}
            />
            <MetricsCard
              title="High Risk Users"
              value="23"
              change="-2"
              changeType="positive"
              icon="UserX"
              loading={loading}
            />
            <MetricsCard
              title="Threat Detections"
              value="156"
              change="+12"
              changeType="negative"
              icon="Shield"
              loading={loading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <IncidentAlertPanel />
            <TrainingStatusPanel />
          </div>

          <div className="mb-8">
            <ThreatTrendsChart />
          </div>

          <QuickActionsPanel />
        </div>
      </main>
    </div>
  );
};

export default SystemAdminDashboard;
