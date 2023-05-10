const users = [];

const addUser = ({ id, nick, roomName }) => {
  console.log("user created : ", nick);
  nick = nick.trim().toLowerCase();
  roomName = roomName.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.roomName === roomName && user.nick === nick
  );

  if (!nick || !roomName) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, nick, roomName };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInuserRoomName = (roomName) =>
  users.filter((user) => user.roomName === roomName);

module.exports = {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInuserRoomName,
};
