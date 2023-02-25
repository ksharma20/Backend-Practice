const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

const routers = require("./routes/base");
const sockets = require("./sockets/base");

app.use(express.json());
app.use("/", routers);

io.on("connection", sockets);

server.listen(3000);
