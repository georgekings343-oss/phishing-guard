const express = require("express");
const router = express.Router();

// Dashboard statistics
router.get("/stats", (req, res) => {
  const stats = {
    threatsBlocked: Math.floor(Math.random() * 2000) + 500,
    detectionRate: (95 + Math.random() * 4).toFixed(1) + '%',
    activeAlerts: Math.floor(Math.random() * 10),
    trainingCompleted: Math.floor(Math.random() * 100),
    totalIncidents: Math.floor(Math.random() * 500) + 100,
    activeUsers: Math.floor(Math.random() * 100) + 50
  };

  res.json(stats);
});

// Recent threats
router.get("/threats", (req, res) => {
  const threats = [
    {
      id: 1,
      type: 'Phishing Email',
      severity: 'High',
      status: 'Blocked',
      source: 'external@malicious.com',
      target: 'user@company.com',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      description: 'Suspicious email with malicious links'
    },
    {
      id: 2,
      type: 'Malicious Link',
      severity: 'Medium',
      status: 'Blocked',
      source: 'http://malicious-site.com',
      target: 'company-network',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      description: 'Blocked access to known malicious website'
    }
  ];

  res.json(threats);
});

module.exports = router;