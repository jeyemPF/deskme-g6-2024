import express from 'express';

import { createReservation, updateReservation, deleteReservation, getReservationById, getAllReservations } from '../controllers/reservation.js';

const router = express.Router();

// Routes for reservations
router.post('/:userId/:deskId', createReservation);

// Update reservation
router.put('/:id', updateReservation);

// Delete reservation
router.delete('/:id', deleteReservation);

// Get id of reservation
router.get('/:id', getReservationById);

// Get all reservation
router.get('/', getAllReservations);

export default router;