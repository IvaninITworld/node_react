const { resStatus } = require("../lib/responseStatus");
// const { User } = require("../models");

// navbar 정보 조회
exports.getAbout = async (req, res, next) => {
  try {
    console.log("GET /about 진입");
    // const user = await User.findOne({
    //   where: { id: req.headers.userid || null },
    // });
    res.status(resStatus.success.code).json({
      // 200
      data: user,
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// main 정보 조회
exports.putAbout = async (req, res, next) => {
  try {
    console.log("PUT /about 진입");
    // const user = await User.findOne({
    //   where: { id: req.headers.userid || null },
    // });
    res
      .status(resStatus.success.code) // 200
      .json({ data: user, message: resStatus.success.message }); // success
  } catch (error) {
    console.error(error);
    next(error);
  }
};
