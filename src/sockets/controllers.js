const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketControllers = (socket) => {
  // Escuchar mensaje desde el servidor

  socket.emit("last-ticket", ticketControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return {
        ok: false,
        msg: "El escritorio es obligatorio",
      };
    }

    const ticket = ticketControl.attendTicket(escritorio);
    if (!ticket) {
      callback({
        ok: false,
        msg: "No hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = { socketControllers };
