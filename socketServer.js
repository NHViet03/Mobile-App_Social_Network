let users = [];

const SocketServer = (socket) => {
  // Connect - Disconnect
  socket.on("joinUser", (id) => {
    if (id !== null && !users.find((user) => user.id === id))
      users.push({ id, socketId: socket.id });
    console.log(users);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log(users);
  });

  socket.on("createMessage", (message) => {
    const user = users.find((user) => user.id === message.recipient._id);

    if (user) {
      socket.to(user.socketId).emit("createMessageToClient", message);
    }
  });

  socket.on("updateConversation", (conversation) => {
    const user = users.find((user) =>
      conversation.recipients.find((r) => r._id === user.id)
    );

    if (user) {
      socket.to(user.socketId).emit("updateConversationToClient", conversation);
    }
  });
};

module.exports = SocketServer;
