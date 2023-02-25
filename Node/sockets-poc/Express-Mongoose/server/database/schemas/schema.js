const { Schema } = require("../mongoDB");

module.exports = {
	Content: new Schema({
		cid: {
			type: Number,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			default: "No Name",
		},
		likes: {
			type: Number,
			default: 0,
		},
		shares: {
			type: Number,
			default: 0,
		},
	}),
};
