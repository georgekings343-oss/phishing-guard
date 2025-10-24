import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedTipsCard = ({ tips, userRiskProfile }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const getRiskLevelColor = (level) => {
    const colorMap = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error'
    };
    return colorMap?.[level] || 'text-text-secondary';
  };

  const getRiskLevelBg = (level) => {
    const bgMap = {
      low: 'bg-success/10',
      medium: 'bg-warning/10',
      high: 'bg-error/10'
    };
    return bgMap?.[level] || 'bg-muted';
  };

  const getTipIcon = (category) => {
    const iconMap = {
      'password': 'Lock',
      'email': 'Mail',
      'browsing': 'Globe',
      'social': 'Users',
      'device': 'Smartphone',
      'general': 'Lightbulb'
    };
    return iconMap?.[category] || 'Lightbulb';
  };

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips?.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips?.length) % tips?.length);
  };

  const currentTip = tips?.[currentTipIndex];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Security Tips</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelBg(userRiskProfile?.level)} ${getRiskLevelColor(userRiskProfile?.level)}`}>
          {userRiskProfile?.level?.charAt(0)?.toUpperCase() + userRiskProfile?.level?.slice(1)} Risk
        </div>
      </div>
      {/* Risk Profile Summary */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="User" size={16} className="text-accent" />
          <h3 className="font-medium text-text-primary">Your Risk Profile</h3>
        </div>
        <p className="text-sm text-text-secondary mb-3">{userRiskProfile?.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Last Assessment:</span>
            <p className="font-medium text-text-primary">{userRiskProfile?.lastAssessment}</p>
          </div>
          <div>
            <span className="text-text-secondary">Score:</span>
            <p className={`font-medium ${getRiskLevelColor(userRiskProfile?.level)}`}>
              {userRiskProfile?.score}/100
            </p>
          </div>
        </div>
      </div>
      {/* Current Tip */}
      {currentTip && (
        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
              <Icon name={getTipIcon(currentTip?.category)} size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-medium text-text-primary">{currentTip?.title}</h3>
                <span className="px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                  {currentTip?.category}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentTip?.description}
              </p>
            </div>
          </div>

          {/* Tip Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                onClick={prevTip}
                disabled={tips?.length <= 1}
              />
              <span className="text-sm text-text-secondary">
                {currentTipIndex + 1} of {tips?.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                onClick={nextTip}
                disabled={tips?.length <= 1}
              />
            </div>

            {currentTip?.actionUrl && (
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => window.open(currentTip?.actionUrl, '_blank')}
              >
                Learn More
              </Button>
            )}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Shield"
            iconPosition="left"
            className="text-xs"
          >
            Security Checkup
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            className="text-xs"
          >
            View All Tips
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedTipsCard;