import mongoose from 'mongoose';
import { officeEquipmentEnum } from '../utils/officeEquipment.js';
const { Schema } = mongoose;

const DeskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'unavailable'],
        default: 'available'
    },
    officeEquipment: {
        type: [String],
        enum: officeEquipmentEnum,
    },
    area: {
        type: String,
        enum: ['Left wing', 'Center Wing', 'Right Wing'],
    },
    image: {
        type: String, // Assuming you store the image path or URL
        default: 'https://res.cloudinary.com/dihmqs39z/image/upload/v1719247450/pzhlpuvjxfgk8k5sxwy5.jpg' 
    }
}, { timestamps: true });

export default mongoose.model('Desk', DeskSchema);
