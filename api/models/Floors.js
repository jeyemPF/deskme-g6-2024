import mongoose from 'mongoose';
const { Schema } = mongoose;

const FloorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Floor', FloorSchema);
