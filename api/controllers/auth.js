import User from "../models/User.js";
import transporter from "../utils/emailService.js";
import Mailgen from "mailgen";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
import crypto from 'crypto';


// REGISTER 
export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)


        const { username, email, password } = req.body;

        // Create a new user instance
        const newUser = new User({ username, email, password: hash});

        // Save the new user to the database
        await newUser.save();

        // Create a Mailgen instance
        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                // Your product name or logo
                name: "DeskMe",
                link: "https://example.com/",
                // Optional product logo
                // logo: "https://mailgen.js/img/logo.png"
            }
        });
        

        // Generate email content
        const emailContent = {
            body: {
                name: username, // Change this to emailContent.body.name
                intro: 'Welcome to DeskMe! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with DeskMe, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: 'https://deskme.com/confirm?s=d9729feb74992cc3482b350163a1a010'
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };
        

        // Generate an HTML email with the provided contents
        const emailBody = mailGenerator.generate(emailContent);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        const emailText = mailGenerator.generatePlaintext(emailContent);

        // Send registration confirmation email
        await transporter.sendMail({
            from: 'deskmecompany@gmail.com',
            to: email,
            subject: 'Registration Confirmation',
            html: emailBody, // HTML content
            text: emailText // Plaintext content
        });

        // Send a success response
        res.status(200).send("User has been created");
    } catch (err) {
        // Handle errors`
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "Email doesn't exist in our system!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) 
        return next(createError(400, "Wrong password or email!"));

        const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.
        cookie("access_token", token,{
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails});

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};


// forgot and reset password



// Forgot Password
export const forgotPassword = async (req, res, next) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            // Your product name or logo
            name: "DeskMe",
            link: "https://example.com/",
            // Optional product logo
            // logo: "https://mailgen.js/img/logo.png"
        }
    });
    
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
        const emailContent = {
            body: {
                name: user.username,
                intro: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#22BC66',
                        text: 'Reset your password',
                        link: resetUrl
                    }
                },
                outro: 'If you did not request this, please ignore this email and your password will remain unchanged.'
            }
        };

        // Send reset password email
        await transporter.sendMail({
            from: 'deskmecompany@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: mailGenerator.generate(emailContent), // Use mailGenerator here
            text: mailGenerator.generatePlaintext(emailContent) // Use mailGenerator here
        });

        // Send success response
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
