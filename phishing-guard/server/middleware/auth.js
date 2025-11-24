// phishing-guard/server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const supabaseModels = require("../supabaseModels");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    let user = null;
    // prefer Supabase if configured
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      user = await supabaseModels.getUserById(payload.id);
      if (user) delete user.passwordHash;
    } else {
      user = await User.findById(payload.id).select("-passwordHash").lean();
    }
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
}

module.exports = { verifyToken, requireAdmin, JWT_SECRET };
