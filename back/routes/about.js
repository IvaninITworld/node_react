const express = require("express");
const { verifyToken } = require("../controllers/middlewares");
const { getAbout, putAbout } = require("../controllers/about.js");

const router = express.Router();

router.get("/", verifyToken, getAbout);
router.put("/", verifyToken, putAbout);

module.exports = router;
