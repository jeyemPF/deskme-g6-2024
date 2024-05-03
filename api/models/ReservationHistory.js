import mongoose from 'mongoose'
const { Schema } = mongoose

const ReservationHistorySchema = new Schema(
    {
        reservation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reservation",
          required: true,
        },
        
        desk: {
          type: Number,
          required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
          },
        type: {
            type: String,
            enum: ["REJECTED", "CANCELED", "COMPLETED", "EXPIRED", "ABORTED"],
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

        deskId : {
            type: Number, 
            required: true
          },

      },
      { timestamps: true }
    );

export default mongoose.model('ReservationHistory', ReservationHistorySchema)
