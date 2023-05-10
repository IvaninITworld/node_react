const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const cors = require("cors");
const corsConfig = require("./config/corsConfig");

app.use(cors(corsConfig));

const socketio = require("socket.io");

const wsServer = socketio(server, {
  cors: corsConfig,
  allowEIO3: true,
  transport: ["websocket", "polling"],
});

const bodyParser = require("body-parser");

const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const gameRouter = require("./routes/game");
const { sequelize } = require("./models");

dotenv.config({ path: "./config/.env" });
// dotenv.config({ path: "./config/corsConfig" });

const PORT = process.env.PORT;
app.set("port", PORT);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database has been connected!!");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/auth", authRouter);
app.use("/game", gameRouter);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInuserRoomName,
  users,
} = require("./users");

wsServer.on("connection", (socket) => {
  console.log("Have a connection from browser - skocket.id : ", socket.id);

  let today = new Date();
  // let year = today.getFullYear();
  // let month = ("0" + (today.getMonth() + 1)).slice(-2);
  // let day = ("0" + today.getDate()).slice(-2);
  let hour = ("0" + today.getHours()).slice(-2);
  let minute = ("0" + today.getMinutes()).slice(-2);

  let currentTime = `${hour}:${minute}`;

  socket.on("join", ({ userData, roomName }, callback) => {
    console.log("join 으로 유저가 보냄 : ", userData.nick, roomName);
    const { error, user } = addUser({
      id: socket.id,
      nick: userData.nick,
      roomName,
    });
    if (error) return callback(error);

    socket.join(roomName);

    let newMessage = {
      time: currentTime,
      user: "admin",
      message: `${user.nick} has joined!`,
    };

    socket.emit("message", { newMessage });
    socket.broadcast.to(roomName).emit("message", { newMessage });

    console.log("users info : ", getUsersInuserRoomName(roomName));

    wsServer.to(roomName).emit("roomData", {
      room: roomName,
      users: getUsersInuserRoomName(roomName),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    let newMessage = {
      time: currentTime,
      user: user.nick,
      message: `${message}`,
    };
    // publicMessages.push(newMessage);
    wsServer.to(user.roomName).emit("message", { newMessage });

    callback();
  });

  // User had left
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      console.log("disconect user info", user);

      let newMessage = {
        time: currentTime,
        user: "Admin",
        message: `${user.nick} has left.`,
      };

      wsServer.to(user.roomName).emit("message", { newMessage });

      wsServer.to(user.roomName).emit("roomData", {
        room: user.roomName,
        users: getUsersInuserRoomName(user.roomName),
      });
    }
    console.log("User had left");
  });
});

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

server.listen(app.get("port"), () => {
  console.log("Server has started on port ", app.get("port"));
});

module.exports = app;
