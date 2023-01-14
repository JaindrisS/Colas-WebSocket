// Referencias HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";

  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = ` Escritorio ${escritorio}`;

const socket = io();

socket.on("connect", () => {
  btnAtender.disable = false;
});

socket.on("disconnect", () => {
  btnAtender.disable = true;
});

socket.on("last-ticket", (ticket) => {
  // btnAtender.innerText = `Ticket ${ticket}`;
});

// btnAtender.addEventListener("click", () => {
//   socket.emit("next-ticket", null, (ticket) => {
//     lblNewTicket.innerText = ticket;
//   });
// });
