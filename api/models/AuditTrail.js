import mongoose from 'mongoose';

const AuditTrailSchema = new mongoose.Schema({
    actionType: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: String,
    details: Object  // Any additional details you want to log
});

const AuditTrail = mongoose.model('AuditTrail', AuditTrailSchema);

export default AuditTrail;
