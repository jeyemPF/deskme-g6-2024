import express from 'express';
import { toggleAutoAccepting, getSwitchState } from '../controllers/switch.js';
import { verifyOfficeManager } from '../utils/verifyToken.js';

const router = express.Router();

// Route for toggling auto-accepting and approving reservations if enabled
router.put('/',verifyOfficeManager, toggleAutoAccepting);

// Route for getting the current state of the auto-accepting switch
router.get('/switch/state', getSwitchState);

export default router;
