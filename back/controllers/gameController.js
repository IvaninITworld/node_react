const { resStatus } = require("../lib/responseStatus");
const { User, Spaceship, Scoredata } = require("../models");

exports.gamePage = async (req, res, next) => {
  try {
    console.log("GET /game 진입");
    console.log("req.decoded.type : ", req.decoded.type);
    const user = await User.findOne({
      where: { id: req.decoded.id },
      attributes: ["nick", "win", "lose"],
      // include: [
      //   {
      //     model: Spaceship,
      //     attributes: ["shipName"],
      //   },
      // ],
    });

    res.status(resStatus.success.code).json({
      // 200
      success: true,
      data: user,
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// game 종료 후 update
exports.gameResultUpdate = async (req, res, next) => {
  console.log("PUT /game/update 진입");
  const { win, lose } = req.headers;
  try {
    const oriWin = await User.findOne({
      where: { id: req.decoded.id },
      attributes: ["win"],
    });

    const oriLose = await User.findOne({
      where: { id: req.decoded.id },
      attributes: ["lose"],
    });

    const resultWin = parseInt(oriWin.dataValues.win) + parseInt(win);
    const resultLose = parseInt(oriLose.dataValues.lose) + parseInt(lose);

    await User.update(
      { win: resultWin, lose: resultLose },
      { where: { id: req.decoded.id } }
    );

    res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
