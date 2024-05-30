import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";
import { scheduleJob } from 'node-schedule';
import { sendReservationConfirmationEmail, getEmailContentReservation, sendCancellationConfirmationEmail ,getEmailContentCancellation } from "../utils/emailService.js";
import AuditTrail from "../models/AuditTrail.js";

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
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
                { startTime: { $gte: startTime, $lt: endTime } }, 
                { endTime: { $gt: startTime, $lte: endTime } } 
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

        // Send reservation confirmation email if the user wants to receive emails
        if (user.receiveReservationEmails) {
            const emailBody = getEmailContentReservation(user.username, savedReservation);
            await sendReservationConfirmationEmail(user.email, emailBody);
        }

        // Log the audit trail
        await AuditTrail.create({
            actionType: 'reservation',
            userId: userId,
            deskId: deskId,
            ipAddress: req.ip
        });

        // Log the details to the console
        console.log("Audit trail created for reservation:", {
            userId: userId,
            deskId: deskId,
            ipAddress: req.ip
        });

        // Send response back to the client
        res.status(200).json({ message: 'Reservation successful' });
    } catch (err) {
        next(err);
    }
};





export const cancelReservation = async (req, res, next) => {
    try {
        const reservationId = req.params.reservationId;

        // Find the reservation to be ABORTED
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Check if the reservation is already ABORTED
        if (reservation.status === 'ABORTED') {
            return res.status(400).json({ message: "The reservation is already ABORTED" });
        }

        // Update the reservation status to 'ABORTED'
        reservation.status = 'ABORTED';
        await reservation.save();

        // Update the desk status to 'available' immediately
        const desk = await Desk.findById(reservation.desk);
        if (desk) {
            desk.status = 'available';
            await desk.save();
        }

      
        const cancellationTime = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour from now
        scheduleJob('sendCancellationEmail', cancellationTime, async () => {
            // Send cancellation confirmation email
            const emailBody = getEmailContentCancellation(reservation.user.username, reservation);
            await sendCancellationConfirmationEmail(reservation.user.email, emailBody);
        });

        res.json({ message: 'Reservation ABORTED successfully' });
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


export const getReservationCount = async (req, res, next) => {
    try {
        const count = await Reservation.countDocuments();
        res.json({ count });
    } catch (error) {
        next(error);
    }
};

export const getAvailableDeskCount = async (req, res, next) => {
    try {
        const count = await Desk.countDocuments({ status: 'available' });
        res.json({ count });
    } catch (error) {
        next(error);
    }
};

export const getPendingReservations = async (req, res, next) => {
    try {
        const pendingReservations = await Reservation.find({ status: 'PENDING' });
        res.status(200).json(pendingReservations);
    } catch (error) {
        next(error);
    }
};


export const getPendingReservationsCount = async (req, res, next) => {
    try{
        const pendingReservationCount = await Reservation.countDocuments({ status: 'PENDING'});
        res.status(200).json({ count: pendingReservationCount });
    } catch (err) {
        next(err);
    }
};