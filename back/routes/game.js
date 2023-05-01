const express = require("express");
const { verifyToken } = require("../controllers/middlewaresController");
const { gamePage, gameResultUpdate } = require("../controllers/gameController");

const router = express.Router();

router.get("/game", verifyToken, gamePage); // gear 페이지 조회
router.put("/game", verifyToken, gameResultUpdate); // game 종료 후 update

module.exports = router;
