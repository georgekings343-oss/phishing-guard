import React from 'react';
import Header from '../components/ui/Header';
import BreadcrumbTrail from '../components/ui/BreadcrumbTrail';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="employee" alertCount={0} onMenuToggle={() => {}} />
      <main className="pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <BreadcrumbTrail />
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-text-primary mb-2">Account Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-text-primary mb-2">Notification Preferences</h2>
                <p className="text-muted-foreground">Configure how you receive security alerts and updates.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-text-primary mb-2">Security Policies</h2>
                <p className="text-muted-foreground">View and manage security policies for your organization.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;