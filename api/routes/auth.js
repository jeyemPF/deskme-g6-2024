import express from "express"
import { login, register, forgotPassword, resetPassword } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register )
router.post("/login", login)
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password/:userId", resetPassword)




export default router   