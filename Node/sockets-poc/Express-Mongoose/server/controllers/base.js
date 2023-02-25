module.exports = {
	home: (req, res) => {
		console.log("/ GET hit");
		res.status(200).send(`<h1><center>Hello World!</center></h1>`);
	},
};
