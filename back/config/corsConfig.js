const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3003",
  "http://192.168.219.101:3000",
];

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  preflightContinue: true, // preflight 요청에 대한 응답에서도 CORS 정책을 설정할 수 있도록 해주는 옵션
};

app.use(cors(corsConfig)); // 옵션을 추가한 CORS 미들웨어 추가

module.exports = corsConfig;
