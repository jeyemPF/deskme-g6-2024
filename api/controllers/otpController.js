import otpGenerator from 'otp-generator';
import Otp from '../models/OTP.js'; // Import your OTP model
import User from '../models/User.js'; // Import your User model
import { mailOtpSender } from '../utils/emailService.js'; // Import your mail sender function

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP to the database
    await Otp.create({ email, otp });

    // Send OTP to user's email
    await mailOtpSender(
      email,
      'Your OTP for Verification',
      `Your OTP is: ${otp}`
    );

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const sendLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await Otp.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp });
    }

    const otpPayload = { email, otp };
    await Otp.create(otpPayload);

    await mailOtpSender(
      email,
      'Login Verification OTP',
      `<h1>Login OTP Verification</h1><p>Your OTP code is: ${otp}</p>`
    );

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
