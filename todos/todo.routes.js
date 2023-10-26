const express = require("express");
const Router = express.Router()
const cookieParser = require("cookie-parser");

const CookieAuth = require("../cookieAuth/Auth");
const taskService = require("");

Router.use(cookieParser());

Router.get("/", async (req, res) => {
	const response = await taskService.getTasks();
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