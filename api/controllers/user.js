import User from "../models/User.js";
import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "express-async-handler";
import server from "../index.js";



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
export const getSelf = async (req, res, next) => {
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

// CREATING A ADMIN USER
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

// CREATING OFFICER MANAGERS
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
        next(err);
    }
};

// UPLOAD AVATARS FOR USER
export const uploadAvatar = async function (req, res, next) {
  try {
    console.log('Received avatar upload request:', req.file); // Log uploaded file details
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Retrieve the user ID from the authenticated user's token or session
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Upload the avatar to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update the user's avatar URL in the database
    user.avatar = result.url;

    // You can also update other user details like role and username here
    // For example, assuming you have these properties in the request body:
    // user.role = req.body.role;
    // user.username = req.body.username;
    
    // Save the user with updated avatar and other details
    await user.save();

    console.log('Avatar uploaded successfully:', result); // Log Cloudinary upload result

    // Emit an event to notify about the avatar update
    server.emit('avatarUpdated', { userId: user._id, avatar: result.url, username: user.username, role: user.role });

    res.status(200).json({ message: 'Avatar has been uploaded', avatarUrl: result.url });
  } catch (err) {
    console.error('Error uploading avatar:', err.message); // Log error message
    next(err);
  }
};



export const updateProfile = async (req, res) => {
  const { username } = req.body;

  // Ensure the user is authenticated and the user ID is available
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }

  try {
    // Fetch the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Validate the new username
    const usernameRegex = /^[a-zA-Z_]+$/;
    if (username && !usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        error: "Invalid username",
      });
    }

    // Update the username if provided
    if (username) {
      user.username = username;
    }

    // Upload the avatar if provided
    if (req.file) {
      // Upload the avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update the user's avatar URL in the database
      user.avatar = result.url;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ success: true, user, message: "Profile updated successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error updating profile",
    });
  }
};
    // export const updateUserEmailPreference = async (req, res, next) => {
    //     try {
    //     const { id } = req.params;
    //     const { receivingEmail } = req.body;
    
    //     const updatedUser = await User.findByIdAndUpdate(id, { receivingEmail }, { new: false });
    
    //     res.status(200).json(updatedUser);
    //     } catch (error) {
    //     next(error);
    //     }
    // };

    export const updateAllUsersEmailPreference = async (req, res, next) => {
        try {
          const { receivingEmail } = req.body;
      
          // Update all users' email preference
          await User.updateMany({}, { receivingEmail });
      
          res.status(200).json({ message: "Email preference updated for all users" });
        } catch (error) {
          next(error);
        }
      };


    export const toggleReservationEmailNotifications = async (req, res, next) => {
        try {
          const { userId } = req.params;
      
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Toggle the user's receiveReservationEmails field
          user.receiveReservationEmails = !user.receiveReservationEmails;
          await user.save();
      
          const status = user.receiveReservationEmails ? "enabled" : "disabled";
          res.status(200).json({ message: `Email notifications for reservations ${status}` });
        } catch (error) {
          next(error);
        }
      };


    // Toggle email notifications for reservations for all users
    export const toggleReservationEmailNotificationsForAllUsers = async (req, res, next) => {
        try {
          // Find all users
          const users = await User.find();
      
          // Get the current status of email notifications
          const currentStatus = users[0].receiveReservationEmails;
      
          // Determine the new status by toggling the current status
          const newStatus = !currentStatus;
      
          // Update the receiveReservationEmails field for all users
          await User.updateMany({}, { receiveReservationEmails: newStatus });
      
          res.status(200).json({ message: `Email notifications for reservations for all users ${newStatus ? 'enabled' : 'disabled'}` });
        } catch (error) {
          next(error);
        }
      };