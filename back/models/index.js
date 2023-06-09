const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Room = require("./room");
const Chat = require("./chat");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Room = Room;
db.Chat = Chat;

User.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);

User.associate(db);
Room.associate(db);
Chat.associate(db);

module.exports = db;
