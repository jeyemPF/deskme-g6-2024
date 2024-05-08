import express from 'express';

import {deleteAllReservations, createReservation, updateReservation, deleteReservation, getReservationById, getAllReservations, approveReservations } from '../controllers/reservation.js';
import {verifyOfficeManager } from '../utils/verifyToken.js'
import { getSelf } from '../controllers/user.js';

const router = express.Router();

// Routes for reservations
router.post('/:userId/:deskId', createReservation);

// Update reservation
router.put('/:id', updateReservation);

// Delete reservation
router.delete('/:id', deleteReservation);

// Delete all reservation
router.delete('/', verifyOfficeManager, deleteAllReservations);

// Get id of reservation
router.get('/:id', getReservationById);

// get the all reservation History
router.get("/reservation-history", verifyOfficeManager, getAllReservations)

// toggle the reservation approved 
router.put('/reservations/approve', verifyOfficeManager , approveReservations);

export default router;