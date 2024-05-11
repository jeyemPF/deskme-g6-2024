import AuditTrail from '../models/AuditTrail.js';

export const login = async (req, res, next) => {
    try {
        // Your existing login code here...

        // Log the login action
        await AuditTrail.create({
            actionType: 'login',
            userId: user._id,
            ipAddress: req.ip
        });

        res.cookie('access_token', token, {
            httpOnly: true,
        }).status(200).json({ user: user.toObject(), token });

    } catch (err) {
        next(err);
    }
};
