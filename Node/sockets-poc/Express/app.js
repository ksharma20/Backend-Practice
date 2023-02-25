const express = require("express");
const Http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = Http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

async function getQuote() {
	let quote = await fetch("https://kyoko.rei.my.id/api/quotes");
	quote = await quote.json();
	quote = quote["apiResult"][0];
	return [quote["english"], quote["character"], quote["anime"]];
}

io.on("connection", (socket) => {
	console.log("User connected with ID=> ", socket.id);
	socket.broadcast.emit(
		"note",
		`<b>User connected</b> => <i>${socket.id}</i>`
	);

	socket.on("note", (note) => {
		socket.broadcast.emit("note", note);
	});

	socket.on("quote", async () => {
		io.emit("quote", await getQuote());
	});

	socket.on("msg", (msg) => {
		io.emit("msg", `<b>${socket.id}</b> := ${msg}`);
	});

	socket.on("disconnect", (res) => {
		socket.broadcast.emit(
			"note",
			`<b>${socket.id}</b> Disconnected due to <b><i>${res}</b></i>`
		);
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
