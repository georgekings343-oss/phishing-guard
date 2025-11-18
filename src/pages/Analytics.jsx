import React from 'react';
import Header from '../components/ui/Header';
import BreadcrumbTrail from '../components/ui/BreadcrumbTrail';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" alertCount={0} onMenuToggle={() => {}} />
      <main className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <BreadcrumbTrail />
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-text-primary mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">Security Metrics</h3>
                <p className="text-muted-foreground">Comprehensive view of security performance and threat detection rates.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">User Engagement</h3>
                <p className="text-muted-foreground">Training completion rates and user participation analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;