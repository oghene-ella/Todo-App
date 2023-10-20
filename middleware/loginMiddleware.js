const bcrypt = require("bcrypt")
const SignUpModal = require("../models/signupModel");
const jwt = require("jsonwebtoken");
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

			const accessToken = jwt.sign(data, process.env.JWT_TOKEN)
			res.json({ accessToken: accessToken })

			const AuthenticationHeader = req.headers["authorization"];
			const token = AuthenticationHeader && AuthenticationHeader.split(" ")[1];
			if(token == null){
				return res.status(401)
			}

			jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
				if (err) {
					return res.status(403)
				}

				req.user = user
				next()
			})

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
	next()
};

module.exports = { login };
