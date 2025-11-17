import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  iconColor = "var(--color-primary)",
  trend = null,
  loading = false 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getIconBackgroundColor = () => {
    if (changeType === 'positive') return 'bg-success/10';
    if (changeType === 'negative') return 'bg-error/10';
    return 'bg-primary/10';
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
          <div className="w-6 h-6 bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-24 h-8 bg-muted rounded"></div>
          <div className="w-32 h-4 bg-muted rounded"></div>
          <div className="w-20 h-3 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 transition-all duration-200 hover:shadow-elevation-2 hover:translate-y-[-2px]">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getIconBackgroundColor()}`}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        {change && !trend && (
          <div className="flex items-center space-x-1">
            <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
            <span className={`text-xs ${getChangeColor()}`}>
              {change} from last month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;