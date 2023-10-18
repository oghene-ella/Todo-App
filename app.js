const express = require("express");
const Todo_App_db = require("./dbConnect")

const app = express();

app.set("view engine", "ejs")

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/public', express.static('public'));

app.get("/", (req, res) => {
    res.render("sign_up")
})
app.post("/", async (req, res) => {
    const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    const checking = await Todo_App_db.findOne({ fullname: req.body.fullname });

    try {
        await Todo_App_db.insertMany([data]);
        if (
            checking.username === req.body.username &&
            checking.password === req.body.password
        ) {
            res.send("user details already exists");
        }
    } catch {
        res.send("wrong inputs");
    }

    res.status(201).render("home");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const check = await Todo_App_db.findOne({ username: req.body.username })

        if (check.password === req.body.password && check.username === req.username) {
            res.status(201).render("home")
        }
        else {
            res.send("Wrong username or password")
        }
    } 
    
    catch (e) {
        res.send("Wrong Information")
    }
})

app.get("/home", (req, res) => {
	res.render("index");
});

app.listen(3000)