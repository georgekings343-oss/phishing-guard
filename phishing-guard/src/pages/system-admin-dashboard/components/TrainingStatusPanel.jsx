import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrainingStatusPanel = ({ trainingPrograms = [], loading = false }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success';
      case 'scheduled': return 'text-accent bg-accent/10 border-accent';
      case 'completed': return 'text-muted-foreground bg-muted border-border';
      case 'overdue': return 'text-error bg-error/10 border-error';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'scheduled': return 'Calendar';
      case 'completed': return 'CheckCircle';
      case 'overdue': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    if (percentage >= 40) return 'bg-accent';
    return 'bg-error';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-40 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="w-48 h-4 bg-muted rounded"></div>
                <div className="w-12 h-4 bg-muted rounded"></div>
              </div>
              <div className="w-full h-2 bg-muted rounded mb-2"></div>
              <div className="flex justify-between">
                <div className="w-24 h-3 bg-muted rounded"></div>
                <div className="w-20 h-3 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="GraduationCap" size={20} />
          <span>Training Programs</span>
        </h3>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/training-campaigns/create')}
        >
          New Campaign
        </Button>
      </div>
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {trainingPrograms?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-2">No training programs</p>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/training-campaigns/create')}
            >
              Create First Campaign
            </Button>
          </div>
        ) : (
          trainingPrograms?.map((program) => (
            <div
              key={program?.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-micro"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${getStatusColor(program?.status)}`}>
                    <Icon name={getStatusIcon(program?.status)} size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      {program?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {program?.participants} participants
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(program?.status)}`}>
                  {program?.status?.toUpperCase()}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium text-text-primary">
                    {program?.completionRate}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(program?.completionRate)}`}
                    style={{ width: `${program?.completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Due: {formatDate(program?.dueDate)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{program?.completedUsers}/{program?.participants}</span>
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => navigate(`/training-campaigns/${program?.id}`)}
                  className="text-xs h-6 px-2"
                >
                  View
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainingStatusPanel;