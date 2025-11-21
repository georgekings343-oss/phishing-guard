// phishing-guard/server/routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Mfa = require("../models/Mfa");
const AuditLog = require("../models/AuditLog");
const { JWT_SECRET } = require("../middleware/auth");

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const MFA_TTL_SECONDS = Number(process.env.MFA_TTL_SECONDS || 300); // default 5 minutes

// Helper to write audit
async function writeAudit({ req, action, details = {} }) {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown";
    await AuditLog.create({
      userId: (req.user && req.user._id) || details.userId || null,
      email: (req.user && req.user.email) || details.email || null,
      ip,
      userAgent: req.headers["user-agent"] || "",
      action,
      details
    });
  } catch (err) {
    console.warn("Failed to write audit:", err.message);
  }
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.createHashed(email, password, name || "Client");
    await writeAudit({ req, action: "signup", details: { email: user.email, userId: user._id } });

    // Do not auto-login — ask user to login
    res.json({ ok: true, message: "Signup successful. Please login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// POST /api/auth/login
// Validates email+password -> create MFA record -> return mfaId (no JWT yet)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) {
      await writeAudit({ req, action: "login_failed", details: { email } });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.verifyPassword(password);
    if (!ok) {
      await writeAudit({ req, action: "login_failed", details: { email, userId: user._id } });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create MFA entry
    const code = generateCode();
    const expiresAt = new Date(Date.now() + MFA_TTL_SECONDS * 1000);
    const mfa = await Mfa.create({ userId: user._id, code, expiresAt });

    // TODO: Send the code to the user's email via your mail provider.
    // For now, return code in response in dev mode (not for production).
    const devSend = process.env.NODE_ENV !== "production";

    await writeAudit({ req, action: "mfa_sent", details: { email, userId: user._id, mfaId: mfa._id } });

    res.json({
      ok: true,
      mfaRequired: true,
      mfaId: mfa._id,
      expiresAt,
      devCode: devSend ? code : undefined
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// POST /api/auth/verify-mfa
// Accepts { mfaId, code } -> if correct issues JWT
router.post("/verify-mfa", async (req, res) => {
  try {
    const { mfaId, code } = req.body || {};
    if (!mfaId || !code) return res.status(400).json({ message: "mfaId and code required" });

    const mfa = await Mfa.findById(mfaId);
    if (!mfa) {
      await writeAudit({ req, action: "mfa_verify_failed", details: { mfaId } });
      return res.status(400).json({ message: "Invalid or expired MFA" });
    }

    if (mfa.attempts >= 5) {
      await Mfa.deleteOne({ _id: mfaId });
      await writeAudit({ req, action: "mfa_locked", details: { userId: mfa.userId } });
      return res.status(429).json({ message: "Too many attempts" });
    }

    if (mfa.code !== String(code)) {
      mfa.attempts = (mfa.attempts || 0) + 1;
      await mfa.save();
      await writeAudit({ req, action: "mfa_verify_failed", details: { userId: mfa.userId, attempts: mfa.attempts } });
      return res.status(401).json({ message: "Invalid verification code" });
    }

    // OK -> issue JWT
    const user = await User.findById(mfa.userId);
    if (!user) return res.status(500).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // audit and cleanup
    await writeAudit({ req, action: "mfa_verified", details: { userId: user._id, email: user.email } });
    await Mfa.deleteOne({ _id: mfaId });

    res.json({
      ok: true,
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "MFA verification failed" });
  }
});

module.exports = router;
