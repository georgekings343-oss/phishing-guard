import React from 'react';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon,
  loading = false 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return '↗';
    if (changeType === 'negative') return '↘';
    return '→';
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <span className="text-lg">
            {icon === 'AlertTriangle' ? '⚠️' : 
             icon === 'GraduationCap' ? '🎓' : 
             icon === 'UserX' ? '👤' : 
             icon === 'Shield' ? '🛡️' : '📊'}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()} {change}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
