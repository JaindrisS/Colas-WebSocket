const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketControllers = (socket) => {
  // Escuchar mensaje desde el servidor

  socket.emit("last-ticket", ticketControl.last);
  socket.emit("estado-actual", ticketControl.lastFour);
  socket.emit("tickets-pendientes", ticketControl.tickets.length);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return {
        ok: false,
        msg: "El escritorio es obligatorio",
      };
    }

    const ticket = ticketControl.attendTicket(escritorio);
    socket.broadcast.emit("estado-actual", ticketControl.lastFour);
    socket.emit("tickets-pendientes", ticketControl.tickets.length);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
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
