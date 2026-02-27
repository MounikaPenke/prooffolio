const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./db")

const app = express()

// 1️⃣ Connect DB
connectDB()

// 2️⃣ Middlewares
app.use(cors())
app.use(express.json())

// 3️⃣ Routes
app.use("/api/github", require("./routes/githubRoutes"))
app.use("/api/skill", require("./routes/skillRoutes"))
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/recruiter", require("./routes/recruiterRoutes"))

// 4️⃣ Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})