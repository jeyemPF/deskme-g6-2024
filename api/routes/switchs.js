import express from 'express';
import { toggleAutoAccepting } from '../controllers/switch.js';
// import { verifyOfficeManager } from '../utils/verifyToken.js';

const router = express.Router();

// Route for toggling auto-accepting and approving reservations if enabled
router.put('/switch-approve', toggleAutoAccepting);



export default router;
