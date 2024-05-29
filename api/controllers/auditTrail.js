import AuditTrail from '../models/AuditTrail.js';

export const getAuditTrails = async (req, res, next) => {
    try {
        // You can define criteria to filter the audit trails, such as userId, actionType, etc.
        const { userId, actionType, startDate, endDate } = req.query;

        // Construct a filter object based on the provided query parameters
        const filter = {};
        if (userId) filter.userId = userId;
        if (actionType) filter.actionType = actionType;
        if (startDate && endDate) {
            filter.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Query the database for audit trails based on the filter
        const auditTrails = await AuditTrail.find(filter);

        // Return the audit trails to the client
        res.status(200).json(auditTrails);
    } catch (err) {
        // Handle errors
        next(err);
    }
};


// export const getAuditTrails = async (req, res, next) => {
//     try {
//         // Query the database for all audit trails
//         const auditTrails = await AuditTrail.find();

//         // Return the audit trails to the client
//         res.status(200).json(auditTrails);
//     } catch (err) {
//         // Handle errors
//         next(err);
//     }
// };

export const deleteAllAuditTrails = async (req, res, next) => {
    try {
        // Delete all audit trails from the database
        await AuditTrail.deleteMany();

        // Return success message
        res.status(200).json({ message: "All audit trails deleted successfully." });
    } catch (err) {
        // Handle errors
        next(err);
    }
};