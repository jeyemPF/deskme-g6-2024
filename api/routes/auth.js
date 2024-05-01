    import express from "express"
    import { login, register, forgotPassword, resetPassword, validateResetToken } from "../controllers/auth.js"
    import { verifyToken } from "../utils/verifyToken.js"

    const router = express.Router()

    router.post("/register", register )
    router.post("/login", login)

    // Forgot Password Route
    router.post('/forgot-password', verifyToken, forgotPassword);

    // Reset Password Route
    router.patch('/reset-password/:token/:id', resetPassword);

    // Validate Reset Token Route
    router.get('/reset-password/validate/:token/:id', validateResetToken);





    export default router   