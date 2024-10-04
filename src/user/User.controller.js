import UserSchema from "./User.model.js";


const login = async (req, res) => {
}


const register = async (req, res) => {
    try {
        // Extract user data from the request body
        const {username, password} = req.body;
        // Create a new user instance
        const newUser = new UserSchema({username, password});
        console.log("1");
        // Save the new user to the database (this will trigger the pre-save hook)
        const savedUser = await newUser.save();
        console.log("2");
        // Send a success response
        res.status(201).json({
            status: 'success',
            data: {
                user: savedUser
            }
        });
        console.log("3");
    } catch (error) {
        // Handle errors, like validation or uniqueness violations
        console.log("4");
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }


}

export {login, register};