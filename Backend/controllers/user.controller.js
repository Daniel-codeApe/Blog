import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this profile"));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "The password needs to be at least six characters long"));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username shouldn't contain spaces"));
        }
        if (!req.body.username.match(/^[a-zA-z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain numbers and letters"));
        }
    }

    console.log(req.body.profileImageURL);

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profileImageURL: req.body.profileImageURL,
                password: req.body.password
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    console.log("requested user id:" + req.user.id);
    console.log("Current user id:" + req.params.userId);
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted successfully");
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has log out');
    } catch (error) {
        next(error);
    }
}