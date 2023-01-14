const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const { socketControllers } = require("../sockets/controllers");

class Server {
  constructor() {
    this.app = express();
    this.path = {};
    this.port = process.env.PORT || 3000;

    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.middleware();

    // Sockets
    this.socket();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(
      morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.status(req, res),
          tokens.url(req, res),
        ];
      })
    );
    this.app.use(express.static(path.join(__dirname, "../../src/public/")));
  }

  socket() {
    this.io.on("connection", socketControllers);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = Server;
