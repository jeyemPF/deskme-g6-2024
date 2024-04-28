import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// Middleware to verify JWT token
export const verifyToken = (req, _res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"));
        }
        req.user = user;
        next();
    });
};

// Middleware to check if user is authorized
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role) {
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
};


// Middleware to check if user is an admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user is authenticated and has the "admin" role
        if (req.user && req.user.role === 'admin') {
            next(); // User is authorized as admin, proceed to the next middleware
        } else {
            // User is not authorized as admin, return a 403 Forbidden error
            return next(createError(403, "You are not authorized as admin"));
        }
    });
};

// Middleware to check if user is a super admin
export const verifySuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user is authenticated and has the "superadmin" role
        if (req.user && req.user.role === 'superadmin') {
            next(); // User is authorized as superadmin, proceed to the next middleware
        } else {
            // User is not authorized as superadmin, return a 403 Forbidden error
            return next(createError(403, "You are not authorized as superadmin"));
        }
    });
};

// Middleware to check if user is an admin or super admin
export const verifyAdminOrSuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user is authenticated and has either "admin" or "superadmin" role
        if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
            next(); // User is authorized as admin or superadmin, proceed to the next middleware
        } else {
            // User is not authorized as admin or superadmin, return a 403 Forbidden error
            return next(createError(403, "You are not authorized as admin or superadmin"));
        }
    });
};