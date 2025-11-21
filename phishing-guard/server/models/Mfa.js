// phishing-guard/server/models/Mfa.js
const mongoose = require("mongoose");

const MfaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

MfaSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 30 });

module.exports = mongoose.model("Mfa", MfaSchema);
