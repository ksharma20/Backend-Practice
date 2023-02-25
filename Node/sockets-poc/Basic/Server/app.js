const { Server } = require("socket.io");
const io = new Server();

io.on("connection", (socket) => {
	console.log("connected");
	socket.broadcast.emit("msg", `User Connected ${socket.id}`);

	socket.on("disconnect", (res) => {
		console.log(`User Disconnected Due to ${res}`);
	});

	socket.on("msg", (args) => {
		io.emit("msg", `${socket.id}:= ${args}`);
	});

	socket.on("close", (arg) => {
		io.emit("msg", socket.id, " User Disconnected/Exitted");
		socket.disconnect(true);
	});
});

io.listen(3000);
console.log(`Socket listerning on localhost:3000`);
