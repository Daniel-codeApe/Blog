import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../util/error.js";

export const register = async (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "Please fill in all required fields"));
    }

    const harshedpassword = bcryptjs(password, 10);

    const newUser = new User ({
        username,
        email,
        password: harshedpassword
    });

    try {
        await newUser.save();
        console.log("new user registered");
    } catch (err) {
        next(err);
    }
}