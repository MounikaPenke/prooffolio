const User = require("../models/User")
const { computeSkills } = require("../services/evidenceEngine")
const { fetchRepos } = require("../services/tempService");
async function analyzeGithub(req, res) {
  try {
    const { username, githubUsername } = req.body

    const repos = await fetchRepos(githubUsername)

    const skills = computeSkills(repos)

    const totalRepos = repos.length

    await User.findOneAndUpdate(
      { username },
      {
        githubUsername,
        skills,
        githubAnalytics: {
          totalRepos,
          lastSynced: new Date()
        }
      },
      { upsert: true, new: true }
    )

    res.json({
      message: "GitHub analyzed successfully",
      skills
    })

  } catch (error) {
    res.status(500).json({ error: "GitHub analysis failed" })
  }
}

module.exports = { analyzeGithub }