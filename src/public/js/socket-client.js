// Referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();
// On Escuchar
socket.on("connect", () => {
  // console.log("Connected");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  // console.log("Disconnected from server");

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("send-message", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const message = txtMensaje.value;
  const payload = {
    message,
    id: 1234,
    date: new Date(),
  };

  // Emit envia un evento al servidor
  socket.emit("send-message", payload, (id) => {
    console.log("From server", id);
  });
});
