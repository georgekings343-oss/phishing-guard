import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResponseTeamTab = ({ responseData, onAddNote, onUpdateStatus }) => {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const getActionTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'investigation':
        return 'Search';
      case 'containment':
        return 'Shield';
      case 'communication':
        return 'MessageSquare';
      case 'remediation':
        return 'Tool';
      case 'training':
        return 'GraduationCap';
      default:
        return 'Activity';
    }
  };

  const getActionTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'investigation':
        return 'text-accent bg-accent/10 border-accent';
      case 'containment':
        return 'text-error bg-error/10 border-error';
      case 'communication':
        return 'text-warning bg-warning/10 border-warning';
      case 'remediation':
        return 'text-success bg-success/10 border-success';
      case 'training':
        return 'text-primary bg-primary/10 border-primary';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-error bg-error/10 border-error';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning';
      case 'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        author: 'Current User',
        timestamp: new Date()?.toISOString(),
        type: 'investigation'
      };
      
      if (onAddNote) {
        onAddNote(note);
      }
      
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Actions Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Response Team Actions</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingNote(true)}
          >
            Add Note
          </Button>
        </div>

        {isAddingNote && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="space-y-3">
              <Input
                label="Investigation Note"
                type="text"
                placeholder="Enter your investigation notes..."
                value={newNote}
                onChange={(e) => setNewNote(e?.target?.value)}
                className="mb-2"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddNote}
                >
                  Add Note
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNote('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {responseData?.actions?.map((action, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-surface border border-border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-accent/10 border border-accent rounded-full flex items-center justify-center">
                <Icon name={getActionTypeIcon(action?.type)} size={16} className="text-accent" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">{action?.title}</span>
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getActionTypeColor(action?.type)}`}>
                      {action?.type}
                    </span>
                    {action?.priority && (
                      <span className={`px-2 py-1 text-xs font-medium border rounded ${getPriorityColor(action?.priority)}`}>
                        {action?.priority}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary">
                    {new Date(action.timestamp)?.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">{action?.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{action?.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Building" size={12} />
                      <span>{action?.team}</span>
                    </div>
                  </div>
                  
                  {action?.status && (
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${
                      action?.status === 'completed' 
                        ? 'text-success bg-success/10 border-success'
                        : action?.status === 'in-progress' ?'text-warning bg-warning/10 border-warning' :'text-muted-foreground bg-muted border-border'
                    }`}>
                      {action?.status}
                    </span>
                  )}
                </div>

                {action?.attachments && action?.attachments?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Paperclip" size={14} className="text-text-secondary" />
                      <span className="text-xs font-medium text-text-secondary">Attachments</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {action?.attachments?.map((attachment, attachIndex) => (
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
          ))}
        </div>
      </div>
      {/* Containment Measures */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Containment Measures</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Immediate Actions</h4>
              <div className="space-y-2">
                {responseData?.containmentMeasures?.immediate?.map((measure, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={measure?.completed ? 'CheckCircle' : 'Clock'} 
                        size={16} 
                        className={measure?.completed ? 'text-success' : 'text-warning'} 
                      />
                      <span className="text-sm text-text-primary">{measure?.action}</span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {new Date(measure.timestamp)?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">User Communications</h4>
              <div className="space-y-2">
                {responseData?.userCommunications?.map((comm, index) => (
                  <div key={index} className="p-3 bg-surface border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="Mail" size={14} className="text-accent" />
                        <span className="text-sm font-medium text-text-primary">{comm?.type}</span>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {new Date(comm.sentAt)?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{comm?.subject}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-text-secondary">To: {comm?.recipient}</span>
                      <span className={`px-2 py-1 text-xs font-medium border rounded ${
                        comm?.status === 'delivered' ?'text-success bg-success/10 border-success' :'text-warning bg-warning/10 border-warning'
                      }`}>
                        {comm?.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Follow-up Actions</h4>
              <div className="space-y-2">
                {responseData?.followUpActions?.map((action, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">{action?.title}</span>
                      <span className={`px-2 py-1 text-xs font-medium border rounded ${getPriorityColor(action?.priority)}`}>
                        {action?.priority}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{action?.description}</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>Due: {new Date(action.dueDate)?.toLocaleDateString()}</span>
                      <span>Assigned: {action?.assignedTo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Training Assignments</h4>
              <div className="space-y-2">
                {responseData?.trainingAssignments?.map((training, index) => (
                  <div key={index} className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="GraduationCap" size={14} className="text-accent" />
                      <span className="text-sm font-medium text-text-primary">{training?.title}</span>
                    </div>
                    <p className="text-xs text-text-secondary mb-2">{training?.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        Assigned to: {training?.assignedUsers?.length} users
                      </span>
                      <span className="text-xs text-text-secondary">
                        Due: {new Date(training.dueDate)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseTeamTab;