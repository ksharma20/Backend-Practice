const { model } = require("./mongoDB");
const Schemas = require("./schemas/schema");
module.exports = {
	Content: model("content", Schemas.Content),
};
