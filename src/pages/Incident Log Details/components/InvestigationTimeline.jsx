import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const InvestigationTimeline = ({ timelineData, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getEventIcon = (eventType) => {
    switch (eventType?.toLowerCase()) {
      case 'reported':
        return 'Flag';
      case 'assigned':
        return 'UserPlus';
      case 'investigation':
        return 'Search';
      case 'containment':
        return 'Shield';
      case 'communication':
        return 'MessageSquare';
      case 'resolved':
        return 'CheckCircle';
      case 'escalated':
        return 'TrendingUp';
      case 'training':
        return 'GraduationCap';
      default:
        return 'Activity';
    }
  };

  const getEventColor = (eventType) => {
    switch (eventType?.toLowerCase()) {
      case 'reported':
        return 'text-accent bg-accent/10 border-accent';
      case 'assigned':
        return 'text-primary bg-primary/10 border-primary';
      case 'investigation':
        return 'text-warning bg-warning/10 border-warning';
      case 'containment':
        return 'text-error bg-error/10 border-error';
      case 'communication':
        return 'text-secondary bg-secondary/10 border-secondary';
      case 'resolved':
        return 'text-success bg-success/10 border-success';
      case 'escalated':
        return 'text-destructive bg-destructive/10 border-destructive';
      case 'training':
        return 'text-accent bg-accent/10 border-accent';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'investigation', label: 'Investigation' },
    { value: 'containment', label: 'Containment' },
    { value: 'communication', label: 'Communication' },
    { value: 'training', label: 'Training' }
  ];

  const filteredTimeline = timelineData?.filter(event => {
    const matchesSearch = event?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         event?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         event?.performer?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || event?.type?.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (onFilter) {
      onFilter(filter);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Investigation Timeline</h3>
        <div className="flex items-center space-x-3">
          <Input
            type="search"
            placeholder="Search timeline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 border-b border-border">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => handleFilterChange(option?.value)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-micro ${
              selectedFilter === option?.value
                ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            {option?.label}
          </button>
        ))}
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {filteredTimeline?.map((event, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline Node */}
              <div className={`relative z-10 flex-shrink-0 w-12 h-12 border-2 rounded-full flex items-center justify-center ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={18} />
              </div>
              
              {/* Event Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-text-primary">{event?.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium border rounded ${getEventColor(event?.type)}`}>
                        {event?.type}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {new Date(event.timestamp)?.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">{event?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{event?.performer}</span>
                      </div>
                      {event?.team && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Building" size={12} />
                          <span>{event?.team}</span>
                        </div>
                      )}
                      {event?.duration && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{event?.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    {event?.impact && (
                      <span className={`px-2 py-1 text-xs font-medium border rounded ${
                        event?.impact === 'high' ?'text-error bg-error/10 border-error'
                          : event?.impact === 'medium' ?'text-warning bg-warning/10 border-warning' :'text-success bg-success/10 border-success'
                      }`}>
                        {event?.impact} impact
                      </span>
                    )}
                  </div>

                  {event?.details && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {Object.entries(event?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-text-secondary capitalize">
                              {key?.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className="text-text-primary font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event?.attachments && event?.attachments?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Paperclip" size={14} className="text-text-secondary" />
                        <span className="text-xs font-medium text-text-secondary">Attachments</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event?.attachments?.map((attachment, attachIndex) => (
                          <div key={attachIndex} className="flex items-center space-x-1 px-2 py-1 bg-muted rounded text-xs">
                            <Icon name="File" size={12} className="text-text-secondary" />
                            <span className="text-text-primary">{attachment?.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredTimeline?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No events found</h3>
          <p className="text-text-secondary">
            {searchTerm ? 'Try adjusting your search terms' : 'No timeline events match the selected filter'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvestigationTimeline;