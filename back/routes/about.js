const express = require("express");
const { verifyToken } = require("../controllers/middlewaresController");
const { getAbout, putAbout } = require("../controllers/aboutController.js");

const router = express.Router();

router.get("/", verifyToken, getAbout);
router.put("/", verifyToken, putAbout);

module.exports = router;
