const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const signupModel = new Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
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

const SignupModel = mongoose.model("signup", signupModel);

module.exports = SignupModel;
