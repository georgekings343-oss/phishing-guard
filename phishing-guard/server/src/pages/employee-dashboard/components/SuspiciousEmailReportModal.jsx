import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SuspiciousEmailReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    senderEmail: '',
    subject: '',
    receivedDate: '',
    threatType: '',
    description: '',
    attachments: null,
    urgencyLevel: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const threatTypeOptions = [
    { value: 'phishing', label: 'Phishing Attempt' },
    { value: 'malware', label: 'Malware/Virus' },
    { value: 'spam', label: 'Spam/Unwanted' },
    { value: 'spoofing', label: 'Email Spoofing' },
    { value: 'social-engineering', label: 'Social Engineering' },
    { value: 'other', label: 'Other Suspicious Activity' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low - General Concern' },
    { value: 'medium', label: 'Medium - Suspicious Activity' },
    { value: 'high', label: 'High - Immediate Threat' },
    { value: 'critical', label: 'Critical - Active Attack' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = event?.target?.files;
    setFormData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        senderEmail: '',
        subject: '',
        receivedDate: '',
        threatType: '',
        description: '',
        attachments: null,
        urgencyLevel: 'medium'
      });
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Report Suspicious Email</h2>
              <p className="text-sm text-text-secondary">Help protect our organization from threats</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Email Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary">Email Details</h3>
            
            <Input
              label="Sender Email Address"
              type="email"
              placeholder="suspicious@example.com"
              value={formData?.senderEmail}
              onChange={(e) => handleInputChange('senderEmail', e?.target?.value)}
              required
              description="Enter the email address that sent the suspicious message"
            />

            <Input
              label="Email Subject"
              type="text"
              placeholder="Enter the subject line"
              value={formData?.subject}
              onChange={(e) => handleInputChange('subject', e?.target?.value)}
              required
            />

            <Input
              label="Date Received"
              type="datetime-local"
              value={formData?.receivedDate}
              onChange={(e) => handleInputChange('receivedDate', e?.target?.value)}
              required
            />
          </div>

          {/* Threat Classification */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary">Threat Classification</h3>
            
            <Select
              label="Threat Type"
              options={threatTypeOptions}
              value={formData?.threatType}
              onChange={(value) => handleInputChange('threatType', value)}
              placeholder="Select the type of threat"
              required
            />

            <Select
              label="Urgency Level"
              options={urgencyOptions}
              value={formData?.urgencyLevel}
              onChange={(value) => handleInputChange('urgencyLevel', value)}
              description="How urgent is this threat?"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={4}
              placeholder="Describe what made this email suspicious (e.g., unusual links, requests for personal information, grammar errors, etc.)"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
            <p className="text-xs text-text-secondary mt-1">
              Provide as much detail as possible to help our security team investigate
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Screenshots or Files
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf,.eml,.msg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-text-primary mb-1">
                  Click to upload screenshots or email files
                </p>
                <p className="text-xs text-text-secondary">
                  PNG, JPG, PDF, EML, MSG files up to 10MB each
                </p>
              </label>
              {formData?.attachments && formData?.attachments?.length > 0 && (
                <div className="mt-3 text-sm text-text-primary">
                  {formData?.attachments?.length} file(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div className="text-sm">
                <p className="text-text-primary font-medium mb-1">Security Notice</p>
                <p className="text-text-secondary">
                  Your report will be reviewed by our IT security team within 2 hours. 
                  Do not click any links or download attachments from the suspicious email.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuspiciousEmailReportModal;