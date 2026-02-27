const User = require("../models/User")

async function searchCandidates(req, res) {
  try {
    const {
      skill,
      minScore,
      minExp,
      maxExp,
      page = 1,
      limit = 10,
      sortBy = "score"
    } = req.query

    const query = {
      role: "Student"
    }

    if (minExp || maxExp) {
      query.experienceYears = {}
      if (minExp) query.experienceYears.$gte = Number(minExp)
      if (maxExp) query.experienceYears.$lte = Number(maxExp)
    }

    if (skill) {
  query.skills = {
    $elemMatch: {
      name: { 
        $regex: skill, 
        $options: "i"   // 👈 makes it case-insensitive
      },
      totalScore: { $gte: Number(minScore || 0) }
    }
  }
}

    const skip = (Number(page) - 1) * Number(limit)

    let users = await User.find(query)
      .select("username headline experienceYears skills")
      .skip(skip)
      .limit(Number(limit))

    // 🔥 Ranking Logic
    users = users.map(user => {
      let total = 0
      user.skills.forEach(s => {
        total += s.totalScore || 0
      })

      return {
        ...user.toObject(),
        overallScore: total
      }
    })

    // 🔥 Sorting
    if (sortBy === "score") {
      users.sort((a, b) => b.overallScore - a.overallScore)
    }

    res.json(users)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Search failed" })
  }
}

module.exports = { searchCandidates }