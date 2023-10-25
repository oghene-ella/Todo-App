const userService = require("./user.service");
const Router = require("express").Router();
const cookieParser = require("cookie-parser");

const CookieAuth = require("../cookieAuth/Auth")

Router.use(cookieParser());

Router.post("/signup", async (req, res) => {
    const { fullname, password, email, username } = req.body;

    const response = await userService.SignUp({
        fullname, password, email, username
    })

    if(response.statusCode == 409){
        res.redirect("/404")
    }
    else if (response.statusCode == 500) {
        res.redirect('/404')
    }

    else {
        console.log("hello!");
        res.redirect('/login');
    }
})

Router.post("/login", async (req, res) => {
    const { password, username } = req.body;

    const response = await userService.Login({
        password, username
    })

    if(response.statusCode == 404){
        res.redirect("/404")
    }
    else if (response.statusCode == 422) {
		res.redirect("/404");
	} 
    else if (response.statusCode == 401) {
		res.redirect("/404");
	} 
    else {
        res.cookie("jwt", response.token)
        res.redirect("/dashboard/todos");
	}
})

module.exports = Router;