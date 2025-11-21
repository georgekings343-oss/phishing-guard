// phishing-guard/server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ===== CORS =====
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
console.log(`✅ CORS enabled for: ${FRONTEND_URL}`);

// ===== MongoDB =====
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.warn("⚠️ MongoDB FAILED:", err.message));
}

// ===== Route imports =====
const authRoutes = require("./routes/auth");
const auditRoutes = require("./routes/audit");
const clientCheckerRoutes = require("./routes/clientChecker");
const analyticsRoutes = require("./routes/analytics");
const dashboardRoutes = require("./routes/dashboard");
const helpCenterRoutes = require("./routes/helpCenter");
const incidentsRoutes = require("./routes/incidents");
const settingsRoutes = require("./routes/settings");
const trainingModulesRoutes = require("./routes/trainingModules");
const usersRoutes = require("./routes/users");

// ===== Mount Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/check", clientCheckerRoutes); // public checker
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/help-center", helpCenterRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/training-modules", trainingModulesRoutes);
app.use("/api/users", usersRoutes);

// ===== Test Route =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
