import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/User.js";


// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {
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

// Middleware to verify JWT token from authorization header
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT);
            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(404).json({ success: false, error: "User not found" });
            }
            next();
        } catch (err) {
            return res.status(401).json({ success: false, error: "Session expired" });
        }
    } else {
        return res.status(401).json({ success: false, error: "You are not authenticated!" });
    }
};


// Higher-order middleware to check user roles
const checkRole = (roles) => (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
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

// Specific role verification middlewares
export const verifyAdmin = checkRole(['admin']);
export const verifySuperAdmin = checkRole(['superadmin']);
export const verifyAdminOrSuperAdmin = checkRole(['admin', 'superadmin']);
export const verifyOfficeManager = checkRole(['officemanager']);
