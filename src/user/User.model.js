import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true,
    }, password: {
        type: String, required: true, minLength: 8,
    }
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
})

export default mongoose.model('User', UserSchema);

