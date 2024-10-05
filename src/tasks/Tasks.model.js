import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    task: {
        type: String, required: true,
    }, status: {
        type: Boolean, default: false, required: true,
    }

}, {timestamps: true});

export default mongoose.model('Task', TaskSchema);