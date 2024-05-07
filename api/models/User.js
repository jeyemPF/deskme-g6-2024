import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    receivingEmail: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: {
      token: {
        type: String
      },
      expiresAt: {
        type: Date
      }
    },
    avatar: {
      type: String,
      default:
        "http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg",
    },
    isDisabled: {
      type: Number,
      default: 0,
      enum: [0,1]
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin", "officemanager"],
    },
    passwordChangedAt:{
      type: Date, 
      default: null
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
