// phishing-guard/server/routes/audit.js
const express = require("express");
const router = express.Router();
const { verifyToken, requireAdmin } = require("../middleware/auth");
const AuditLog = require("../models/AuditLog");
const supabaseModels = require("../supabaseModels");

// GET /api/audit  (admin only) - query params: ?limit=50
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const limit = Math.min(200, parseInt(req.query.limit || "100"));
    let logs = [];
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      logs = await supabaseModels.getAuditLogs(limit);
    } else {
      logs = await AuditLog.find().sort({ createdAt: -1 }).limit(limit).lean();
    }
    res.json({ ok: true, logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch audit logs" });
  }
});

module.exports = router;
