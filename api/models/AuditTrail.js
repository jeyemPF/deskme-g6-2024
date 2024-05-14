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
    deskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Desk'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: String,
    details: Object  
});

const AuditTrail = mongoose.model('AuditTrail', AuditTrailSchema);

export default AuditTrail;
