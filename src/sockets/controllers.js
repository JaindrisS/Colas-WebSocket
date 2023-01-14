const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketControllers = (socket) => {
  // Escuchar mensaje desde el servidor

  socket.emit("last-ticket", ticketControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
  });
};

module.exports = { socketControllers };
