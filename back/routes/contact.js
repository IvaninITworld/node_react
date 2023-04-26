const express = require("express");
const { verifyToken } = require("../controllers/middlewares");
const { getContact } = require("../controllers/contact.js");

const router = express.Router();

router.get("/", verifyToken, getContact);

module.exports = router;
