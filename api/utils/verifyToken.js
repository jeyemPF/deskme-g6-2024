import jwt from "jsonwebtoken";
import { createError } from "./error.js";


// Middleware to verify JWT token
export const verifyToken = (req, _res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"));
        }
        req.user = user;
        next();
    });
};

// Middleware to check if user is an admin
export const verifyAdmin = (req, _res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return next(createError(403, "You are not authorized to access this resource as an admin"));
    }
    next();
};

// Middleware to check if user is a super admin
export const verifySuperAdmin = (req, _res, next) => {
    if (!req.user || req.user.role !== "superadmin") {
        return next(createError(403, "You are not authorized to access this resource as a super admin"));
    }
    next();
};

export const verifyAdminOrSuperAdmin = (req, _res, next) => {
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
        return next(createError(403, "You are not authorized to access this resource as an admin or super admin"));
    }
    next();
};
