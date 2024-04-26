import express from 'express';
import { toggleAutoAccepting, getSwitchState } from '../controllers/switch.js'; 

const router = express.Router();

router.post('/toggleAutoAccepting', toggleAutoAccepting);

router.get('/getSwitchState', getSwitchState);

export default router;
