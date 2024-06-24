import mongoose from 'mongoose';
import { mailOtpSender } from '../utils/emailService.js';
const { Schema } = mongoose;

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, 
  },
});

// Ensure that TTL index is created
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 5 });

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailOtpSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

OtpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export default mongoose.model('Otp', OtpSchema);