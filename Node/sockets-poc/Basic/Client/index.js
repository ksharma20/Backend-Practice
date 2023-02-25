const io = require("socket.io-client");

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("msg", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("msg", (...args) => {
	// ...
	console.log(args);
});

// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding("utf-8");

// Prompt user to input data in console.
console.log("Please input text in command line.");

// When user input data and click enter key.
standard_input.on("data", function (data) {
	// User input exit.
	if (data === "exit\n") {
		// Program exit.
		socket.emit("close");
		console.log("User input complete, program exit.");
		process.exit();
	} else {
		// Print user input in console.
		socket.emit("msg", data);
	}
});
