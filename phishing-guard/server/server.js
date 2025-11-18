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

// ===== MongoDB (optional) =====
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) =>
      console.warn("⚠️ Database connection failed (continuing without DB):", err.message)
    );
} else {
  console.warn("⚠️ No MONGO_URI provided — running WITHOUT MongoDB (dev mode).");
}

// ===== Safe route imports =====
let authRoutes, settingsRoutes, dashboardRoutes, incidentsRoutes;
let trainingModulesRoutes, analyticsRoutes, helpCenterRoutes, usersRoutes;

try { authRoutes = require("./routes/auth"); } catch (e) { authRoutes = express.Router(); }
try { settingsRoutes = require("./routes/settings"); } catch (e) { settingsRoutes = express.Router(); }
try { dashboardRoutes = require("./routes/dashboard"); } catch (e) { dashboardRoutes = express.Router(); }
try { incidentsRoutes = require("./routes/incidents"); } catch (e) { incidentsRoutes = express.Router(); }

try { trainingModulesRoutes = require("./routes/trainingModules"); } catch (e) { trainingModulesRoutes = express.Router(); }
try { analyticsRoutes = require("./routes/analytics"); } catch (e) { analyticsRoutes = express.Router(); }
try { helpCenterRoutes = require("./routes/helpCenter"); } catch (e) { helpCenterRoutes = express.Router(); }
try { usersRoutes = require("./routes/users"); } catch (e) { usersRoutes = express.Router(); }

// ===== Mount routes =====
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/training-modules", trainingModulesRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/help-center", helpCenterRoutes);
app.use("/api/users", usersRoutes);

// ===== Dummy login route (frontend test) =====
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email === "admin@smartmove.com" && password === "admin123") {
    return res.json({ token: "fake-jwt-token", user: { email, name: "Admin User" } });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

// ===== Health check =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ===== Root =====
app.get("/", (req, res) => res.send("🚀 Phishing Guard Backend API (dev) is running!"));

// ===== Start server =====
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
