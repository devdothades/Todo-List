import {body} from 'express-validator';
import UserSchema from "./User.model.js";

const userValidation = [

    body('username')
        .trim()
        .blacklist(' ')
        .notEmpty()
        .withMessage('Username is required.')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long.')
        .customSanitizer((val) => {
            if (val) return val.toLowerCase();
        })
        .custom(async (val) => {
            const user = await UserSchema.findOne({ username: val });
            if (user) throw new Error('Username already exist.');
            return true;
        }),
    body('password')
        .trim()
        .blacklist(' ')
        .notEmpty()
        .isLength({min: 8}).withMessage('Password should be greater than 8 characters ')

]

export default userValidation;