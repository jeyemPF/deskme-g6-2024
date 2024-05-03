import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deskId: {
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
}, { timestamps: true });

export default mongoose.model('Reservation', ReservationSchema);
