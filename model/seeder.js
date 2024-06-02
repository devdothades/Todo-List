import UserSchema from "./user.js";
import mongoose from "mongoose";

// Connect to MongoDB database
//REPLACE THE URI WITH YOUR MONGODB URL, since dotenv is not working for this.
mongoose.connect('mongodb://localhost:27017/TODOLIST')
    .then(() => {
        console.log('connected')
    }).catch((e) => {
    console.log(e)
})

/**
 * Seed the database with initial data.
 * @async
 * @function seedDB
 * @returns {Promise<void>}
 */
async function seedDB() {
    try {
        // Clear existing data
        await UserSchema.deleteMany({});


        console.log('Database seeded successfully');

    } catch (err) {
        console.error('Error seeding database:', err);

    }
}

// Call the seedDB function to seed the database
seedDB()
