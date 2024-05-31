import mongoose from 'mongoose';
import { officeEquipmentEnum } from '../utils/officeEquipment.js';

const { Schema } = mongoose;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    desk: {
        type: Schema.Types.ObjectId,
        ref: 'Desk',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'STARTED', 'ABORTED'],
        default: 'PENDING',
    },
    // Additional information from the Desk schema
    deskTitle: String,
    deskArea: String,
    officeEquipment: [{
        type: String,
        enum: officeEquipmentEnum,
    }],
    feedback: {
        type: String,
        default: '',
  },
    
}, { timestamps: true });

export default mongoose.model('Reservation', ReservationSchema);
