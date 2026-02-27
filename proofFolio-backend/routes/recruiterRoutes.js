const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { searchCandidates } = require("../controllers/recruiterController")
const verifyRecruiter = require("../middleware/authMiddleware")
router.get("/user/:id", verifyRecruiter, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: "User not found" })
  }
})
router.get("/search", verifyRecruiter, searchCandidates)

module.exports = router