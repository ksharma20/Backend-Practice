const mongoose = require("mongoose");
const passwd = require("./psswd");

mongoose.connect(`mongodb://127.0.0.1:27017/mongo-project`);

module.exports = mongoose;
