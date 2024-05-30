import UserSchema from "../model/user.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";


const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await UserSchema.create({
            email: req.body.email,
            password: hashedPassword
        })
        const success = await user.save()
        res.status(200).json(success)
    }catch (e) {
        console.error('Error', e)
        res.status(500).json({e: 'An error occurred'})
    }
}

const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({ status: 'ok', token });
        } else {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ status: 'error', error: 'An error occurred during login' });
    }
};

export {signup, login};