import mongoose from 'mongoose';

const auditTrailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    email: String,
    eventType: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["success", "failed"]
    },
    additionalContext: String,
    clientLocation: String,
    userAgent: String
}, { timestamps: true });

export default mongoose.model('AuditTrail', auditTrailSchema);
