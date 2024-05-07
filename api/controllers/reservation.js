import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";
import { scheduleJob } from 'node-schedule';
import { sendReservationConfirmationEmail, getEmailContentReservation } from "../utils/emailService.js";

export const createReservation = async (req, res, next) => {
    try {
        const { userId, deskId } = req.params;
        const { date, startTime, endTime } = req.body;

        // Find the user and desk based on their IDs
        const user = await User.findById(userId);
        const desk = await Desk.findById(deskId);

        // Check if user and desk exist
        if (!user || !desk) {
            return res.status(404).json({ message: "User or desk not found" });
        }

        // Check if the desk is already reserved during the requested time slot
        const existingReservation = await Reservation.findOne({
            desk: desk,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping time slot
                { startTime: { $gte: startTime, $lt: endTime } }, // Start time within the requested time slot
                { endTime: { $gt: startTime, $lte: endTime } } // End time within the requested time slot
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: "The desk is already reserved for the requested time slot" });
        }

        // Check if the desk's status is 'reserved'
        if (desk.status === 'reserved') {
            return res.status(400).json({ message: "The desk is currently reserved" });
        }

        // Update the desk's status to 'reserved'
        desk.status = 'reserved';
        await desk.save();

        // Create a new reservation instance with status 'APPROVED'
        const newReservation = new Reservation({
            user: user,
            desk: desk,
            date,
            startTime,
            endTime,
            status: 'APPROVED',
            officeEquipment: desk.officeEquipment
        });

        const savedReservation = await newReservation.save();

        // Schedule a job to update the desk status when the reservation end time has passed
        scheduleJob('updateDeskStatus', endTime, async () => {
            desk.status = 'available';
            await desk.save();
        });

        // Send reservation confirmation email
        const emailBody = getEmailContentReservation(user.username, savedReservation);
        await sendReservationConfirmationEmail(user.email, emailBody);

        res.status(201).json(savedReservation);
    } catch (err) {
        next(err);
    }
};


// Controller function to update an existing reservation
export const updateReservation = async (req, res, next) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedReservation);
    } catch (error) {
        next(error);
    }
};

// Controller function to delete an existing reservation
export const deleteReservation = async (req, res, next) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        next(error);
    }
};


export const deleteAllReservations = async (req, res, next) => {
    try {
        await Reservation.deleteMany({});
        res.json({ message: 'All reservations deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Controller function to fetch a single reservation by its ID
export const getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            res.status(404).json({ message: 'Reservation not found' });
            return;
        }
        res.json(reservation);
    } catch (error) {
        next(error);
    }
};

// Controller function to fetch all reservations
export const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};



export const approveReservations = async () => {
    try {
        // Update the status of all pending reservations to "APPROVED"
        await Reservation.updateMany(
            { status: 'PENDING' },
            { $set: { status: 'APPROVED' } }
        );
        return { success: true, message: 'All pending reservations approved successfully' };
    } catch (error) {
        throw new Error('Failed to approve pending reservations');
    }
};

// Function to set all approved reservations back to "PENDING" status
export const resetApprovedReservations = async () => {
    try {
        // Update the status of all approved reservations to "PENDING"
        await Reservation.updateMany(
            { status: 'APPROVED' },
            { $set: { status: 'PENDING' } }
        );
    } catch (error) {
        throw new Error('Failed to reset approved reservations');
    }
};


export const getReservationHistory = async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        // Fetch reservation history from the database based on reservation ID
        const history = await ReservationHistory.find({ reservation: reservationId });

        res.status(200).json(history);
    } catch (err) {
        next(err);
    }
};