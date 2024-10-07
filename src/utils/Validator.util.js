import {validationResult} from "express-validator";

const ValidatorUtil = (req, res, next) => {
    const errors = validationResult(req);

    // if there are no errors, continue to the next middleware
    if(errors.isEmpty()) {
        return next();
    }

    const extractErrors = []

    errors.array().map((err) => extractErrors.push({ [err.param]: err.msg }));
    console.log(extractErrors);

    return res.status(500).json({
        errors: extractErrors
    })
}

export default ValidatorUtil;