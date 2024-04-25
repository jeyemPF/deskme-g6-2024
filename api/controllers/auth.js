import User from "../models/User.js";
import { getEmailContent, emailContents, generateMailGenerator ,sendRegistrationConfirmationEmail ,sendPasswordResetEmail } from '../utils/emailService.js';
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
import crypto from 'crypto';


// REGISTER 
export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)


        const { username, email } = req.body;

        // Create a new user instance
        const newUser = new User({ username, email, password: hash});

        // Save the new user to the database    
        await newUser.save();

        // Create a Mailgen instance
        const mailGenerator = generateMailGenerator();

        // Generate email content
        const emailContent = emailContents(User.username);

         // Generate an HTML email with the provided contents
        const emailBody = mailGenerator.generate(emailContent);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        const emailText = mailGenerator.generatePlaintext(emailContent);

        // Send registration confirmation email
        const message = await sendRegistrationConfirmationEmail(email, emailBody, emailText);
        res.status(200).send(message);
    } catch (err) {
        next(err);
    }
};
// LOGIN


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email!"));
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(otherDetails);

  } catch (err) {
    next(err);
  }
};



// forgot and reset password

// Forgot Password
export const forgotPassword = async (req, res, next) => {
    const mailGenerator = generateMailGenerator();
    
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return next(createError(404, "Email not found in our system!"));

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Generate reset password email content
        const resetUrl = `http://yourwebsite.com/reset-password/${resetToken}`;
        // Inside your function where you need email content
        
        const emailContent = getEmailContent(user.username, resetUrl);
        // Use transporter to send email


        // Send reset password email
        await sendPasswordResetEmail(email, 'Reset Password', mailGenerator.generate(emailContent), mailGenerator.generatePlaintext(emailContent));
        res.status(200).send("Password reset email sent successfully");
    } catch (err) {
        next(err);
    }
};
// Reset Password
export const resetPassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // Assuming you have authenticated the user and have access to their ID

        // Retrieve the user from the database
        const user = await User.findById(userId);

        // Verify the user's current password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return next(createError(401, "Current password is incorrect"));
        }

        // Hash the new password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        // Update the user's password
        user.password = hash;
        await user.save();

        // Send success response
        res.status(200).send("Password reset successfully");
    } catch (err) {
        next(err);
    }
};
