import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.configDotenv()
/**
 * Middleware function for authentication.
 * @async
 * @function Auth
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const Auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        console.log('decoded token: ', token)
        next()
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }

}
/**
 * Exporting the Auth middleware function.
 */
export default Auth


