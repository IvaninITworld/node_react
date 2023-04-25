const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const aboutRouter = require("./routes/about");
const contactRouter = require("./routes/contact");
const gameRouter = require("./routes/game");

const { sequelize } = require("./models");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // React 앱의 URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    // Sequelize를 사용하여 사용자 조회
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Sequelize를 사용하여 사용자 조회
});

const PORT = process.env.PORT;
app.set("port", PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/game", gameRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? error : {};
  res.status(error.status || 500);
});

module.exports = app;
