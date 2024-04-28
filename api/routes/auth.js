import express from "express"
import { login, register, forgotPassword, resetPassword, validateResetToken } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register )
router.post("/login", login)


// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token/:id', resetPassword);

// Validate Reset Token Route
router.get('/validate-reset-token/:token/:id', validateResetToken);





export default router   