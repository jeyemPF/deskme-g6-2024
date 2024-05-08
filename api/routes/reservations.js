import express from 'express';

import {deleteAllReservations, createReservation, getAllReservations, approveReservations, cancelReservation } from '../controllers/reservation.js';
import {verifyOfficeManager } from '../utils/verifyToken.js'

const router = express.Router();

// Routes for reservations
router.post('/:userId/:deskId', createReservation);

// cancel reservation
router.delete('/cancel-reservation/:reservationId' , cancelReservation);

// Delete all reservation
router.delete('/', verifyOfficeManager, deleteAllReservations);

// get the all reservation History
router.get("/reservation-history", verifyOfficeManager, getAllReservations)

// toggle the reservation approved 
router.put('/reservations/approve', verifyOfficeManager , approveReservations);

export default router;