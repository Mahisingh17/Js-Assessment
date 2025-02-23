const express = require("express");
const router = express.Router();
const { getParentheses } = require("../controllers/parenthesesController");

router.get("/", getParentheses);

module.exports = router;