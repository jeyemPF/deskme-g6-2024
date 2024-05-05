// models/Floor.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const FloorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desks: [{ type: Schema.Types.ObjectId, ref: 'Desk' }] // Array of desk references
}, { timestamps: true });

export default mongoose.model('Floor', FloorSchema);
