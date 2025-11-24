const express = require("express");
const router = express.Router();

// Mock analytics metrics
const analyticsMetrics = [
  { name: "Completed Modules", value: 9 },
  { name: "Pending Modules", value: 3 },
  { name: "Suspicious Emails Reported", value: 5 },
];

// GET /api/analytics
router.get("/", (req, res) => {
  res.json(analyticsMetrics);
});

module.exports = router;
