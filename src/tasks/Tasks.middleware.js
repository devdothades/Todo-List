import {body} from 'express-validator';

const validate = [
    body('task')
        .notEmpty().withMessage("Task should not be empty")
        .blacklist(" ")
        .isString()
]

export default validate;