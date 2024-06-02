import mongoose from 'mongoose';
import { officeEquipmentEnum } from '../utils/officeEquipment.js'
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
        enum: ['Left wing', 'Center Wing', 'Right Wing'], // Ensure enum includes all possible areas
    }
}, { timestamps: true });


export default mongoose.model('Desk', DeskSchema);
