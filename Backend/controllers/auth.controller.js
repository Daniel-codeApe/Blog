import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "Please fill every required field"));
    }

    const harshedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: harshedPassword
    });

    try
    {    
        await newUser.save();
        res.json({"message": "new user registered"});
    } catch (err) {
        next(err);
    }
}