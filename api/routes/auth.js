import express from "express"
import { login, register, forgotPassword, resetPassword, validateResetToken } from "../controllers/auth.js"
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


// http://localhost:3000/reset-password/b32652724961b7e54cf2c9b4de3f2f2a0d1f0ce97cdf73727775967ad1791a32/6631900c660d26b1d556d6e9


export default router   