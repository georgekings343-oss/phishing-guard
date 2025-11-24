const express = require("express");
const router = express.Router();

// Mock FAQs
const faqs = [
  { question: "How do I report a suspicious email?", answer: "Go to the 'Report Suspicious Email' page and submit the email details." },
  { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login page and follow the instructions." },
  { question: "Who can view analytics?", answer: "Analytics are available to system admins only." },
];

// GET /api/help-center
router.get("/", (req, res) => {
  res.json(faqs);
});

module.exports = router;
