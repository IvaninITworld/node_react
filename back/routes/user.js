const express = require("express");
const { verifyToken } = require("../controllers/middlewaresController");
const { verifyUser } = require("../controllers/userController");

const router = express.Router();

router.get("/verifyUser", verifyToken, verifyUser);

module.exports = router;
