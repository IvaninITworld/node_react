const express = require("express");
const { verifyToken } = require("../controllers/middlewaresController");
const { getContact } = require("../controllers/contactController.js");

const router = express.Router();

router.get("/", verifyToken, getContact);

module.exports = router;
