import mongoose from 'mongoose'
const { Schema } = mongoose

const ReservationSchema = new Schema(
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        desk: {
          type: Number,
          required: true
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
          required: true,
          enum: ["PENDING", "APPROVED", "REJECTED", "STARTED", "ABORTED"],
          default: "PENDING",
        },
        mode: {
          type: Number,
          required: true,
          enum : [0, 1],
          default: 0
        }
      },
      { timestamps: true }
    );

export default mongoose.model('Reservation', ReservationSchema)
