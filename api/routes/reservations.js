import express from 'express';

import {deleteAllReservations, createReservation, updateReservation, deleteReservation, getReservationById, getAllReservations, approveReservations } from '../controllers/reservation.js';
import {verifyOfficeManager } from '../utils/verifyToken.js'

const router = express.Router();

// Routes for reservations
router.post('/:userId/:deskId', createReservation);

// Update reservation
router.put('/:id', updateReservation);

// Delete reservation
router.delete('/:id', deleteReservation);

router.delete('/', verifyOfficeManager, deleteAllReservations);

// Get id of reservation
router.get('/:id', getReservationById);


router.get("/reservation-history", verifyOfficeManager, getAllReservations)


router.put('/reservations/approve', verifyOfficeManager , approveReservations);

export default router;