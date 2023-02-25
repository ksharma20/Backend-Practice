const mongo = require("../databases/mongo");

const user = new mongo.Schema({
	name: String,
	rollNo: {
		type: Number,
		required: true,
	},
	email: String,
	pass: Boolean,
});

module.exports = mongo.model("Users", user);
