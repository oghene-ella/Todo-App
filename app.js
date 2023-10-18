// call all the modules including the config module
const express = require("express");
const connectMongo = require("./config/config");
require("dotenv").config();

// port
const PORT = process.env.PORT;

// create express app
const app = express();

// use ejs as view engine
app.set("view engine", "ejs")

// parses incoming requests with JSON payloads
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// static folder path
app.use('/public', express.static('public'));

// get sign up route
app.get("/", (req, res) => {
    res.render("sign_up")
})

// create signup
// app.post("/", async (req, res) => {
//     const data = {
//         fullname: req.body.fullname,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     }

//     const checking = await dbConnection.findOne({ fullname: req.body.fullname });

//     try {
//         await dbConnection.insertMany([data]);
//         if (
//             checking.username === req.body.username &&
//             checking.password === req.body.password
//         ) {
//             res.send("user details already exists");
//         }
//     } catch {
//         res.send("wrong inputs");
//     }

//     res.status(201).render("home");
// });

// get method for the login page
app.get("/login", (req, res) => {
	res.render("login");
});

// app.post("/login", async (req, res) => {
//     try {
//         const check = await dbConnection.findOne({ username: req.body.username })

//         if (check.password === req.body.password && check.username === req.username) {
//             res.status(201).render("home")
//         }
//         else {
//             res.send("Wrong username or password")
//         }
//     } 
    
//     catch (e) {
//         res.send("Wrong Information")
//     }
// })

// get method for the home page
app.get("/home", (req, res) => {
	res.render("index");
});

// establish connection to mongodb
connectMongo.connectMongo();

// listener
app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`);
});