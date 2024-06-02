import AuditTrail from '../models/AuditTrail.js';

export const getAuditTrails = async (req, res, next) => {
    try {
        const { userId, actionType, startDate, endDate, email, roles } = req.query;

        const filter = {};
        if (userId) filter.userId = userId;
        if (email) filter.email = email;
        if (roles) filter.roles = { $in: roles.split(',') };
        if (actionType) filter.actionType = actionType;
        if (startDate && endDate) {
            filter.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        let auditTrails = await AuditTrail.find(filter)
            .populate('userId', 'email role');  // Populate email and role from the User model

        // Reverse the list of audit trails
        auditTrails = auditTrails.reverse();

        res.status(200).json(auditTrails);
    } catch (err) {
        next(err);
    }
};


export const deleteAllAuditTrails = async (req, res, next) => {
    try {
        await AuditTrail.deleteMany();
        res.status(200).json({ message: "All audit trails deleted successfully." });
    } catch (err) {
        next(err);
    }
};
