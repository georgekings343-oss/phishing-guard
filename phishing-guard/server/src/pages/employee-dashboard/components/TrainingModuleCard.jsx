import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrainingModuleCard = ({ module, onStartTraining, onContinueTraining }) => {
  const { id, title, description, estimatedTime, difficulty, status, progress, deadline, category } = module;

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Completed' },
      'in-progress': { color: 'bg-accent text-accent-foreground', icon: 'Clock', label: 'In Progress' },
      pending: { color: 'bg-muted text-muted-foreground', icon: 'Circle', label: 'Pending' }
    };
    return statusConfig?.[status] || statusConfig?.pending;
  };

  const getDifficultyColor = (difficulty) => {
    const difficultyConfig = {
      beginner: 'text-success',
      intermediate: 'text-warning',
      advanced: 'text-error'
    };
    return difficultyConfig?.[difficulty] || 'text-text-secondary';
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'Email Security': 'Mail',
      'Password Management': 'Lock',
      'Social Engineering': 'Users',
      'Data Protection': 'Shield',
      'Network Security': 'Wifi',
      'Incident Response': 'AlertTriangle'
    };
    return categoryIcons?.[category] || 'BookOpen';
  };

  const statusBadge = getStatusBadge(status);
  const isOverdue = deadline && new Date(deadline) < new Date() && status !== 'completed';

  const handleActionClick = () => {
    if (status === 'in-progress') {
      onContinueTraining(id);
    } else if (status === 'pending') {
      onStartTraining(id);
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 shadow-elevation-1 transition-hover hover:shadow-elevation-2 ${isOverdue ? 'border-error' : 'border-border'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name={getCategoryIcon(category)} size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary line-clamp-1">{title}</h3>
            <p className="text-sm text-text-secondary">{category}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusBadge?.color}`}>
          <Icon name={statusBadge?.icon} size={12} />
          <span>{statusBadge?.label}</span>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{description}</p>
      {/* Progress Bar (for in-progress modules) */}
      {status === 'in-progress' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Module Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BarChart3" size={14} />
            <span className={`capitalize ${getDifficultyColor(difficulty)}`}>{difficulty}</span>
          </div>
        </div>
        {deadline && (
          <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-error' : 'text-text-secondary'}`}>
            <Icon name="Calendar" size={12} />
            <span>Due: {new Date(deadline)?.toLocaleDateString()}</span>
          </div>
        )}
      </div>
      {/* Action Button */}
      <div className="flex items-center justify-between">
        {status === 'completed' ? (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <Button
            variant={status === 'in-progress' ? 'default' : 'outline'}
            size="sm"
            iconName={status === 'in-progress' ? 'Play' : 'BookOpen'}
            iconPosition="left"
            onClick={handleActionClick}
            className="flex-1 max-w-32"
          >
            {status === 'in-progress' ? 'Continue' : 'Start Training'}
          </Button>
        )}
        
        {isOverdue && (
          <div className="flex items-center space-x-1 text-error text-xs ml-2">
            <Icon name="AlertCircle" size={12} />
            <span>Overdue</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingModuleCard;