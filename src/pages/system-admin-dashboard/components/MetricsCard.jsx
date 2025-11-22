import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, iconColor, trend, loading }) => {
  return (
    <div className="p-4 bg-background rounded-lg shadow-elevation-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className={`p-2 rounded-full ${iconColor}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-text-primary">{value}</span>
        {trend && (
          <span className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;