import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatTrendsChart = ({ data = [], loading = false }) => {
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'pie'
  const [timeRange, setTimeRange] = useState('7d'); // '7d', '30d', '90d'

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const pieColors = ['#1E3A8A', '#0EA5E9', '#059669', '#D97706', '#DC2626'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">
            <Icon name="BarChart3" size={48} />
            <p className="text-sm mt-2">Loading chart data...</p>
          </div>
        </div>
      );
    }

    if (data?.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <Icon name="BarChart3" size={48} className="mx-auto mb-3" />
            <p className="text-sm">No data available</p>
            <p className="text-xs">Chart will appear when data is collected</p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="incidents"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors?.[index % pieColors?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="incidents" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Threat Trends</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-micro ${
                  timeRange === range?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-text-primary'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => setChartType(type?.value)}
                className={`p-2 rounded-md transition-micro ${
                  chartType === type?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-text-primary'
                }`}
                title={type?.label}
              >
                <Icon name={type?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full" aria-label="Threat Trends Chart">
        {renderChart()}
      </div>
      {data?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Total incidents in last {timeRanges?.find(r => r?.value === timeRange)?.label?.toLowerCase()}: {' '}
              <span className="font-medium text-text-primary">
                {data?.reduce((sum, item) => sum + item?.incidents, 0)}
              </span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="text-xs"
            >
              Export Data
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatTrendsChart;