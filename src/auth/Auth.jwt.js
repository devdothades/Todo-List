import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserSchema from "../user/User.model.js";

dotenv.configDotenv();

const verifyJwt = async (req, res, next) => {

    const getToken = req.headers.authorization;

    if (!getToken || !getToken.startsWith('Bearer ')) {
        throw new Error("Token is undefined or Token is Missing");
    }

    const token = getToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserSchema.findById(decoded.userID);

        if (!user) {
            return res.status(401).json({message: "Invalid token or user not found"});
        }

        req.user = user;
        next()
    } catch (err) {
        return res.status(403).json({message: "Invalid or expired token"});
    }


}

export default verifyJwt;