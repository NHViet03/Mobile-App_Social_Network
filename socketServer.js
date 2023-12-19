let users = [];

const SocketServer = (socket) => {
  // Connect - Disconnect
  socket.on("joinUser", (id) => {
    if (id !== null) users.push({ id, socketId: socket.id });
    console.log(users);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });
};

module.exports = SocketServer;
