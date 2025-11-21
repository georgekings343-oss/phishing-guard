// phishing-guard/server/models/AuditLog.js
const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  email: { type: String, required: false },
  ip: { type: String, required: true },
  userAgent: { type: String },
  action: { type: String, required: true },
  details: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
