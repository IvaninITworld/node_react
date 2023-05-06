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
  transport: ["websocket"],
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

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

let publicRoomList = [];
let publicMessages = [];

wsServer.on("connection", (socket) => {
  console.log("Have a connection from browser - skocket.id : ", socket.id);

  let today = new Date();
  // let year = today.getFullYear();
  // let month = ("0" + (today.getMonth() + 1)).slice(-2);
  // let day = ("0" + today.getDate()).slice(-2);
  let hour = ("0" + today.getHours()).slice(-2);
  let minute = ("0" + today.getMinutes()).slice(-2);

  let currentTime = `${hour}:${minute}`;

  socket.on("join", ({ userData, userRoomName }, callback) => {
    socket.join(userRoomName);

    let newMessage = {
      time: currentTime,
      user: "admin",
      message: `${userData.nick} has joined!`,
    };

    publicMessages.push(newMessage);

    socket.broadcast.to("public").emit("messages", { publicMessages });

    callback();
  });

  socket.on("sendMessage", ({ message, userData, userRoomName }, callback) => {
    let newMessage = {
      time: currentTime,
      user: userData.nick,
      message: `${message}`,
    };

    publicMessages.push(newMessage);
    socket.to(userRoomName).emit("messages", { publicMessages });

    callback();
  });

  //방 목록 반환
  socket.on("room_list", () => {
    socket.emit("room_list", publicRoomList);
  });

  // //방 만들기
  socket.on("create_room", ({ roomName, userData }, done) => {
    console.log(`Socket ${userData.nick} is creating room ${roomName}.`);

    //Socket은 ID와 같은 Room을 Default로 갖고 있음 (따라서, 기본적으로 socket.rooms.size == 1, 따라서 방을 만들기도 전에 1 초과라는 것은 이 사용자가 다른 방에 참가하고 있다는 뜻이다.)
    if (socket.rooms.size > 1) {
      console.log(`socket ${socket.id} is already in room.`);
      console.log(socket.rooms);

      socket.emit("error", "이미 다른 방에 참가중입니다.");
      return;
    }

    // 동일한 방이 존재할 경우
    if (wsServer.sockets.adapter.rooms.get(roomName)) {
      console.log(`Room name ${roomName} already exists.`);
      socket.emit("error", "동일한 방이 이미 존재합니다.");
      return;
    }

    const roomInfo = {
      roomName,
      blackPlayer: "",
      whitePlayer: "",
      takes: [],
    };

    publicRoomList.push(roomInfo);
    wsServer.sockets.emit("room_list", publicRoomList);
    console.log("###");
    enterRoom(socket, name);
    console.log(`Socket ${socket.id} is entering room ${name}.`);
    socket.join(name);
    done();
    socket.emit("room_enter", name);
    wsServer.to(name).emit("message", `${socket.id} 님이 입장하셨습니다.`);
  });

  // //기존 방 참가
  // socket.on("room_enter", (name) => {
  //   console.log("name : ", name);
  //   if (socket.rooms.size > 1) {
  //     console.log(`socket ${socket.id} is already in room.`);
  //     console.log("socket.rooms", socket.rooms);
  //     socket.emit("error", "이미 다른 방에 참가중입니다.");
  //     return;
  //   }
  //   console.log(`Socket ${socket.id} is entering room ${name}.`);
  //   socket.join(name);
  //   wsServer
  //     .to(name)
  //     .emit("welcome_message", `${socket.id} 님이 입장하셨습니다.`);
  // });

  // // 게임 test
  // socket.on("playGame", (message, socketID) => {
  //   console.log("message:", message, socketID);
  //   socket.broadcast.emit("playGame", message);
  //   // wsServer.emit("playGame",message)
  // });

  // //
  // socket.on("gameStatus", (history, board, roomName) => {
  //   console.log("history : ", history, board, roomName);
  //   // socket.to()
  // });

  // //
  // socket.on("sendingBoard", (board) => {
  //   console.log("sendingBoard", board.sendingBoard);
  //   console.log("roomName", board.roomName);
  //   console.log("lastStone", board.lastStone);
  //   console.log("count", board.count);
  //   socket
  //     .to(board.roomName)
  //     .emit(
  //       "sendingBoard",
  //       board.sendingBoard,
  //       board.roomName,
  //       board.lastStone,
  //       board.count
  //     );
  // });

  // // // 방 나가기
  // // // socket.on("room_leave", () => {
  // // //   const name = Array.from(socket.rooms)[1];
  // // //   console.log(`Socket ${socket.id} is leaving room ${name}.`);

  // // //   if (name != undefined) {
  // // //     //현재 Disconnect 하는 Socket이 해당 방의 마지막 소켓일 경우 방 제거
  // // //     if (wsServer.sockets.adapter.rooms.get(name).size == 1) {
  // // //       console.log(`Remove room ${name}`);
  // // //       publicRoomList = publicRoomList.filter((value) => value.name != name);
  // // //       wsServer.sockets.emit("room_list", publicRoomList);
  // // //     } else {
  // // //       const room = getPublicRoomListpublicRoomList(name);
  // // //       if (room.blackPlayer === socket.id) {
  // // //         room.blackPlayer = "";
  // // //         emitPlayerChange(room);
  // // //       } else if (room.whitePlayer === socket.id) {
  // // //         room.whitePlayer = "";
  // // //         emitPlayerChange(room);
  // // //       }

  // // //       wsServer.to(name).emit("message", `${socket.id} 님이 퇴장하셨습니다.`);
  // // //     }
  // // //     socket.leave(name);
  // // //   }

  // // //   socket.emit("room_leave");
  // // // });

  // // // 참가자가 방을 나가는 중  // the Set contains at least the socket ID
  // // // Fired when the client is going to be disconnected (but hasn't left its rooms yet).
  // // socket.on("disconnecting", () => {
  // //   // console.log("###socket.room### : ", socket);
  // //   socket.rooms.forEach((room) =>
  // //     socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
  // //   );
  // // });

  // error 처리
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  // socket.on("enter_room", (roomName, done) => {
  //   // console.log("roomName : ", roomName);
  //   socket.join(roomName);
  //   done();
  //   socket.to(roomName).emit("welcome");
  // });

  // User had left
  socket.on("disconnect", () => {
    // socket.to(userRoomName).emit("message", "User had left");
    console.log("User had left");
  });

  // socket.on("new_message", (message, roomName, done) => {
  //   socket.to(roomName).emit("new_message", message); // emit한 socket을 제외하고 해당 roomName의 room에 있는 나머지 socket들에게 emit.
  //   done(message);
  // });

  console.log("wsSocket : ");
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
