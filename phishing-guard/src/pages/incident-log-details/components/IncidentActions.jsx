import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const IncidentActions = ({ incident, userRole, onStatusUpdate, onAssignmentChange, onGenerateReport }) => {
  const [selectedStatus, setSelectedStatus] = useState(incident?.status);
  const [selectedAssignee, setSelectedAssignee] = useState(incident?.assignedTo);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [communicationMessage, setCommunicationMessage] = useState('');

  const statusOptions = [
    { value: 'open', label: 'Open', description: 'Incident is active and requires attention' },
    { value: 'investigating', label: 'Investigating', description: 'Currently under investigation' },
    { value: 'contained', label: 'Contained', description: 'Threat has been contained' },
    { value: 'resolved', label: 'Resolved', description: 'Incident has been resolved' },
    { value: 'closed', label: 'Closed', description: 'Incident is closed and archived' }
  ];

  const assigneeOptions = [
    { value: 'john.smith', label: 'John Smith', description: 'Senior Security Analyst' },
    { value: 'sarah.johnson', label: 'Sarah Johnson', description: 'IT Response Team Lead' },
    { value: 'mike.chen', label: 'Mike Chen', description: 'Cybersecurity Specialist' },
    { value: 'lisa.brown', label: 'Lisa Brown', description: 'Incident Response Manager' },
    { value: 'team.security', label: 'Security Team', description: 'Assign to security team' }
  ];

  const reportTypes = [
    { value: 'summary', label: 'Executive Summary', icon: 'FileText' },
    { value: 'detailed', label: 'Detailed Report', icon: 'File' },
    { value: 'timeline', label: 'Timeline Report', icon: 'Clock' },
    { value: 'forensic', label: 'Forensic Analysis', icon: 'Search' }
  ];

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      if (onStatusUpdate) {
        await onStatusUpdate(selectedStatus);
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignmentChange = async () => {
    setIsUpdating(true);
    try {
      if (onAssignmentChange) {
        await onAssignmentChange(selectedAssignee);
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to update assignment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendCommunication = () => {
    // Handle communication logic here
    console.log('Sending communication:', communicationMessage);
    setShowCommunicationModal(false);
    setCommunicationMessage('');
  };

  const handleGenerateReport = (reportType) => {
    if (onGenerateReport) {
      onGenerateReport(reportType);
    }
  };

  const canModifyIncident = userRole === 'admin' || userRole === 'it-response';
  const canAssignIncident = userRole === 'admin';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Incident Actions</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Management */}
        {canModifyIncident && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Status Management</h4>
              <div className="space-y-3">
                <Select
                  label="Incident Status"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  disabled={isUpdating}
                />
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleStatusUpdate}
                  loading={isUpdating}
                  disabled={selectedStatus === incident?.status}
                  fullWidth
                >
                  Update Status
                </Button>
              </div>
            </div>

            {canAssignIncident && (
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Assignment</h4>
                <div className="space-y-3">
                  <Select
                    label="Assigned To"
                    options={assigneeOptions}
                    value={selectedAssignee}
                    onChange={setSelectedAssignee}
                    disabled={isUpdating}
                    searchable
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={handleAssignmentChange}
                    loading={isUpdating}
                    disabled={selectedAssignee === incident?.assignedTo}
                    fullWidth
                  >
                    Update Assignment
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                onClick={() => setShowCommunicationModal(true)}
              >
                Notify User
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                iconPosition="left"
              >
                Escalate Incident
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="GraduationCap"
                iconPosition="left"
              >
                Assign Training
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconPosition="left"
              >
                Duplicate Incident
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Generate Reports</h4>
            <div className="grid grid-cols-1 gap-2">
              {reportTypes?.map((report) => (
                <Button
                  key={report?.value}
                  variant="ghost"
                  size="sm"
                  iconName={report?.icon}
                  iconPosition="left"
                  onClick={() => handleGenerateReport(report?.value)}
                  className="justify-start"
                >
                  {report?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Priority Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="destructive"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            disabled={!canModifyIncident}
          >
            Mark Critical
          </Button>
          
          <Button
            variant="success"
            size="sm"
            iconName="CheckCircle"
            iconPosition="left"
            disabled={!canModifyIncident || incident?.status === 'resolved'}
          >
            Mark Resolved
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Archive"
            iconPosition="left"
            disabled={!canModifyIncident || incident?.status !== 'resolved'}
          >
            Archive Incident
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
          >
            View in SIEM
          </Button>
        </div>
      </div>
      {/* Communication Modal */}
      {showCommunicationModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Send Communication</h3>
              <button
                onClick={() => setShowCommunicationModal(false)}
                className="p-1 rounded-md hover:bg-muted transition-hover"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="User" size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">Recipient</span>
                </div>
                <p className="text-sm text-text-secondary">{incident?.affectedUser}</p>
                <p className="text-xs text-text-secondary">{incident?.userEmail}</p>
              </div>
              
              <Input
                label="Message"
                type="text"
                placeholder="Enter your message to the user..."
                value={communicationMessage}
                onChange={(e) => setCommunicationMessage(e?.target?.value)}
              />
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSendCommunication}
                  disabled={!communicationMessage?.trim()}
                >
                  Send Message
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommunicationModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentActions;