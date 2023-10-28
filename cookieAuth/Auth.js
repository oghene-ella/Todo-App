const jwt = require("jsonwebtoken");
require("dotenv").config();

const CookieAuth = ( req, res, next) => {
	const token = req.cookies.jwt
	console.log(token)

	const validToken = jwt.verify(token, process.env.JWT_TOKEN)
	console.log(validToken)

	res.locals.user = validToken
	console.log(res.locals.user);
	
	next();
}
module.exports = {
	CookieAuth
};