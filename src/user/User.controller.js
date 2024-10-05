import UserSchema from "./User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.configDotenv();


const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserSchema.findOne({username});

        if (!user) {
            res.status(401).send({status: 'fail', message: "user is not registered"})
        }

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            res.status(401).send({status: 'fail', message: "incorrect password"})
        }

        const token = jwt.sign({
            userID: user._id
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({token: token})


    } catch (error) {
        res.status(400).json({
            status: 'fail', message: error.message
        });
    }

}


const register = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await UserSchema.create({username, password});

        user ? res.status(200).json({success: user}) : res.status(400).json({error: "Username or password is required"});

    } catch (error) {
        res.status(400).json({
            status: 'fail', message: error.message
        });
    }

}

export {login, register};