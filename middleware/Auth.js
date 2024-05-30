import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.configDotenv()

export const Auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({error: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log('decoded token: ', token)
        next()
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }

}

export default Auth


