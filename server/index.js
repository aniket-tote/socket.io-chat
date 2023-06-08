const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = new Map();

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users.set(socket.id, name);
    // socket.join("g-6");
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users.get(socket.id),
    });
  });

  socket.on("disconnect", (message) => {
    console.log("Client disconnected");

    // Notify other users in the room that a user has left
    socket.broadcast.emit(
      "disconnected",
      `${users.get(socket.id)} left the chat`
    );
    users.delete(socket.id);
  });
});

io.listen(3000);
