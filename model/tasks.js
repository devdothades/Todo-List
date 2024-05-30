import mongoose, {Schema} from "mongoose";
import User from './user.js'

const TaskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    }, task: {
        type: String, required: true
    }, status: {
        type: Boolean, default: false
    }, created_at: {
        type: Date, default: Date.now
    }, updated_at: {
        type: Date, default: Date.now
    }


});

export default mongoose.model('Task', TaskSchema);