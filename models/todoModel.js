const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	userId: {
		type: String,
		ref: "users",
	},
	title: {
		type: String,
		required: [true, "must provide title"],
		trim: true,
		maxlength: [35, "name cannot be more than 35 characters"],
	},
	status: {
		type: String,
		enum: ["pending", "completed"],
		default: "pending",
	},
});

const TodoModel = mongoose.model("todos", TaskSchema);

module.exports = TodoModel;
