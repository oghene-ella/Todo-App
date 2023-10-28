const express = require("express");
const Router = express.Router()
const cookieParser = require("cookie-parser");

const CookieAuth = require("../cookieAuth/Auth");
const todoService = require("./todos.service");
const TodoModel = require("../models/todoModel")

Router.use(cookieParser());

Router.use(CookieAuth.CookieAuth);

Router.get("/", async (req, res) => {
    const user = res.locals.user
	const response = await todoService.getTodo(user);

    if(response.statusCode == 409){
        res.redirect("/404")
    }

    else if(response.statusCode == 404) {
        res.redirect("/404");
    }

    else if (response.statusCode == 200){
        console.log(response.todo)
        res.render("dashboard", {todos: response.todo, user: response.user});

    }
});

Router.post("/add", async (req, res) => {
    const req_body = req.body;
    const user = res.locals.user
	const response = await todoService.createTodo(user, req_body);

    if(response.statusCode == 409){
        res.redirect("/404")
    }

    else if(response.statusCode == 404) {
        res.redirect("/404");
    }

    else if (response.statusCode == 200){
        res.redirect("/dashboard")
    }

});

Router.post("/del/:req_id", async (req, res) => {
	const req_id = req.params.id;
	const user = res.locals.user;
	const response = await todoService.deleteTodo(req_id, user);

	console.log("response: ", response);

	if (response.statusCode == 422) {
		res.redirect("/404");
	} else if (response.statusCode == 406) {
		res.redirect("/404");
	} else if (response.statusCode == 200) {
		res.redirect("/dashboard");
	}
});


module.exports = Router;    