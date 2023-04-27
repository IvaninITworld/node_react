// const app = require("./app");

// app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번 포트에서 대기중");
// });

// server.js
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("io", io);

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  // 토큰 검증 및 사용자 인증 로직
  // 만약 검증이 실패하면 next(new Error('Authentication Error'));
  // 검증이 성공하면 next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // 이곳에 추가적인 이벤트 핸들러 및 로직을 작성하실 수 있습니다.
  // 예를 들어, 방 목록과 메시지를 처리하는 이벤트를 추가할 수 있습니다.
  // socket.on("joinRoom", (roomId) => { /* ... */ });
  // socket.on("sendMessage", (message) => { /* ... */ });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
