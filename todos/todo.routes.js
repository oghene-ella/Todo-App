const express = require("express");
const Router = express.Router()
const cookieParser = require("cookie-parser");

const CookieAuth = require("../cookieAuth/Auth")

Router.use(cookieParser());

Router.get("/", async (req, res) => {
	const query = req.query;
	const user = res.locals.user || null;
    
	const response = await taskService.getTasks(user, query);

	if (response.code == 404) {
		console.log(user);
		res.render("dashboard", {
			user: user,
			tasks: response.tasks,
			message: response.message,
		});
	} else if (response.code == 409) {
		res.redirect("/404");
	} else {
		res.render("dashboard", {
			user: response.user,
			tasks: response.tasks,
			message: response.message,
		});
	}
});

Router.use(CookieAuth.CookieAuth);
Router.get("/todos", async (req, res) => {
    // const { todo, username } = req.body;
    // render dashboard

    // const response = await userService.Login({
    //     password,
    //     username,
    // });


	res.render("dashboard");
});

module.exports = Router;    