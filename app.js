// call all the modules including the config module
const express = require("express");
const connectMongo = require("./config/config");
require("dotenv").config();

const UsersRouterHandler = require("./users/user.route");
const TodoRouteHandler = require("./todos/todo.routes")

// port
const PORT = process.env.PORT;

// create express app
const app = express();

// use ejs as view engine
app.set("view engine", "ejs")
app.set("views", "views")

// parses incoming requests/data to JSON payloads
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// static folder path
app.use('/public', express.static('public'));


// get index route
app.get("/", (req, res) => {
    res.render("index")
})

// get signup page
app.get("/signup", (req, res) => {
	res.render("signup");
});

// get method for the login page
app.get("/login", (req, res) => {
	res.render("login");
});

// get method for the 404 page
app.get("/404", (req, res) => {
	res.render("404");
});
// // get method for the dashboard page
// app.get("/dashboard", (req, res) => {
// 	res.render("dashboard");
// });


// use users routes
app.use("/users", UsersRouterHandler);
app.use("/dashboard", TodoRouteHandler)

// logout
app.get("/logout", (req, res) => {
	res.clearCookie("jwt");
	res.redirect("/");
})

// error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		data: null,
		error: "Server Error",
	});
});

// get other invalid routes
app.get("*", (req, res) => {
	res.redirect("/404");
});

// establish connection to mongodb
connectMongo.connectMongo();

// listener
app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`);
});