import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ManualSubmissionForm = ({ onSubmit, isSubmitting, className = "" }) => {
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderName: '',
    subject: '',
    emailContent: '',
    suspiciousLinks: '',
    receivedDate: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.senderEmail?.trim()) {
      newErrors.senderEmail = 'Sender email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.senderEmail)) {
      newErrors.senderEmail = 'Please enter a valid email address';
    }

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'Email subject is required';
    }

    if (!formData?.emailContent?.trim()) {
      newErrors.emailContent = 'Email content is required';
    }

    if (!formData?.receivedDate) {
      newErrors.receivedDate = 'Received date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        submissionMethod: 'manual',
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const extractLinks = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = formData?.emailContent?.match(urlRegex) || [];
    setFormData(prev => ({
      ...prev,
      suspiciousLinks: links?.join('\n')
    }));
  };

  return (
    <div className={`manual-submission-form ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Manual Email Submission
        </h3>
        <p className="text-sm text-muted-foreground">
          Please provide as much detail as possible about the suspicious email. All fields marked with * are required.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sender Email Address *"
            type="email"
            placeholder="suspicious@example.com"
            value={formData?.senderEmail}
            onChange={(e) => handleInputChange('senderEmail', e?.target?.value)}
            error={errors?.senderEmail}
            required
          />

          <Input
            label="Sender Name"
            type="text"
            placeholder="John Doe"
            value={formData?.senderName}
            onChange={(e) => handleInputChange('senderName', e?.target?.value)}
            description="If available in the email"
          />
        </div>

        <Input
          label="Email Subject *"
          type="text"
          placeholder="Urgent: Verify your account"
          value={formData?.subject}
          onChange={(e) => handleInputChange('subject', e?.target?.value)}
          error={errors?.subject}
          required
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Content *
          </label>
          <textarea
            className="w-full h-32 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Paste the full email content here, including any headers if available..."
            value={formData?.emailContent}
            onChange={(e) => handleInputChange('emailContent', e?.target?.value)}
            required
          />
          {errors?.emailContent && (
            <p className="mt-1 text-sm text-error">{errors?.emailContent}</p>
          )}
          <div className="mt-2 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="Link"
              iconPosition="left"
              onClick={extractLinks}
            >
              Extract Links
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Suspicious Links
          </label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="List any suspicious links found in the email (one per line)..."
            value={formData?.suspiciousLinks}
            onChange={(e) => handleInputChange('suspiciousLinks', e?.target?.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Use the "Extract Links" button above to automatically find links in the email content
          </p>
        </div>

        <Input
          label="Date Received *"
          type="datetime-local"
          value={formData?.receivedDate}
          onChange={(e) => handleInputChange('receivedDate', e?.target?.value)}
          error={errors?.receivedDate}
          description="When did you receive this email?"
          required
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Notes
          </label>
          <textarea
            className="w-full h-20 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Any additional context or observations about this email..."
            value={formData?.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
          />
        </div>

        <div className="bg-warning/10 border border-warning rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-1">Security Reminder</h4>
              <p className="text-sm text-warning-foreground">
                Do not click on any suspicious links or download attachments from the reported email. 
                Our security team will analyze all content safely.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history?.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManualSubmissionForm;