const User = require("../models/User");
const { fetchRepoWithLanguages } = require("../services/tempService");
const { computeSingleSkill } = require("../services/evidenceEngine");

exports.addProof = async (req, res) => {
  try {
    const { email, skillName, repoUrl } = req.body;

    // ✅ Basic validation
    if (!email || !skillName || !repoUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!repoUrl.includes("github.com")) {
      return res.status(400).json({
        error: "Please provide a valid GitHub repository link."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const normalizedSkill = skillName.trim().toLowerCase();

    // 🔍 Check if skill already exists
    let skill = user.skills.find(
      s => s.name.toLowerCase() === normalizedSkill
    );

    // 🔴 If skill exists → check duplicate repo
    if (skill) {
      const repoExists = skill.proofs.some(
        proof => proof.repoUrl === repoUrl
      );

      if (repoExists) {
        return res.status(400).json({
          error: "This repository is already added to this skill"
        });
      }

    } else {
      // 🆕 Create new skill
      skill = {
        name: skillName.trim(),
        level: "Beginner",
        proofs: [],
        totalScore: 0
      };

      user.skills.push(skill);
      skill = user.skills[user.skills.length - 1];
    }
    
    // ✅ Fetch repository data
    const repoData = await fetchRepoWithLanguages(repoUrl);

    if (!repoData || !repoData.languages) {
      return res.status(400).json({
        error: "Unable to fetch repository languages"
      });
    }

    // ✅ Compute evidence (CORRECT PARAM ORDER)
    const evidenceResult = computeSingleSkill(
      repoData,
      repoData.languages,
      skillName
    );

    // 🚫 Block zero or mismatch
    if (!evidenceResult.match || evidenceResult.evidenceScore === 0) {
      return res.status(400).json({
        error: "This skill could not be verified. The repository languages do not match the claimed skill."
      });
    }

    // ✅ Add proof
    skill.proofs.push({
      repoUrl,
      evidenceScore: evidenceResult.evidenceScore,
      breakdown: evidenceResult.evidenceBreakdown,
      detectedLanguage: evidenceResult.detectedLanguage,
      match: evidenceResult.match
    });

    // ✅ Recalculate average score
    const total = skill.proofs.reduce(
      (acc, proof) => acc + proof.evidenceScore,
      0
    );

    skill.totalScore = Math.round(total / skill.proofs.length);

    await user.save();

    res.json({ updatedSkill: skill });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};