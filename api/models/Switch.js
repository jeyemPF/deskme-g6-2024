import mongoose from 'mongoose';
const { Schema } = mongoose;

const SwitchSchema = new Schema({
    autoAccepting: {
        type: Boolean,
        required: true,
        default: false
    }
});

export default mongoose.model('Switch', SwitchSchema);
