import User from "../models/User.js";
import bcrypt from "bcryptjs"
// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
        next(err);
    }
};

// GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getUsers = async (_req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};


// DELETE ALL USERS EXCEPT SUPERADMIN

export const deleteAllUser = async (req, res, next) => {
    try {
        // Step 1: Find the super admin user
        const superAdmin = await User.findOne({ role: 'superadmin' });
        if (!superAdmin) {
            return res.status(404).json({ message: "Super admin not found" });
        }

        // Step 2: Delete all users except the super admin
        await User.deleteMany({ _id: { $ne: superAdmin._id } });

        res.status(200).json({ message: "All users (except super admin) have been deleted" });
    } catch (err) {
        next(err);
    }
};

// CREATE
export const createAdminUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new User({
            username,
            email,
            password: hashedPassword,
            role: 'admin' 
        });

        // Save the new admin user to the database
        await newAdmin.save();

        res.status(201).json({ message: "Admin user created successfully" });
    } catch (err) {
        // Handle errors
        next(err);
    }
};


export const createOfficeManager = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new office manager user
        const newOfficeManager = new User({
            username,
            email,
            password: hashedPassword,
            role: 'officemanager' 
        });

        // Save the new office manager user to the database
        await newOfficeManager.save();

        res.status(201).json({ message: "Office Manager user created successfully" });
    } catch (err) {
        // Handle errors
        next(err);
    }
};
