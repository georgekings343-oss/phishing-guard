const express = require("express");
const router = express.Router();

// Mock users
let users = [
  { id: 1, name: "Alice", role: "employee" },
  { id: 2, name: "Bob", role: "it-response" },
  { id: 3, name: "Charlie", role: "employee" },
];

// GET /api/users
router.get("/", (req, res) => {
  res.json(users);
});

// POST /api/users/:id/promote
router.post("/:id/promote", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = "admin"; // Promote user
  res.json({ message: `${user.name} promoted to admin`, user });
});

module.exports = router;
