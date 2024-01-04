let users = [];

const SocketServer = (socket) => {
  
  // Connect - Disconnect
  socket.on("joinUser", (user) => {
    if (user && !users.find((item) => item.id === user._id))
      users.push({
        id: user._id,
        socketId: socket.id,
        followers: user.followers,
      });
    console.log(users);
  });
  
  socket.on("disconnect", () => {
    const data=users.find(user=>user.socketId===socket.id)

    if(data){
      const clients=users.filter(user=>data.followers?.find(item=>item._id===user.id))

      clients.forEach(client=>{
        socket.to(client.socketId).emit("checkUserOfflineToClient",data.id);
      })
    }


    users = users.filter((user) => user.socketId !== socket.id);
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

  socket.on("checkUserOnline", (data) => {
    if (Object.keys(data).length === 0) return;

    const following = users.filter((user) =>
      data.following.find((item) => item._id === user.id)
    );

    if (following) {
      socket.emit("checkUserOnlineToMe", following);
    }

    const clients = users.filter((user) =>
      data.followers.find((item) => item._id === user.id)
    );

    clients.forEach((client) => {
      socket.to(client.socketId).emit("checkUserOnlineToClient", data._id);
    });
  });
  // Likes
  socket.on('likePost', (newPost) => {
    // console.log ({newPost: newPost, users: users})
    const ids = [...newPost.user.followers, newPost.user._id]
   const clients = users.filter((user) => ids.includes(user.id))
    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost)
      })
    }
  })

  socket.on('unLikePost', (newPost) => {
    // console.log ({newPost: newPost, users: users})
    const ids = [...newPost.user.followers, newPost.user._id]
   const clients = users.filter((user) => ids.includes(user.id))
    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
      })
    }
  })
};

module.exports = SocketServer;
  