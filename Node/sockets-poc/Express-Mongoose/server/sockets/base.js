const { Content } = require("../database/models");

module.exports = async (socket) => {
	console.log(`User Connected with ID => ${socket.id}`);

	socket.emit("getContent", await Content.find({}));

	socket.on("like", async (id) => {
		const content = await Content.findOneAndUpdate(
			{
				cid: id,
			},
			{
				$inc: { likes: 1 },
			},
			{
				new: true,
			}
		);
		console.log(content);
		// const allContent = await Content.find({});
		// socket.emit("getContent", allContent);
		// socket.broadcast.emit("getContent", allContent);
	});

	socket.on("createContent", async (content, cb) => {
		console.log(`Create Content == `, content);
		let ncontent = {
			cid: content.cid,
			name: content.cname,
		};
		try {
			ncontent = new Content(ncontent);
			ncontent.save();
			console.log(ncontent);
			cb("Content Created", ncontent);
			socket.emit("getContent", await Content.find({}));
		} catch (error) {
			cb("Content Not Created because", error.message);
		}
	});
};
