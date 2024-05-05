import express from 'express';

import { createReservation, updateReservation, deleteReservation, getReservationById, getAllReservations, approveReservations } from '../controllers/reservation.js';
import {verifyOfficeManager } from '../utils/verifyToken.js'

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


router.put('/reservations/approve', verifyOfficeManager , approveReservations);

export default router;