const mongoose = require("mongoose");

const proofSchema = new mongoose.Schema({
  repoUrl: { type: String, required: true },

  evidenceScore: { type: Number, default: 0 },

  breakdown: {
    commits: Number,
    stars: Number,
    recencyScore: Number,
    complexityScore: Number
  },

  detectedLanguage: String,
  match: Boolean,

  lastCommitDate: Date,

  createdAt: { type: Date, default: Date.now }
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },

  proofs: [proofSchema],

  totalScore: { type: Number, default: 0 },

  repoCount: { type: Number, default: 0 },

  lastUpdated: Date
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  fullName: String,

  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["Student", "Recruiter"],
    default: "Student"
  },

  headline: String,
  location: String,
  description: String,
  github: String,

  status: {
    type: String,
    enum: ["Student", "Fresher", "Working Professional"],
    default: "Student"
  },

  college: String,
  graduationYear: Number,

  company: String,

  experienceYears: { type: Number, default: 0 },

  // 🔥 Aggregated Score for recruiter ranking
  overallScore: { type: Number, default: 0 },

  skills: {
    type: [skillSchema],
    default: []
  },

  githubAnalytics: {
    totalRepos: Number,
    activeDays: Number,
    lastSynced: Date
  },

  onboarded: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔥 Indexes for Recruiter Search
userSchema.index({ "skills.name": 1 });
userSchema.index({ experienceYears: 1 });
userSchema.index({ overallScore: -1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);