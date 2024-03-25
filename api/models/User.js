import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: false, 
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
    
},{timestamps:true});

export default mongoose.model('User', UserSchema)
