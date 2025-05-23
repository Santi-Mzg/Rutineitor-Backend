import mongoose from 'mongoose';
import { boolean } from 'zod';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    age: {
        type: String,
        trim: true,
    },
    weight: {
        type: String,
        trim: true,
    },
    height: {
        type: String,
        trim: true,
    },
    goal: {
        type: String,
    },
    isTrainer: {
        type: Boolean,
        default: false,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);