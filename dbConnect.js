const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/Todo_App")
	.then(() => {
		console.log("mongoose connected");
	})
	.catch((e) => {
		console.log("failed to connect");
	});

const todoSignUpSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const Todo_App_db = new mongoose.model("sign_up_db", todoSignUpSchema);

module.exports = Todo_App_db;
