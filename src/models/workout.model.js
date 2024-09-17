import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    isometric: {
        type: Boolean,
        default: false,
        required: true,
        trim: true
    },
    weighted: {
        type: Boolean,
        default: false,
        required: true,
    },
    volume: {
        type: mongoose.Schema.Types.Mixed ,
        default: 10,
        required: true,
        trim: true
    },
    weight: {
        type: mongoose.Schema.Types.Mixed ,
        default: null,
        trim: true
    }
});

const blockSchema = new mongoose.Schema({
    series: {
        type: Number,
        default: 3,
        required: true,
        trim: true
    },
    exerciseList: [exerciseSchema]
});

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    blockList: [blockSchema]
}, {
    timestamps: true
});

workoutSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('Workout', workoutSchema);