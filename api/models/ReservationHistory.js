import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReservationHistorySchema = new Schema({
  reservation: {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true,
  },
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
  type: {
      type: String,
      enum: ["PENDING", "REJECTED", "CANCELED", "COMPLETED", "EXPIRED", "ABORTED"],
      required: true,
  },
}, { timestamps: true });


export default mongoose.model('ReservationHistory', ReservationHistorySchema);
