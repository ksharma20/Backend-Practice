const db = require("../database/db.js");
const redis = require("../database/redis");
const { QueryTypes } = require("sequelize");

module.exports = {
	auth: async (req, res, next) => {
		const { auth } = req.headers;
		if (auth) {
			let user = await redis.get(auth);
			if (user) {
				req.user = JSON.parse(user);
			} else {
				db.query("select * from users where guid = ?", {
					type: QueryTypes.SELECT,
					replacements: [auth],
				})
					.then((users) => {
						if (users.length) {
							user = users[0];
							redis.set(auth, JSON.stringify(user));
							req.user = user;
						} else {
							res.status(404).json("User not found");
						}
					})
					.catch((err) => {
						console.error(err.message);
					});
			}
		} else {
			res.status(401).json("unauthorized");
		}
		next();
	},
	validate: (req, res, next) => {},
	checkRoll: async (rollno) => {
		const student = await db.query(
			"select * from students where rollno=?",
			{
				replacements: [rollno],
				type: QueryTypes.SELECT,
			}
		);
		if (student.length) {
			return student[0];
		} else {
			return null;
		}
	},
	existingUser: async (email) => {
		const e = email;
		let user = redis.get(email);
		if (user) {
			return JSON.parse(user);
		}
		return new Promise((resolve, reject) => {
			db.query("select * from users where email= ?", {
				replacements: [e],
				type: QueryTypes.SELECT,
			})
				.then((users) => {
					if (users.length) {
						user = users[0];
						redis.set(email, JSON.stringify(user));
						resolve(user);
					} else {
						resolve(null);
					}
				})

				.catch((err) => {
					reject(`ERROR : ${err}`);
				});
		});
	},
};
