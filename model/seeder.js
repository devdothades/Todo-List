import UserSchema from "./user.js";
import mongoose from "mongoose";
import TaskSchema from "./tasks.js";

mongoose.connect('mongodb://localhost:27017/TODOLIST')
    .then(() =>{
        console.log('connected')
    }).catch((e) =>{
        console.log(e)
})

async function seedDB() {
    try {
        // Clear existing data
        await UserSchema.deleteMany({});


        console.log('Database seeded successfully');

    } catch (err) {
        console.error('Error seeding database:', err);

    }
}

seedDB()
