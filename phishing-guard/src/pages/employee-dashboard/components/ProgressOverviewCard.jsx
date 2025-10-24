import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverviewCard = ({ progressData }) => {
  const { completionPercentage, currentModules, upcomingDeadlines, totalModules, completedModules } = progressData;

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Training Progress</h2>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className={`text-2xl font-bold ${getProgressColor(completionPercentage)}`}>
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Overall Progress</span>
          <span>{completedModules} of {totalModules} modules completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressBgColor(completionPercentage)}`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Current Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BookOpen" size={16} className="text-accent" />
            <h3 className="font-medium text-text-primary">Current Modules</h3>
          </div>
          <p className="text-2xl font-bold text-accent">{currentModules}</p>
          <p className="text-sm text-text-secondary">In Progress</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <h3 className="font-medium text-text-primary">Upcoming Deadlines</h3>
          </div>
          <p className="text-2xl font-bold text-warning">{upcomingDeadlines}</p>
          <p className="text-sm text-text-secondary">This Week</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-semibold text-success">{completedModules}</p>
          <p className="text-xs text-text-secondary">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-accent">{currentModules}</p>
          <p className="text-xs text-text-secondary">Active</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-text-secondary">{totalModules - completedModules - currentModules}</p>
          <p className="text-xs text-text-secondary">Pending</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewCard;