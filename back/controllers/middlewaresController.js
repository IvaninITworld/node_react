const express = require("express");
const jwt = require("jsonwebtoken");
const RateLimit = require("express-rate-limit");
const { resStatus } = require("../lib/responseStatus");

const router = express.Router();

// token 유효성 검사
exports.verifyToken = (req, res, next) => {
  try {
    console.log(`token : ${req.body.token}입니다`);
    const refreshToken = req.body.token;
    req.decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    console.log("error : ", error);
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(resStatus.expired.code).json({
        // 419
        message: resStatus.expired.message,
        // expired token
      });
    }
    return res.status(resStatus.invalidt.code).json({
      // 401
      message: resStatus.invalidt.message,
      // invalidt
    });
  }
};

// game/ 페이지 요청 횟수 제한(user type에 따라) (DoS 방지)
exports.apiLimiter = router.use(async (req, res, next) => {
  if (req.decoded.type === "premium") {
    premiumApiLimiter(req, res, next);
  } else {
    freeApiLimiter(req, res, next);
  }
});

const premiumApiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1분당
  max: 100, // 최대 100번까지
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: "premium limit",
    });
  },
});

const freeApiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1분당
  max: 5, // 최대 5번까지
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: "free limit",
    });
  },
});
