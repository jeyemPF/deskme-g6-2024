import mongoose from 'mongoose'
const { Schema } = mongoose

const FloorSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    deskIds: [String], 
    isAvailable: {
        type: Boolean,
        default: true,
    },
    photos: {
        type: [String],
        required: false, 
    },
    desc: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Floor', FloorSchema)
