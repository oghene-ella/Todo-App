const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	title: {
		type: String,
		required: [true, "must provide title"],
		trim: true,
		maxlength: [20, "name cannot be more than 30 characters"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const TodoModel = mongoose.model("todo", TaskSchema);

module.exports = TodoModel;
