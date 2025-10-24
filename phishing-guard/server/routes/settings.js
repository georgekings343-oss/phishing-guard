const express = require("express");
const router = express.Router();

// Mock settings data
let systemSettings = {
  emailNotifications: true,
  smsAlerts: false,
  autoQuarantine: true,
  scanFrequency: 'realtime',
  threatLevel: 'high',
  dataRetention: 90,
  twoFactorAuth: false,
  apiKey: 'sm_' + Math.random().toString(36).substr(2, 16)
};

// Get settings
router.get("/", (req, res) => {
  res.json(systemSettings);
});

// Update settings
router.put("/", (req, res) => {
  const updates = req.body;
  
  // Validate updates
  const validKeys = Object.keys(systemSettings);
  const invalidKeys = Object.keys(updates).filter(key => !validKeys.includes(key));
  
  if (invalidKeys.length > 0) {
    return res.status(400).json({ error: `Invalid settings: ${invalidKeys.join(', ')}` });
  }

  systemSettings = { ...systemSettings, ...updates };
  
  res.json({ 
    message: 'Settings updated successfully',
    settings: systemSettings 
  });
});

// Reset settings to default
router.post("/reset", (req, res) => {
  systemSettings = {
    emailNotifications: true,
    smsAlerts: false,
    autoQuarantine: true,
    scanFrequency: 'realtime',
    threatLevel: 'high',
    dataRetention: 90,
    twoFactorAuth: false,
    apiKey: 'sm_' + Math.random().toString(36).substr(2, 16)
  };
  
  res.json({ message: 'Settings reset to default', settings: systemSettings });
});

module.exports = router;