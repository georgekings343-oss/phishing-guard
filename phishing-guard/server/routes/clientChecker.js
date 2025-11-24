// phishing-guard/server/routes/clientChecker.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const AuditLog = require("../models/AuditLog");
const supabaseModels = require("../supabaseModels");

// POST /api/check  (protected)
router.post("/", verifyToken, async (req, res) => {
  const { url, emailText } = req.body || {};
  const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";

  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      await supabaseModels.createAuditLog({ userId: req.user._id || req.user.id, email: req.user.email, ip, userAgent, action: 'client_check', details: { urlProvided: !!url, emailProvided: !!emailText } });
    } else {
      await AuditLog.create({
        userId: req.user._id,
        email: req.user.email,
        ip,
        userAgent,
        action: "client_check",
        details: { urlProvided: !!url, emailProvided: !!emailText }
      });
    }
  } catch (err) {
    console.warn("Audit log failed:", err.message);
  }

  // Replace with real analysis later. Return mock response now.
  res.json({
    ok: true,
    data: {
      urlSafety: url ? (Math.random() > 0.6 ? "malicious" : "safe") : null,
      emailSafety: emailText ? (Math.random() > 0.7 ? "phishing" : "clean") : null,
      timestamp: new Date()
    }
  });
});

module.exports = router;
