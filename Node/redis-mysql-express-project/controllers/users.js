const db = require("../database/db");
const redis = require("../database/redis");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const async = require("async");
const validator = require("email-validator");

async function getUsers(req, res) {
	db.query("select * from users", {
		type: QueryTypes.SELECT,
	})
		.then((users) => {
			res.json({ data: users, message: "All Users" });
		})
		.catch((err) => {
			console.log(err.message);
		});
}

async function getUser(req, res) {
	res.status(200).json({ data: req.user });
}

async function createUser(req, res) {
	const { body } = req;

	const user = await existingUser(body.email);

	console.log("Existing User ", user);

	if (user) {
		res.status(400).json({ "message ": "user already exist" });
	}

	const isValid = validator.validate(body.email);

	if (!isValid) {
		res.status(400).json({ message: "Email not valid " });

		return;
	}

	const guid = uuid.v4();

	const hash = bcrypt.hashSync(body.password, 10);

	const users = await db.query(
		"insert into users (name,email,passwd, guid, rollno) values (?,?,?, ?, ?)",
		{
			replacements: [body.name, body.email, hash, guid, body.rollno],
			type: QueryTypes.INSERT,
		}
	);

	console.log(users);

	res.status(201).json({ message: "User added successfully" });
}

async function updateUser(req, res) {
	let auth;

	if (req.user) {
		auth = req.user.guid;
	} else {
		auth = req.headers.auth;
	}

	if (!auth) {
		res.status(400).json({ message: "No Auth" });
	}

	const isValid = validator.validate(req.body.email);

	if (!isValid) {
		res.status(400).json({ message: "Email not valid " });

		return;
	}

	if (req.body.password) {
		const hash = bcrypt.hashSync(req.body.password, 10);

		db.query("update users set name =?,email=?,passwd=? where guid =?", {
			replacements: [req.body.name, req.body.email, hash, auth],
			type: QueryTypes.UPDATE,
		});
	} else {
		db.query("update users set name =?,email=? where guid =?", {
			replacements: [req.body.name, req.body.email, auth],
			type: QueryTypes.UPDATE,
		});
	}

	res.status(200).json({ message: "updated successfully" });
}

async function deleteUser(req, res) {
	const rollno = req.params.id;
	// console.log(rollno);
	const user = await check(rollno);
	console.log(user);
	if (!user) {
		res.status(400).json({ message: "user doesn't exist" });
	}
	const students = await db.query("delete from students where rollno=?", {
		replacements: [rollno],
		type: QueryTypes.DELETE,
	});

	res.status(200).json({ message: "deleted successfully" });
}

async function partialUpdate(req, res) {
	const rollno = req.params.id;
	const user = await check(rollno);

	console.log(user);
	if (!user) {
		res.status(400).json({ message: "user doesn't exist" });

		return;
	}

	const keys = Object.keys(req.body);
	console.log(keys);
	let query = "update students set ";
	const values = [];
	for (let i = 0; i < keys.length; i++) {
		query += keys[i] + "=?";

		if (i < keys.lenght - 1) {
			query += ",";
		}

		values.push(req.body[keys[i]]);
	}
	values.push(rollno);
	query += "where rollno=?";
	console.log(values);

	db.query(query, {
		replacements: values,
		type: QueryTypes.UPDATE,
	}).then((student) => console.log(students));

	res.status(200).json({ message: "updated successfully" });
}

async function getName(req, res) {
	async.waterfall(
		[
			async () => {
				console.log("Waterfall 1");
				const { auth } = req.headers;
				if (auth) {
					let user = await redis.get(auth);
					if (user) {
						user = JSON.parse(user);
						return user;
					} else {
						let users = await db.query(
							"select * from users where guid = ?",
							{
								type: QueryTypes.SELECT,
								replacements: [auth],
							}
						);
						user = users[0];
						console.log(user);
						redis.set(auth, JSON.stringify(user));
						return user;
					}
				} else {
					throw new Error("No Auth");
				}
			},
			(user, cb) => {
				console.log("Waterfall 2");
				if (user) {
					const { email, rollno } = req.body;
					console.log(email, "===", user.email);
					console.log(rollno, "===", user.rollno);
					if (email === user.email || rollno === user.rollno) {
						cb(null, user.name);
					} else {
						cb(
							"No Email or RollNo in body OR Auth tokken does not match provided info",
							user
						);
					}
				} else {
					cb("No User", null);
				}
			},
		],
		(err, result) => {
			console.log("Waterfall ENDS");
			if (err) {
				console.error("Error = ", err);
				res.status(404).json({ error: err });
			}
			console.log("Result = ", result);
			res.status(200).json({ name: result });
		}
	);
}
module.exports = {
	getUsers,
	getUser,
	getName,
	createUser,
	updateUser,
	deleteUser,
	partialUpdate,
};
