// controllers/userController.js

const User = require("../models/User");

// ==============================
// COMPLETE ONBOARDING
// ==============================
exports.completeOnboarding = async (req, res) => {
  try {
    const { email, profile } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Only update if value exists (prevents wipe)
    if (profile.headline?.trim())
      user.headline = profile.headline;

    if (profile.description?.trim())
      user.description = profile.description;

    if (profile.location?.trim())
      user.location = profile.location;

    if (profile.github?.trim())
      user.github = profile.github;

    user.onboarded = true;

    await user.save();

    res.json({ message: "Onboarding completed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete onboarding" });
  }
};

// ==============================
// GET USER BY EMAIL
// ==============================
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { email, account, profile } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // ===== ACCOUNT UPDATE =====
    if (account) {
      if (account.username) user.username = account.username;
      if (account.email) user.email = account.email;
    }

    // ===== PROFESSIONAL UPDATE =====
    if (profile) {
      if (profile.headline !== undefined) user.headline = profile.headline;
      if (profile.description !== undefined) user.description = profile.description;
      if (profile.location !== undefined) user.location = profile.location;
      if (profile.github !== undefined) user.github = profile.github;
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};