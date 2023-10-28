const express = require("express");
const Router = express.Router()
const cookieParser = require("cookie-parser");

const CookieAuth = require("../cookieAuth/Auth");
const todoService = require("./todos.service");

Router.use(cookieParser());

Router.use(CookieAuth.CookieAuth);

Router.get("/", async (req, res) => {
    const user = res.locals.user
	const response = await todoService.getTodo(user);

    if(response.statusCode == 409){
        // console.log("hey");
        // res.json({
        //     todo: null,
        //     message: response.message
        // });
        res.redirect("/404")
    }

    else if(response.statusCode == 404) {
        // console.log("hello");
        // res.json({
		// 	todo: null,
        //     message: response.message
		// });
        res.redirect("/404");
    }

    else if (response.statusCode == 200){
        // console.log("bye");
        // // res.send("say something");
        // res.json({
        //     user: response.user,
        //     message: "hi",
       // })

        console.log(response.todo)
        res.render("dashboard", {todos: response.todo, user: response.user});

    }
});

Router.post("/add", async (req, res) => {
    const req_body = req.body;
    const user = res.locals.user
	const response = await todoService.createTodo(user, req_body);

    console.log(response);

    if(response.statusCode == 409){
        // console.log("hey");
        // res.json({
        //     todo: null,
        //     message: response.message
        // });
        res.redirect("/404")
    }

    else if(response.statusCode == 404) {
        // console.log("hello");
        // res.json({
		// 	todo: null,
        //     message: response.message
		// });
        res.redirect("/404");
    }

    else if (response.statusCode == 200){
        // console.log("bye");
        // // res.send("say something");
        // res.json({
        //     user: response.user,
        //     message: "hi",
       // })
        res.redirect("/dashboard")
    }

});

module.exports = Router;    