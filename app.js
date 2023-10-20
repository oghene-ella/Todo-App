// call all the modules including the config module
const express = require("express");
const connectMongo = require("./config/config");
require("dotenv").config();

const SignUpMiddleware = require("./middleware/signUpMiddleware");
const LoginMiddleware = require("./middleware/loginMiddleware");
const todoRouter = require("./routes/todoRoute")

// port
const PORT = process.env.PORT;

// create express app
const app = express();

// use ejs as view engine
app.set("view engine", "ejs")

// parses incoming requests/data to JSON payloads
app.use(express.json())

app.use(express.urlencoded({ extended: false }))


// static folder path
app.use('/public', express.static('public'));

// get sign up route
app.get("/", (req, res) => {
    res.render("sign_up")
})
// create signup
app.post("/", SignUpMiddleware.signUp);


// get method for the login page
app.get("/login", (req, res) => {
	res.render("login");
});

// login as a user
app.post("/login", LoginMiddleware.login)


// get method for the home page
app.get("/home", (req, res) => {
	res.render("index");
});

app.use("/todo", todoRouter);

// establish connection to mongodb
connectMongo.connectMongo();

// listener
app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`);
});