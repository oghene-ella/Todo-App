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

    console.log(response)

    if(response.statusCode == 409){
        res.redirect("/404")
    }
    else if (response.statusCode == 500) {
        res.redirect('/404')
    }

    else {
        res.redirect('/login');
    }
})

Router.post("/login", async (req, res) => {
    const { password, username } = req.body;
    console.log(req.body)
    console.log("I got here!");

    const response = await userService.Login({
        password, username
    })

    console.log("response: ", response);

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
        res.redirect("/dashboard");
	}
})

module.exports = Router;