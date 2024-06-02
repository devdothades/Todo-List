import UserSchema from "../model/user.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

/**
 * Sign up a new user.
 * @async
 * @function signup
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const signup = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!validator.isEmail(email)) {
        return res.status(406).json({e: "Invalid Email Address!"})
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(406).json({e: "Password is Weak!"})
    }

    try {
        const hash = await bcrypt.hash(password, 10)
        const user = await UserSchema.create({email, password: hash})
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json({e: "Bad Request", details: e.message});
    }

})

/**
 * Log in a user.
 * @async
 * @function login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const login = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!validator.isEmail(email)) {
            return res.status(406).json({e: "Invalid Email Address!"})
        }

        const findUser = await UserSchema.findOne({email: email})

        if (!findUser) {
            return res.status(406).json({e: "Incorrect Password or Invalid Account"})
        }

        const userPass = findUser.password

        const matchedPassword = bcrypt.compare(password, userPass)

        if (matchedPassword) {
            const token = await jwt.sign({id: findUser._id, email: email}, process.env.JWT_SECRET)
            res.status(200).json(token)
        }
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({status: 'error', error: 'An error occurred during login'});
    }

});

/**
 * Exporting the user controller functions.
 */
export {signup, login};