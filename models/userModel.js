const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userModel = new Schema({
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
		unique: true,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userModel.pre("save", async function (next) {
	const hash = await bcrypt.hash(this.password, 10);

	this.password = hash;
	next();
});

userModel.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};


const UsersModel = mongoose.model("users", userModel);

module.exports = UsersModel;
