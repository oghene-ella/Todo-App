const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SignUp = async ({ fullname, password, email, username }) => {
    try {
        // check existing user
        const checkExistingUser = await UserModel.findOne({ username: username });
        
        if (checkExistingUser) {
            return {
                statusCode: 409,
                message: "Username already exists",
                success: false,
            };
        }
        
        const checkExistingEmail = await UserModel.findOne({ email: email });

        if (checkExistingEmail) {
            return {
                statusCode: 409,
                message: "Email already exists",
                success: false,
            };
        }

        const newUser = await UserModel.create(
            {
                fullname: fullname,
                email: email,
                username: username,
                password: password,
            }
        );

        const token = jwt.sign(
            { _id: newUser._id, username: newUser.username },
            process.env.JWT_TOKEN,
        );

        return {
            statusCode: 201,
            message: "User Created Successfully",
            success: true,
            newUser, 
            token
        }

	}
    catch(err) {
        return {
            statusCode: 500,
            message: "Something went wrong, go home",
            success: false,
        };
    }
};

const Login = async ({username, password}) => {
    try {
        const existingUser = await UserModel.findOne({
            username: username,
        });
        
        if (!existingUser) {
            return {
                statusCode: 404,
                message: "Invalid Username or Password",
                success: false,
            };
}
        
        const validatePassword = await existingUser.isValidPassword(password);
    
        if (!validatePassword) {
            return {
                statusCode: 422,
                message: "Incorrect Email or Password",
                success: false,
            };
        }
        const token = jwt.sign(
            {
                username: existingUser.username,
                _id: existingUser._id,
            },
            process.env.JWT_TOKEN,
            { expiresIn: "1h" },
        );

        return {
            statusCode: 200,
            message: "Login was successful",
            user: existingUser.username,
            token,
            success: true,
        };
    } catch (error) {
        return {
            statusCode: 401,
            message: "Unauthorized User",
            success: false,
        };
    }
};
module.exports = {
	SignUp,
	Login,
};