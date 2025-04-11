const express = require("express");
const router = express.Router();
const Cycle = require("../models/Cycles");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  const { startDate, note } = req.body;
  try {
    const cycle = new Cycle({
      userId: req.user.userId,
      startDate,
      note,
    });
    await cycle.save();
    res.status(201).json(cycle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add cycle" });
  }
});

// Get all cycles for a user
router.get("/:userId", async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.params.userId }).sort({ startDate: -1 });
    res.json(cycles);
  } catch (error) {
    console.error("Fetch cycles error:", error);
    res.status(500).json({ message: "Failed to fetch cycles" });
  }
});


module.exports = router;