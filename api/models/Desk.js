import mongoose from 'mongoose';
const { Schema } = mongoose;

const DeskSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'occupied'],
        default: 'available'
    },
    features: {
        type: [String],
        required: false
    },
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    reservation: {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        required: false
    },
    floor: {
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
    },
    maintenance: {
        lastServicedDate: {
            type: Date,
            required: false
        },
        maintenanceSchedule: {
            type: String,
            required: false
        }
    }
});

export default mongoose.model('Desk', DeskSchema);
