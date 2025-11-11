import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadgesSection = ({ achievements, certificates, onViewCertificate }) => {
  const getBadgeIcon = (type) => {
    const iconMap = {
      'first-training': 'GraduationCap',
      'phishing-detector': 'Shield',
      'security-champion': 'Award',
      'perfect-score': 'Star',
      'streak-master': 'Zap',
      'quick-learner': 'Clock',
      'team-player': 'Users',
      'expert-level': 'Crown'
    };
    return iconMap?.[type] || 'Award';
  };

  const getBadgeColor = (rarity) => {
    const colorMap = {
      common: 'text-text-secondary bg-muted',
      uncommon: 'text-accent bg-accent/10',
      rare: 'text-warning bg-warning/10',
      epic: 'text-purple-600 bg-purple-100',
      legendary: 'text-error bg-error/10'
    };
    return colorMap?.[rarity] || 'text-text-secondary bg-muted';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Achievements & Certificates</h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Trophy" size={16} className="text-warning" />
          <span>{achievements?.length} badges earned</span>
        </div>
      </div>
      {/* Achievement Badges */}
      <div className="mb-8">
        <h3 className="font-medium text-text-primary mb-4">Recent Badges</h3>
        {achievements?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-text-secondary">No badges earned yet</p>
            <p className="text-sm text-text-secondary">Complete training modules to earn your first badge!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements?.slice(0, 8)?.map((achievement) => (
              <div
                key={achievement?.id}
                className={`relative p-4 rounded-lg border transition-hover hover:shadow-elevation-1 ${getBadgeColor(achievement?.rarity)}`}
                title={achievement?.description}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2">
                    <Icon name={getBadgeIcon(achievement?.type)} size={24} />
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {achievement?.title}
                  </h4>
                  <p className="text-xs opacity-75">
                    {formatDate(achievement?.earnedDate)}
                  </p>
                </div>
                
                {achievement?.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse-slow"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Certificates */}
      <div>
        <h3 className="font-medium text-text-primary mb-4">Completion Certificates</h3>
        {certificates?.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-text-secondary">No certificates available</p>
            <p className="text-sm text-text-secondary">Complete training modules to earn certificates</p>
          </div>
        ) : (
          <div className="space-y-3">
            {certificates?.map((certificate) => (
              <div
                key={certificate?.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border hover:shadow-elevation-1 transition-hover"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                    <Icon name="Award" size={20} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{certificate?.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>Issued: {formatDate(certificate?.issuedDate)}</span>
                      <span>Score: {certificate?.score}%</span>
                      {certificate?.expiryDate && (
                        <span>Expires: {formatDate(certificate?.expiryDate)}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {certificate?.isVerified && (
                    <div className="flex items-center space-x-1 text-success text-sm">
                      <Icon name="CheckCircle" size={14} />
                      <span>Verified</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => onViewCertificate(certificate?.id)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Progress to Next Achievement */}
      {achievements?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Next Achievement</span>
            <span className="text-sm text-text-secondary">75% complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="h-2 bg-accent rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-text-secondary">
            Complete 2 more training modules to earn "Security Expert" badge
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadgesSection;