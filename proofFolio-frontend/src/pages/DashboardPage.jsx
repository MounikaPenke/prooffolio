// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from "react"
import axios from "axios"

export default function DashboardPage() {
  const [userData, setUserData] = useState(null)
  const [skillName, setSkillName] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // ⚠️ Replace this with real logged-in user email later (JWT phase)
  const userEmail = localStorage.getItem("userEmail")

  // Fetch user from DB
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user?email=${userEmail}`
      )
      setUserData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Add skill proof
  const handleAddSkill = async () => {
    if (!skillName || !repoUrl) {
      setError("Please enter skill name and repo URL")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await axios.post(
        "http://localhost:5000/api/skill/add-proof",
        {
          email: userEmail,
          skillName,
          repoUrl
        }
      )

      const updatedSkill = res.data.updatedSkill

      setUserData(prev => {
        const updatedSkills = [...prev.skills]
        const index = updatedSkills.findIndex(
          s => s.name === updatedSkill.name
        )

        if (index >= 0) {
          updatedSkills[index] = updatedSkill
        } else {
          updatedSkills.push(updatedSkill)
        }

        return { ...prev, skills: updatedSkills }
      })

      setSkillName("")
      setRepoUrl("")
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Welcome, {userData.headline || userData.email}
      </h1>

      {/* Add Skill Section */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Add Skill Proof
        </h2>

        <input
          type="text"
          placeholder="Skill Name (e.g. Python)"
          value={skillName}
          onChange={e => setSkillName(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg"
        />

        <input
          type="text"
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={e => setRepoUrl(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg"
        />

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <button
          onClick={handleAddSkill}
          disabled={loading}
          className="w-full py-3 bg-teal-accent text-dark-bg rounded-full font-semibold"
        >
          {loading ? "Analyzing..." : "Add & Analyze"}
        </button>
      </div>

      {/* Skills Display */}
      <div className="grid md:grid-cols-3 gap-6">
        {userData.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-dark-card border border-dark-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              {skill.name}
            </h2>

            <p className="text-teal-accent font-semibold mb-4">
              Evidence Score: {skill.totalScore}/100
            </p>

            {skill.proofs.map((proof, i) => (
              <div
                key={i}
                className="bg-dark-bg border border-dark-border rounded-lg p-3 mb-3 text-sm"
              >
                <p className="text-gray-400 truncate">
                  {proof.repoUrl}
                </p>

                <p>
                  Score: {proof.evidenceScore}
                </p>

                {!proof.match && (
                  <p className="text-yellow-400 text-xs mt-1">
                    ⚠ Language mismatch detected
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}