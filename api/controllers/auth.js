import User from "../models/User.js";
import { emailContents, generateMailGenerator ,sendRegistrationConfirmationEmail, transporter  } from '../utils/emailService.js';
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
import crypto from "crypto"


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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong password or email!'));
    }

    // Include more user details in the token payload if needed
    const tokenPayload = {
      id: user._id,
      role: user.role,
      username: user.username,
      // Add other user details here
    };

    const token = jwt.sign(tokenPayload, process.env.JWT);

    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({ user: user.toObject(), token });

  } catch (err) {
    next(err);
  }
};



// forgot and reset password

// Forgot Password Functionality

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Generate and hash the reset token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    // Set the token expiration time (10 minutes from now)
    const expiration = Date.now() + 10 * 60 * 1000;

    // Update the user's password reset token and expiration time
    user.passwordResetToken = { token: hashedToken, expiresAt: expiration };
    await user.save();

    // Generate the email message with the reset link
    const mailGenerator = generateMailGenerator();
    const link = `localhost:3000/reset-password/${token}/${user.id}`;
    var emailMessage = {
      body: {
        name: user.username,
        intro: `<p style="font-size: 14px; color: #24292e; margin-bottom: 1rem !important;">You recently requested a password reset for your account. Please use the following link to reset your password:</p><a style="padding: 1rem 1.5rem; color: white; background-color:#000000; text-decoration:none; border-radius: 3px; border: 1px solid #000000; width: max-content;display: block;margin-bottom: 1rem !important;" href=${link} target="_blank">Reset password</a><p style="font-size: 14px; color: #24292e">If you don’t use this link within 10 minutes, it will expire. To get a new password reset link, visit: <a href="http://localhost:3000/newpassword">http://localhost:3000/newpassword</a></p>`,
        outro: `<p style="font-size: 14px; color: #24292e">If you did not initiate this request or have any concerns, please contact us immediately.</p>`,
      },
    };

    let mail = mailGenerator.generate(emailMessage);

    let message = {
      from: process.env.GSERVICE,
      to: user.email,
      subject: "[DeskMe] Please reset your password",
      html: mail,
    };

    // Use transporter.sendMail instead of sendEmail
    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};



// Reset Password Functionality
export const resetPassword = async (req, res) => {
  const { token, id } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const { passwordResetToken } = user;

    // Hash the received token before comparing
    const hashedToken = await bcrypt.hash(token, 10);
    const tokenValid = await bcrypt.compare(hashedToken, passwordResetToken.token);
    const tokenExpired = passwordResetToken.expiresAt < Date.now();

    if (!tokenValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid reset token",
      });
    }

    if (tokenExpired) {
      return res.status(400).json({
        success: false,
        error: "Reset token expired",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Passwords did not match",
      });
    }

    // Add additional password validation logic here if needed

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.passwordChangedAt = Date.now();
    user.passwordResetToken = undefined;

    // Assuming sendPasswordResetSuccess function sends a success message
    sendPasswordResetSuccess(user, res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "An error occurred.",
    });
  }
};

// Validate Reset Token Functionality
export const validateResetToken = async (req, res) => {
  const { token, id } = req.params;

  try {
    console.log("Token:", token);
    console.log("ID:", id);

    const user = await User.findById(id);

    console.log("User:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // Find the user's password reset token in the database
    const passwordResetToken = user.passwordResetToken;

    console.log("Password reset token:", passwordResetToken);

    // Compare the reset token from the route parameter with the stored token
    const tokenValid = await bcrypt.compare(token, passwordResetToken.token);

    console.log("Token valid:", tokenValid);

    // Check if the reset token has expired
    const tokenExpired = passwordResetToken.expiresAt < Date.now();

    console.log("Token expired:", tokenExpired);

    if (!tokenValid || tokenExpired) {
      return res.status(400).json({
        success: false,
        error: "Invalid reset token or token has expired",
      });
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Reset token is valid",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};