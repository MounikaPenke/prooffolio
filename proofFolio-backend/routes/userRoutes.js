const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Add this route
router.get("/", userController.getUserByEmail);

router.post("/complete-onboarding", userController.completeOnboarding);
router.post("/update-profile", userController.updateProfile);

module.exports = router;