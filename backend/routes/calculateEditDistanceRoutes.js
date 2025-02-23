const express = require("express");
const router = express.Router();
const { getCalculateEditDistance } = require("../controllers/calculateEditDistanceController");

router.post("/", getCalculateEditDistance);

module.exports = router;