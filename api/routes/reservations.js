import express from 'express';

import {deleteAllReservations, createReservation, getAllReservations, approveReservations, cancelReservation, getReservationCount, getAvailableDeskCount, getPendingReservations, getPendingReservationsCount, addFeedback, getReservationFeedback, getUserBookingHistory, countUserReservations } from '../controllers/reservation.js';
import {protect, verifyOfficeManager, verifyUser } from '../utils/verifyToken.js'

const router = express.Router();

// Routes for reservations
router.post('/book/:deskId', protect, createReservation);
router.post('/reservations/:deskId', createReservation);    

// cancel reservation
router.delete('/cancel-reservation/:reservationId' , cancelReservation);

// Delete all reservation
router.delete('/delete-my-reservation/', verifyOfficeManager, deleteAllReservations);

// get the all reservation History
router.get("/reservation-history", getAllReservations)

// toggle the reservation approved 
router.put('/reservations/approve', verifyOfficeManager , approveReservations);

// get the count of reservations
router.get("/count-reservation", getReservationCount);

// get the count of desk who status of available
router.get("/available-desk", getAvailableDeskCount)

// Get all pendings bookings
router.get("/get-pendings-bookings", getPendingReservations)

// Counts pending bookings
router.get("/pending-counts", getPendingReservationsCount)

// add feedback
router.post("/:reservationId", addFeedback);

router.get('/:reservationId', getReservationFeedback); 

router.get('/my-booking-history/:userId', protect, getUserBookingHistory);

router.get("/self-count-reservations/:userId", protect, countUserReservations);



export default router;