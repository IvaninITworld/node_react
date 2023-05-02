const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resStatus } = require("../lib/responseStatus");
const { User } = require("../models");

// 로그인
exports.verifyUser = async (req, res, next) => {
  console.log("GET /verifyUser 진입");
  console.log("req.body : ", req.body);
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (!exUser) {
      console.log("the user does not exist");
      return res.status(resStatus.invalide.code).json({
        // 404
        message: resStatus.invalide.message, // login-failure
      });
    } else {
      const result = await bcrypt.compare(password, exUser.password);
      if (!result) {
        return res.status(resStatus.invalidp.code).json({
          // 404
          message: resStatus.invalidp.message, // login-failure
        });
      } else {
        const token = jwt.sign(
          {
            id: exUser.id,
            type: exUser.type,
            email: exUser.email,
            nick: exUser.nick,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "60m",
            issuer: "IVAN",
          }
        );
        return res.status(resStatus.success.code).json({
          // 200
          message: resStatus.success.message, // success
          token,
          user: exUser,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
