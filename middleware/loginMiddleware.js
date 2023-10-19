const bcrypt = require("bcrypt")
const SignUpModal = require("../models/signupModel");
const LoginModal = require("../models/loginModel")

const login = async (req, res, next) => {
	try {
		const checkLogin = await SignUpModal.findOne({username: req.body.username})
		if (!checkLogin) {
			res.send("User not found!")
		}

		const passwordMatch = await bcrypt.compare(req.body.password, checkLogin.password)
		if(passwordMatch) {

			const data = {
				username: req.body.username,
				password: checkLogin.password
			};

			const userData = await LoginModal.insertMany(data);
			console.log(userData);

			res.render("index");
		}
		else {
			res.send("wrong password")
		}
	}
	catch (err) {
		res.send("Wrong details")
	}
};

module.exports = { login };
