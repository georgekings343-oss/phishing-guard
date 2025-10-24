const express = require("express");
const router = express.Router();

// Mock incidents data
let incidents = [
  {
    id: 1,
    title: "Phishing Campaign Detected",
    type: "Phishing",
    severity: "High",
    status: "Resolved",
    description: "Large-scale phishing campaign targeting employees",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    affectedUsers: 15,
    resolution: "Blocked malicious domains and notified affected users"
  },
  {
    id: 2,
    title: "Malware Infection",
    type: "Malware",
    severity: "Critical",
    status: "In Progress",
    description: "Ransomware detected on workstation",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    affectedUsers: 1,
    resolution: "Workstation isolated, investigation ongoing"
  }
];

// Get all incidents
router.get("/", (req, res) => {
  res.json(incidents);
});

// Get incident by ID
router.get("/:id", (req, res) => {
  const incident = incidents.find(i => i.id === parseInt(req.params.id));
  
  if (!incident) {
    return res.status(404).json({ message: "Incident not found" });
  }
  
  res.json(incident);
});

module.exports = router;