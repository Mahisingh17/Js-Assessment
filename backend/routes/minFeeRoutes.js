const express = require("express");
const router = express.Router();
const { getMinFee } = require("../controllers/minFeeController");

router.post("/", getMinFee);

module.exports = router;