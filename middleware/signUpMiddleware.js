const bcrypt = require("bcrypt");
const SignupModel = require("../models/signupModel");

const signUp = async (req, res, next) => {
	const data = {
		fullname: req.body.fullname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	};

	const existingUser = await SignupModel.findOne({ email: data.email });
	if (existingUser) {
		res.send("user already exist, please choose a different email");
	} 
	
	else {
		const saltRound = 10;
		const hashedPassword = await bcrypt.hash(data.password, saltRound);

		data.password = hashedPassword;

		const userData = await SignupModel.insertMany(data);
		console.log(userData);

		res.status(201).render("login");
	}

	next();
};

module.exports = { signUp };
