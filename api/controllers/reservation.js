import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";
import { scheduleJob } from 'node-schedule';
import { sendReservationConfirmationEmail, getEmailContentReservation, sendCancellationConfirmationEmail ,getEmailContentCancellation } from "../utils/emailService.js";
import AuditTrail from "../models/AuditTrail.js";
import { formatInTimeZone,  format } from 'date-fns-tz';
import mongoose from "mongoose";



export const createReservation = async (req, res, next) => {
    try {
        const { deskId } = req.params;
        const { date, startTime, endTime } = req.body;

        // Convert deskId to ObjectId
        const deskObjectId = mongoose.Types.ObjectId(deskId);

        // Find the desk based on its ID
        const desk = await Desk.findById(deskObjectId);

        // Check if desk exists
        if (!desk) {
            return res.status(404).json({ message: "Desk not found" });
        }

        // Convert the provided date and time to UTC using the local time zone
        const timeZone = 'Asia/Manila';
        const reservationStartTime = new Date(`${date}T${startTime}:00`);
        const reservationEndTime = new Date(`${date}T${endTime}:00`);

        // Format the date and time to the desired format
        const formattedDate = format(new Date(date), "EEEE, MMMM d yyyy 'PH Standard Time'");
        const formattedStartTime = formatInTimeZone(reservationStartTime, timeZone, 'hh:mm aaaa') + ' PH Standard Time';
        const formattedEndTime = formatInTimeZone(reservationEndTime, timeZone, 'hh:mm aaaa') + ' PH Standard Time';

        // Check if the desk is already reserved during the requested time slot
        const existingReservation = await Reservation.findOne({
            desk: deskObjectId,
            date,
            $or: [
                { startTime: { $lt: reservationEndTime }, endTime: { $gt: reservationStartTime } },
                { startTime: { $gte: reservationStartTime, $lt: reservationEndTime } },
                { endTime: { $gt: reservationStartTime, $lte: reservationEndTime } }
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
            desk: deskObjectId,
            date,
            startTime: reservationStartTime,
            endTime: reservationEndTime,
            status: 'APPROVED',
            area: desk.area, // Include the area field from the desk
            officeEquipment: desk.officeEquipment
        });

        const savedReservation = await newReservation.save();

        // Schedule a job to update the desk status when the reservation end time has passed
        scheduleJob(`updateDeskStatus_${desk._id}`, reservationEndTime, async () => {
            try {
                // Update the desk status to 'available'
                desk.status = 'available';
                await desk.save();
            } catch (error) {
                console.error(`Error updating desk status: ${error.message}`);
            }
        });

        // Send reservation confirmation email if the user wants to receive emails
        if (user.receiveReservationEmails) {
            const emailBody = getEmailContentReservation(user.username, savedReservation);
            await sendReservationConfirmationEmail(user.email, emailBody);
        }

        // Log the audit trail
        await AuditTrail.create({
            actionType: 'reservation',
            userId,
            deskId,
            ipAddress: req.ip
        });

        // Log the details to the console
        console.log("Audit trail created for reservation:", {
            userId,
            deskId,
            ipAddress: req.ip,
            formattedDate,
            formattedStartTime,
            formattedEndTime
        });

        // Send response back to the client
        res.status(200).json({
            message: 'Reservation successful',
            formattedDate,
            formattedStartTime,
            formattedEndTime
        });
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

export const addFeedback = async (req, res, next) => {
    try {
        const { reservationId } = req.params;
        const { feedback } = req.body;

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Update reservation with feedback
        reservation.feedback = feedback;
        await reservation.save();

        res.status(200).json({ message: "Feedback added successfully" });
    } catch (err) {
        next(err);
    }
};

export const getReservationFeedback = async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Check if feedback exists
        if (!reservation.feedback) {
            return res.status(404).json({ message: "Feedback not found for this reservation" });
        }

        // Return the feedback
        res.status(200).json({ feedback: reservation.feedback });
    } catch (err) {
        next(err);
    }
};