import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ScreenshotUploader = ({ onSubmit, isSubmitting, className = "" }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    incidentDate: '',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files)?.filter(file => {
      const isValidType = file?.type?.startsWith('image/');
      const isValidSize = file?.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    const newFiles = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      preview: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragActive(false);
    handleFileSelect(e?.dataTransfer?.files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragActive(false);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const updated = prev?.filter(f => f?.id !== fileId);
      // Revoke object URL to prevent memory leaks
      const fileToRemove = prev?.find(f => f?.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove?.preview);
      }
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (uploadedFiles?.length === 0) {
      newErrors.files = 'At least one screenshot is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        files: uploadedFiles,
        submissionMethod: 'screenshot',
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className={`screenshot-uploader ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Screenshot Upload
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload clear screenshots of the suspicious email. Include the sender, subject line, and full email content.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Screenshots *
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-micro ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-accent hover:bg-accent/5'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-text-primary font-medium mb-2">
              Drag and drop screenshots here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports: JPG, PNG, GIF (Max 10MB per file)
            </p>
            <Button
              type="button"
              variant="outline"
              iconName="FolderOpen"
              iconPosition="left"
              onClick={() => fileInputRef?.current?.click()}
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e?.target?.files)}
              className="hidden"
            />
          </div>
          {errors?.files && (
            <p className="mt-1 text-sm text-error">{errors?.files}</p>
          )}
        </div>

        {/* Uploaded Files Preview */}
        {uploadedFiles?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Uploaded Screenshots ({uploadedFiles?.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles?.map((file) => (
                <div key={file?.id} className="relative border border-border rounded-lg p-3">
                  <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                    <img
                      src={file?.preview}
                      alt={file?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file?.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file?.id)}
                    className="absolute top-2 right-2 p-1 bg-error text-error-foreground rounded-full hover:bg-error/80 transition-hover"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Input
          label="Description *"
          type="text"
          placeholder="Brief description of the suspicious email"
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          description="What made this email suspicious?"
          required
        />

        <Input
          label="Incident Date *"
          type="datetime-local"
          value={formData?.incidentDate}
          onChange={(e) => handleInputChange('incidentDate', e?.target?.value)}
          error={errors?.incidentDate}
          description="When did you receive this email?"
          required
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Notes
          </label>
          <textarea
            className="w-full h-20 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Any additional context about the suspicious email..."
            value={formData?.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
          />
        </div>

        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-accent mb-1">Screenshot Tips</h4>
              <ul className="text-sm text-accent-foreground space-y-1">
                <li>• Include the sender's email address and display name</li>
                <li>• Capture the full subject line</li>
                <li>• Show the complete email content</li>
                <li>• Include any suspicious links or attachments</li>
              </ul>
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
            iconName="Upload"
            iconPosition="left"
          >
            Submit Screenshots
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScreenshotUploader;