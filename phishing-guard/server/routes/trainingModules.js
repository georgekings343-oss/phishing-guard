import express from "express";
const router = express.Router();

// Mock training modules
const trainingModules = [
  { id: 1, title: "Advanced Phishing Detection", status: "in-progress", deadline: "2025-10-10" },
  { id: 2, title: "Password Security Best Practices", status: "pending", deadline: "2025-10-15" },
  { id: 3, title: "Social Engineering Awareness", status: "completed", deadline: "2025-10-20" },
];

// GET /api/training-modules
router.get("/", (req, res) => {
  res.json(trainingModules);
});

export default router;
