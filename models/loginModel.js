const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const loginModel = new Schema({
	_id: {
		type: String,
		default: shortid.generate,
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

const LoginModel = mongoose.model("login", loginModel);

module.exports = LoginModel;
