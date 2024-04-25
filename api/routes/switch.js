import express from 'express';
import { toggleAutoAccepting } from '../controllers/switchController'; // Import the controller function

const router = express.Router();

// Define routes
router.post('/toggleAutoAccepting', toggleAutoAccepting);

export default router;
