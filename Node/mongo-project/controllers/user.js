const Users = require("../schemas/user");

module.exports = {
	getUsers: async (req, res) => {
		const { auth } = req.headers;
		if (!auth) {
			return res.status(401);
		}
		const users = await Users.find({});
		console.log(users);
		res.send(users);
	},
	getSortUsers: async (req, res) => {
		const { auth } = req.headers;
		if (!auth) {
			return res.status(401);
		}
		const users = await Users.find({}).sort({ rollNo: 1 });
		console.log(users);
		res.send(users);
	},
	getUser: async (req, res) => {
		const { rollno } = req.headers;
		console.log(req.headers);
		if (!rollno) {
			return res.status(404).json("RollNo not provided in headers");
		}
		const user = await Users.findOne({ rollNo: rollno });
		console.log(user);
		res.send(user);
	},
	delUser: async (req, res) => {
		const { auth } = req.headers;
		const { email, rollNo } = req.body;
		if (!auth) {
			return res.status(401);
		}
		if (rollNo || email) {
			let user;
			if (rollNo) {
				user = await Users.findOneAndDelete({
					rollNo: rollNo,
				});
			} else {
				user = await Users.findOneAndDelete({
					email: email,
				});
			}
			res.status(200).json({ msg: "User Deleted", data: user });
		} else {
			res.status(404).json("Email OR RollNo not provided");
		}
	},
	updateUser: async (req, res) => {
		const { auth } = req.headers;
		const { email, rollNo } = req.body;
		if (!auth) {
			return res.status(401);
		}
		if (rollNo || email) {
			let user;
			if (rollNo) {
				user = await Users.findOneAndUpdate(
					{
						rollNo: rollNo,
					},
					req.body,
					{ new: true }
				);
			} else {
				user = await Users.findOneAndUpdate(
					{
						email: email,
					},
					req.body,
					{ new: true }
				);
			}
			res.status(200).json({ msg: "User Updated", data: user });
		} else {
			res.status(404).json("Email OR RollNo not provided");
		}
	},
	createUser: async (req, res) => {
		const { email, rollNo } = req.body;
		if (rollNo && email) {
			let user;
			if (rollNo) {
				user = await Users.findOne({
					rollNo: rollNo,
				});
			} else if (email) {
				user = await Users.findOne({
					email: email,
				});
			}
			if (user) {
				res.status(200).json({
					msg: "User Already Exists",
					data: user,
				});
			} else {
				const nuser = await Users.create(req.body);
				res.status(200).json({ msg: "User Created", data: nuser });
			}
		} else {
			res.status(404).json("Email OR RollNo not provided");
		}
	},
};
