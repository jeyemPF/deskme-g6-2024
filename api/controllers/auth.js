import User from "../models/User.js";
import transporter from "../utils/emailService.js";
import Mailgen from "mailgen";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";

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


export const login = async (req, res, next) => {
    try{
        const user = User.findOne({username:req.body.username})
        if(!user) return next (createError())
        res.status(200).send("User has been created.");
    }catch (err){
        next(err);
    }
};