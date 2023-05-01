const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resStatus } = require("../lib/responseStatus");
const { User, Spaceship } = require("../models");

// 회원가입;
// 1. email 중복 검사
exports.joinServiceEmailCheck = async (req, res, next) => {
  console.log("POST /auth/join/email-check 진입");
  const { email } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(resStatus.invalide.code).json({
        // 404
        message: resStatus.invalide.message, // email-check-failure-duplicated
      });
    } else {
      return res.status(resStatus.success.code).json({
        // 200
        message: resStatus.success.message, // email-check-success
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 2. nick 중복 검사
exports.joinServiceNickCheck = async (req, res, next) => {
  console.log("POST /auth/join/nick-check 진입");
  const { nick } = req.body;
  try {
    if (!nick) {
      return res.status(resStatus.notenough.code).json({
        // 404
        message: resStatus.notenough.message, // no-nick
      });
    }

    // nick 공백 검사
    let blank = /\s/g;
    if (nick.match(blank)) {
      return res.status(resStatus.blank.code).json({
        // 404
        message: resStatus.blank.message, // nick-is-null
      });
    }

    // nick 중복 검사
    const exUser = await User.findOne({ where: { nick } });
    if (exUser) {
      return res.status(resStatus.invalidn.code).json({
        // 404
        message: resStatus.invalidn.message, // nick-check-failure-duplicated
      });
    } else {
      return res.status(resStatus.success.code).json({
        // 200
        message: resStatus.success.message, // nick-check-succeess
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 3. 최종 검사(email, nick) 후, User 모델에 저장
exports.joinService = async (req, res, next) => {
  console.log("joinService req.body : ", req.body);
  const { email, nick, password } = req.body.body;
  try {
    console.log("POST /auth/join 최종 진입");
    const exUser1 = await User.findOne({ where: { email } });
    const exUser2 = await User.findOne({ where: { nick } });
    if (exUser1) {
      console.log("이메일 중복");
      return res.status(resStatus.duplicatedEmail.code).json({
        // 409
        message: resStatus.duplicatedEmail.message, // email-check-failure-duplicated
      });
    }
    if (exUser2) {
      console.log("닉네임 중복");
      return res.status(resStatus.duplicatedNick.code).json({
        // 409
        message: resStatus.duplicatedNick.message, // nick-check-failure-duplicated
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      nick,
      password: hash,
    });
    // 가입할 때 currentShipImage로 rocket0.png을 default로 받으므로 Spaceship 모델에 관계커리로 추가한다.

    return res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // join-success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 로그인
exports.loginService = async (req, res, next) => {
  console.log("POST /auth/login 진입");
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
