import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password || email == "" || password == "") {
        next(errorHandler(400, "Please fill in all requried fields"));
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
        if (!isPasswordValid) {
            return next(errorHandler(400, "Password is invalid"));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie("access_token", token, {httpOnly: true}).json(rest);
    } catch (err) {
        next(err);
    }
}