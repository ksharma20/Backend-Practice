const io = require("socket.io-client");
const async = require("async");

var socket = io("http://localhost:3000");

socket.on("connection", function (data) {
	console.log("Connected");
});

function updateLike(cid) {
	console.log(`cid: ${cid}'s likes Updated`);
	// for (let index = 0; index < 100; index++) {
	const socket = io("http://localhost:3000");
	socket.emit("like", cid);
	// }
}

// document.getElementById("createContent").addEventListener("submit", (ev) => {
// 	ev.preventDefault();
// 	const cid = document.getElementById("cid");
// 	const cname = document.getElementById("cname");
// 	const content = { cid: cid.value, cname: cname.value };
// 	console.log();
// 	socket.emit("createContent", content, (msg, content) => {
// 		console.log(msg, content);
// 	});
// 	cid.value = "";
// 	cname.value = "";
// });

// socket.on("getContent", (contents) => {
// 	const allcontents = document.getElementById("allContent");
// 	allcontents.innerHTML = ``;
// 	contents.forEach((content) => {
// 		const item = document.createElement("li");
// 		item.innerHTML = `<h1>${content.name}</h1>
// 		<div><button id="${content.cid}_like" onclick="updateLike(${content.cid})">Like
// 				<svg
// 					xmlns="http://www.w3.org/2000/svg"
// 					width="16"
// 					height="16"
// 					fill="currentColor"
// 					class="bi bi-chat-heart-fill"
// 					viewBox="0 0 16 16"
// 				>
// 					<path
// 						d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
// 					/>
// 				</svg> ${content.likes}
// 			</button></div>`;
// 		allcontents.appendChild(item);
// 		window.scrollTo(0, document.body.scrollHeight);
// 	});
// });
const array = Array.from({ length: 1000 }).map((u, i) => i);
console.log(array);
async.eachLimit(array, 100, (item, cb) => {
	updateLike(2);
	console.log(`${item} Times`);
	cb(null);
});
