import mongoose, {Schema} from "mongoose";

const TaskSchema = new Schema({
    task: {
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