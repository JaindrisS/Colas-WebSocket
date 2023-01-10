const socketControllers = (socket) => {
  console.log("Connected client", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected client", socket.id);
  });

  // Escuchar mensaje desde el servidor
  socket.on("send-message", (payload, callback) => {
    const id = 1234;
    callback(id);

    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = { socketControllers };
