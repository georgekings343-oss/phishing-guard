require("dotenv").config();
const express = require("express");
const cors = require("cors");
// keep mongoose require if you plan to enable DB later, but do not connect now
const mongoose = require("mongoose");

const app = express();

// CORS - allow your frontend origin (change port if needed)
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5174";
app.use(cors({ origin: FRONTEND, credentials: true }));

// JSON parsing
app.use(express.json());

// ---- Dummy / test routes ---- //

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Root
app.get("/", (req, res) => {
  res.send("🚀 SmartMove Backend API is running (no DB mode)!");
});

// Simple auth route for frontend testing
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  // demo credentials
  if (email === "admin@smartmove.com" && password === "admin123") {
    return res.json({
      token: "fake-jwt-token",
      user: { email, name: "Admin User" }
    });
  }

  // also accept the earlier dummy credentials if you used them
  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      token: "fake-jwt-token-2",
      user: { email, name: "Test Admin" }
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Generic 404 for other /api routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler (so server doesn't crash on unexpected errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server (no-db) running on http://localhost:${PORT}`);
});

// Guard: print unhandled rejections / exceptions
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // optional: server.close(); process.exit(1);
});
