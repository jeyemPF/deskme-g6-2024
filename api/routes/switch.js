import express from 'express';
import { toggleAutoAccepting, getSwitchState } from '../controllers/switch.js'; // Import the controller function

const router = express.Router();

router.post('/toggleAutoAccepting', toggleAutoAccepting);

router.get('/getSwitchState', getSwitchState);

export default router;
