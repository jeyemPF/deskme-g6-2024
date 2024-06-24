import express from "express"
import { login, register, forgotPassword, resetPassword, validateResetToken } from "../controllers/auth.js"
// import { sendLoginOTP } from "../controllers/otpController.js"

const router = express.Router()

// Register routes
router.post("/register", register )

// login routes
router.post("/login", login)

// // Verify OTP Route
//     router.post("/verify-otp", verifyOTP);

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.patch('/reset-password/:token/:id', resetPassword);

// Validate Reset Token Route
router.get('/reset-password/validate/:token/:id', validateResetToken);



// // Signup with the otp 
// router.post('/signup', registerOrSignup)


// // Send Login OTP Route
// router.post('/send-login-otp', sendLoginOTP);

// Authorize user will login to this page
// router.post('/authorize-user/login', authorizeUserLogin);




export default router   