import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    endpoint: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    expirationTime: {
        type: Number,
    },
    p256dh: {
        type: String,
        trim: true,
    },
    auth: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Subscription', subscriptionSchema);