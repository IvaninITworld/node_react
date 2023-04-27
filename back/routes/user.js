const express = require("express");
const { verifyToken } = require("../controllers/middlewaresController");
const { addFollow } = require("../controllers/user");

const router = express.Router();

router.get("/add-follow/:id", verifyToken, addFollow);

module.exports = router;
