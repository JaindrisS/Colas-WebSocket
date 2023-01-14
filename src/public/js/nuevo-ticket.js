// Referencias HTML
const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreated = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnCreated.disable = false;
});

socket.on("disconnect", () => {
  btnCreated.disable = true;
});

socket.on("last-ticket", (ticket) => {
  lblNewTicket.innerText = `Ticket ${ticket}`;
});

btnCreated.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
