import React from 'react';
import Header from '../components/ui/Header';
import BreadcrumbTrail from '../components/ui/BreadcrumbTrail';

const UserManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" alertCount={0} onMenuToggle={() => {}} />
      <main className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <BreadcrumbTrail />
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-text-primary mb-6">User Management</h1>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Administrator Panel</h2>
              <p className="text-muted-foreground">
                Manage user accounts, permissions, and access levels across the SMARTMOVE platform.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;