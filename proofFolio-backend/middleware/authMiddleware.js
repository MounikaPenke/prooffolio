const jwt = require("jsonwebtoken")

function verifyRecruiter(req, res, next) {
  const authHeader = req.headers["authorization"]

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "Recruiter") {
      return res.status(403).json({ error: "Access denied" })
    }

    req.user = decoded
    next()

  } catch (err) {
    console.log("JWT Error:", err.message)
    return res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = verifyRecruiter