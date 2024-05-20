import express from "express"
import { login, register, forgotPassword, resetPassword, validateResetToken, registerOrSignup } from "../controllers/auth.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

// Register routes
router.post("/register", register )

// login routes
router.post("/login", login)

// Forgot Password Route
router.post('/forgot-password', verifyToken, forgotPassword);

// Reset Password Route
router.patch('/reset-password/:token/:id', resetPassword);

// Validate Reset Token Route
router.get('/reset-password/validate/:token/:id', validateResetToken);

// Signup with the otp 
router.post('/signup', registerOrSignup)




export default router   