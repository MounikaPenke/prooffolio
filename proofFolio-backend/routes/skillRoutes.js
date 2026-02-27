const express = require("express");
const router = express.Router();
const { addProof } = require("../controllers/skillController");

router.post("/add-proof", addProof);

module.exports = router;