import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";
import { scheduleJob } from 'node-schedule';
import { sendReservationConfirmationEmail, getEmailContentReservation, sendCancellationConfirmationEmail ,getEmailContentCancellation } from "../utils/emailService.js";
import AuditTrail from "../models/AuditTrail.js";
import { formatInTimeZone,  format } from 'date-fns-tz';
import mongoose from "mongoose";
import {  isValid, parseISO } from 'date-fns';


export const createReservation = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { deskId } = req.params;
        const { date, startTime, endTime } = req.body;

        // Validate deskId
        if (!mongoose.Types.ObjectId.isValid(deskId)) {
            return res.status(400).json({ message: "Invalid desk ID" });
        }

        // Find the desk based on its ID
        const desk = await Desk.findById(deskId);
        if (!desk) {
            return res.status(404).json({ message: "Desk not found" });
        }

        // Validate and parse date and time
        const reservationDate = new Date(`${date}T00:00:00`);
        const reservationStartTime = new Date(`${date}T${startTime}:00`);
        const reservationEndTime = new Date(`${date}T${endTime}:00`);

        if (!isValid(reservationDate) || !isValid(reservationStartTime) || !isValid(reservationEndTime)) {
            return res.status(400).json({ message: "Invalid date or time format" });
        }

        // Convert the provided date and time to UTC using the local time zone
        const timeZone = 'Asia/Manila';
        const formattedDate = format(reservationDate, "EEEE, MMMM d yyyy 'PH Standard Time'");
        const formattedStartTime = formatInTimeZone(reservationStartTime, timeZone, 'hh:mm aaaa') + ' PH Standard Time';
        const formattedEndTime = formatInTimeZone(reservationEndTime, timeZone, 'hh:mm aaaa') + ' PH Standard Time';

        // Check if the desk is already reserved during the requested time slot
        const existingReservation = await Reservation.findOne({
            desk: desk._id,
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

        if (desk.status === 'reserved') {
            return res.status(400).json({ message: "The desk is currently reserved" });
        }

        // Update the desk's status to 'reserved'
        desk.status = 'reserved';
        await desk.save();

        const newReservation = new Reservation({
            user: userId,
            deskTitle: desk.title,
            desk: desk._id,
            date,
            startTime: reservationStartTime,
            endTime: reservationEndTime,
            status: 'PENDING',
            deskArea: desk.area,
            officeEquipment: desk.officeEquipment
        });
        

        const savedReservation = await newReservation.save();

        scheduleJob(`updateDeskStatus_${desk._id}`, reservationEndTime, async () => {
            try {
                desk.status = 'available';
                await desk.save();
            } catch (error) {
                console.error(`Error updating desk status: ${error.message}`);
            }
        });

        
        const user = await User.findById(userId);
        if (user && user.receiveReservationEmails) {
            const emailBody = getEmailContentReservation(user.username, savedReservation);
            await sendReservationConfirmationEmail(user.email, emailBody);
        }

        await AuditTrail.create({
            actionType: 'reservation',
            userId,
            deskId,
            ipAddress: req.ip
        });

        console.log("Audit trail created for reservation:", {
            userId,
            deskId,
            ipAddress: req.ip,
            formattedDate,
            formattedStartTime,
            formattedEndTime
        });

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
        // Get all reserved desks
        const reservedDesks = await Desk.find({ status: 'reserved' });

        // Update the status of all reserved desks to 'available'
        await Promise.all(reservedDesks.map(async (desk) => {
            desk.status = 'available';
            await desk.save();
        }));

        // Delete all reservations
        await Reservation.deleteMany({});

        res.json({ message: 'All reservations deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Function to approve reservations
export const approveReservations = async () => {
    try {
        // Find all pending reservations
        const pendingReservations = await Reservation.find({ status: 'PENDING' });

        for (const reservation of pendingReservations) {
            // Update the reservation status to 'APPROVED'
            reservation.status = 'APPROVED';
            await reservation.save();

            // Find the user associated with the reservation
            const user = await User.findById(reservation.user);
            if (user && user.receiveReservationEmails) {
                const emailContent = getEmailContentReservation(user.username, reservation);
                await sendReservationConfirmationEmail(user.email, emailContent);
            }
        }
    } catch (err) {
        console.error("Error approving reservations:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

export const pendingReservations = async () => {
    try {
        // Find all approved reservations
        const approvedReservations = await Reservation.find({ status: 'APPROVED' });
        
        for (const reservation of approvedReservations) {
            // Update the reservation status to 'PENDING'
            reservation.status = 'REJECTED';
            await reservation.save();
        }
    } catch (err) {
        console.error("Error setting reservations to pending:", err);
        throw err; // Rethrow the error to be handled by the caller
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
        const { reservationId, userId } = req.params;
        const { feedback } = req.body;

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Optionally verify the userId if needed
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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

export const getAllReservations = async (req, res, next) => {
    try {
        // Fetch all reservations along with user details and avatar
        const reservations = await Reservation.find()
            .populate('user', 'username email')
            .populate('desk', 'title area') // Populate the desk field to include title and area
            .select('date startTime endTime status desk deskTitle deskArea officeEquipment feedback'); // Select the required fields

        // Count feedback for each reservation
        const feedbackCounts = await Promise.all(reservations.map(async (reservation) => {
            const feedbackCount = await Reservation.countDocuments({ _id: reservation._id, feedback: { $ne: "" } });
            return { reservationId: reservation._id, feedbackCount };
        }));

        // Merge feedback counts with reservations
        const reservationsWithFeedbackCount = reservations.map((reservation) => {
            const feedbackCountObj = feedbackCounts.find((item) => item.reservationId.equals(reservation._id));
            return { ...reservation.toObject(), feedbackCount: feedbackCountObj ? feedbackCountObj.feedbackCount : 0 };
        });

        res.status(200).json(reservationsWithFeedbackCount);
    } catch (err) {
        next(err);
    }
};



// Example backend endpoint for feedback count
export const getFeedbackCount = async (req, res, next) => {
    try {
        const feedbackCount = await Reservation.countDocuments();
        res.status(200).json({ count: feedbackCount });
    } catch (error) {
        next(error);
    }
};




export const getAllReports = async (req, res, next) => {
    try {
        // fetch the desk and reports of users

        const feedback = await Reservation.find()
        .populate('user', 'username email')
        .populate('desk', 'title area') // Populate the desk field to include title and area
        .select(' deskTitle deskArea feedback'); // Select the required fields

        res.status(200).json(feedback);
    } catch (err) {
        next(err);
    }
}

export const getUserBookingHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch reservations associated with the authenticated user
        let bookings = await Reservation.find({ user: userId })
            .populate('desk', 'title area') // Optionally populate desk details
            .select('date startTime endTime status feedback '); // Select required fields

        // Reverse the array of bookings
        bookings = bookings.reverse();

        res.status(200).json({ success: true, bookings });
    } catch (err) {
        next(err);
    }
};

export const countUserReservations = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch reservations associated with the provided user ID
        const reservations = await Reservation.find({ user: userId });

        // Count the number of reservations
        const totalCount = reservations.length;

        res.status(200).json({ success: true, totalCount });
    } catch (error) {
        next(error);
    }
};




