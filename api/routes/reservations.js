import express from 'express';

import { createReservation, updateReservation, deleteReservation, getReservationById, getAllReservations } from '../controllers/reservation.js';

const router = express.Router();

// Routes for reservations
router.post('/:userId/:deskId', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.get('/:id', getReservationById);
router.get('/', getAllReservations);

export default router;
