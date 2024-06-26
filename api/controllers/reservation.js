import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";
import { scheduleJob, scheduledJobs, cancelJob,  } from 'node-schedule';
import { sendReservationConfirmationEmail, getEmailContentReservation, sendCancellationConfirmationEmail ,getEmailContentCancellation, sendNotificationEmail } from "../utils/emailService.js";
import AuditTrail from "../models/AuditTrail.js";
import { formatInTimeZone,  format } from 'date-fns-tz';
import mongoose from "mongoose";
import {  isValid, parseISO } from 'date-fns';
import Switch from '../models/Switch.js'; 
import nodeSchedule from 'node-schedule';





const getAutoAcceptingStatus = async () => {
    const switchData = await Switch.findOne();
    return switchData ? switchData.autoAccepting : false; // Default to false if no switch data
};

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

        // Determine the initial status based on autoAccepting switch
        const autoAccepting = await getAutoAcceptingStatus();
        let initialStatus = autoAccepting ? 'APPROVED' : 'PENDING';

        // Create a new reservation with determined initial status
        const newReservation = new Reservation({
            user: userId,
            deskTitle: desk.title,
            desk: desk._id,
            date,
            startTime: reservationStartTime,
            endTime: reservationEndTime,
            status: initialStatus, // Set the status based on autoAccepting switch
            deskArea: desk.area,
            officeEquipment: desk.officeEquipment,
            deskImage: desk.image
        });

        const savedReservation = await newReservation.save();

        // Schedule the job to handle reservation status transitions
        const startJob = scheduleJob(`startReservation_${savedReservation._id}`, reservationStartTime, async () => {
            try {
                if (savedReservation.status === 'APPROVED') {
                    savedReservation.status = 'STARTED';
                    await savedReservation.save();
                }
            } catch (error) {
                console.error(`Error updating reservation status to STARTED: ${error.message}`);
            }
        });

        const endJob = scheduleJob(`endReservation_${savedReservation._id}`, reservationEndTime, async () => {
            try {
                if (savedReservation.status === 'PENDING') {
                    savedReservation.status = 'REJECTED';
                    await savedReservation.save();
                    desk.status = 'available';
                    await desk.save();
                } else if (savedReservation.status === 'STARTED') {
                    savedReservation.status = 'COMPLETED';
                    await savedReservation.save();
                    desk.status = 'available';
                    await desk.save();
                }
            } catch (error) {
                console.error(`Error updating reservation status: ${error.message}`);
            }
        });

        // Schedule a notification 1 hour before the end time
        const notificationTime = new Date(reservationEndTime.getTime() - (60 * 60 * 1000)); // 1 hour before endTime
        const notificationJob = scheduleJob(`notifyUser_${savedReservation._id}`, notificationTime, async () => {
            try {
                const user = await User.findById(userId);
                if (user) {
                    const notificationMessage = `Your booking is until ${formattedEndTime}.`;
                    await sendNotificationEmail(user.email, "Reservation Notification", notificationMessage);
                }
            } catch (error) {
                console.error(`Error sending notification: ${error.message}`);
            }
        });

        // Always send reservation confirmation email
        const user = await User.findById(userId);
        if (user && user.receiveReservationEmails) {
            const emailBody = getEmailContentReservation(user.username, savedReservation);
            await sendReservationConfirmationEmail(user.email, emailBody);
        }

        // Create audit trail for reservation
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

export const approveReservations = async () => {
    try {
        // Find all pending reservations
        const pendingReservations = await Reservation.find({ status: 'PENDING' });

        for (const reservation of pendingReservations) {
            // Update the reservation status to 'APPROVED'
            reservation.status = 'APPROVED';
            await reservation.save();

            // Schedule the job for reservation status transitions
            scheduleReservationJobs(reservation);
            
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

const scheduleReservationJobs = async (reservation) => {
    const startJob = scheduleJob(`startReservation_${reservation._id}`, reservation.startTime, async () => {
        try {
            if (reservation.status === 'APPROVED') {
                reservation.status = 'STARTED';
                await reservation.save();
            }
        } catch (error) {
            console.error(`Error updating reservation status to STARTED: ${error.message}`);
        }
    });

    const endJob = scheduleJob(`endReservation_${reservation._id}`, reservation.endTime, async () => {
        try {
            if (reservation.status === 'PENDING') {
                reservation.status = 'REJECTED';
                await reservation.save();
                const desk = await Desk.findById(reservation.desk);
                if (desk) {
                    desk.status = 'available';
                    await desk.save();
                }
            } else if (reservation.status === 'STARTED') {
                reservation.status = 'COMPLETED';
                await reservation.save();
                const desk = await Desk.findById(reservation.desk);
                if (desk) {
                    desk.status = 'available';
                    await desk.save();
                }
            }
        } catch (error) {
            console.error(`Error updating reservation status: ${error.message}`);
        }
    });

    if (reservation.status === 'APPROVED') {
        const completeJob = scheduleJob(`completeReservation_${reservation._id}`, reservation.endTime, async () => {
            try {
                if (reservation.status === 'APPROVED') {
                    reservation.status = 'COMPLETED';
                    await reservation.save();
                    const desk = await Desk.findById(reservation.desk);
                    if (desk) {
                        desk.status = 'available';
                        await desk.save();
                    }
                } 
            } catch (error) {
                console.error(`Error marking reservation as COMPLETED: ${error.message}`);
            }
        });
    }
};


export const pendingReservations = async () => {
    try {
        // Find all approved reservations
        const approvedReservations = await Reservation.find({ status: 'APPROVED' });

        for (const reservation of approvedReservations) {
            // Update the reservation status to 'PENDING'
            reservation.status = 'PENDING';
            await reservation.save();

            // Cancel existing jobs related to this reservation
            scheduleReservationJobs(reservation);
        }
    } catch (err) {
        console.error("Error setting reservations to pending:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// const cancelReservationJobs = async (reservation) => {
//     // Cancel existing jobs related to this reservation
//     const startJobName = `startReservation_${reservation._id}`;
//     const endJobName = `endReservation_${reservation._id}`;
    
//     // Implement your job cancellation logic here based on your scheduler

//     // Example: If using node-schedule for job scheduling
//     const scheduledJobs = schedule.scheduledJobs;
//     if (scheduledJobs[startJobName]) {
//         scheduledJobs[startJobName].cancel();
//     }
//     if (scheduledJobs[endJobName]) {
//         scheduledJobs[endJobName].cancel();
//     }
// };


export const cancelReservation = async (req, res, next) => {
    try {
        const { userId, reservationId } = req.params;

        // Find the reservation to be canceled by reservationId and userId
        const reservation = await Reservation.findOne({ _id: reservationId, user: userId });
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Check if the reservation is already canceled (ABORTED) or completed (COMPLETED)
        if (reservation.status === 'ABORTED') {
            return res.status(400).json({ message: "The reservation is already ABORTED and cannot be canceled." });
        } else if (reservation.status === 'COMPLETED') {
            return res.status(400).json({ message: "The reservation is already COMPLETED and cannot be canceled." });
        }
        else if (reservation.status === 'REJECTED') {
            return res.status(400).json({ message: "The reservation is already REJECTED and cannot be canceled." });
        }

        // Allow cancellation for reservations with status 'PENDING', 'APPROVED', or 'STARTED'
        if (reservation.status !== 'PENDING' && reservation.status !== 'APPROVED' && reservation.status !== 'STARTED' ) {
            return res.status(400).json({ message: "Cannot cancel reservations with the current status." });
        }

        // Cancel the scheduled jobs for this reservation
        const startJob = scheduledJobs[`startReservation_${reservation._id}`];
        const completeJob = scheduledJobs[`completeReservation_${reservation._id}`];
        if (startJob) cancelJob(`startReservation_${reservation._id}`);
        if (completeJob) cancelJob(`completeReservation_${reservation._id}`);

        // Update the reservation status to 'ABORTED'
        reservation.status = 'ABORTED';
        await reservation.save();

        // Update the desk status to 'available' immediately
        const desk = await Desk.findById(reservation.desk);
        if (desk) {
            desk.status = 'available';
            await desk.save();
        }

        // Send cancellation confirmation email
        const user = await User.findById(userId);
        if (user && user.receiveReservationEmails) {
            const emailBody = getEmailContentCancellation(user.username, reservation);
            await sendCancellationConfirmationEmail(user.email, emailBody);
        }

        await AuditTrail.create({
            actionType: 'cancel_reservation',
            userId,
            deskId: reservation.desk,
            ipAddress: req.ip
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
        bookings = bookings;

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



export const checkReservationStatus = async (req, res) => {
    const { reservationId } = req.params;

    try {
        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId).populate('user'); // Assuming 'user' is an ObjectId reference in Reservation

        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        // Get the current time
        const now = new Date();

        // Determine the status based on the reservation's attributes
        let status = null;
        if (reservation.status === 'REJECTED') {
            status = 'REJECTED';
        } else if (reservation.status === 'CANCELED') {
            status = 'CANCELED';
        } else if (reservation.status === 'ABORTED') {
            status = 'ABORTED';
        } else if (reservation.endTime <= now) {
            status = 'COMPLETED';
        } else if (reservation.startTime > now) {
            status = 'EXPIRED';
        }

        // Check if the status is one of the specified statuses
        const validStatuses = ["REJECTED", "CANCELED", "COMPLETED", "EXPIRED", "ABORTED"];
        if (status && validStatuses.includes(status)) {
            // Log the status in the reservation history
            await ReservationHistory.create({
                reservation: reservation._id,
                user: reservation.user._id,
                desk: reservation.desk, 
                date: reservation.date,
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                type: status
            });

            // Include email, date, start time, end time, and status in the response
            return res.status(200).json({
                email: reservation.user.email, // Assuming user schema has an email field
                date: reservation.date,
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                status
            });
        }

        return res.status(200).json({
            email: reservation.user.email, // Assuming user schema has an email field
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            status: null
        });
    } catch (error) {
        console.error("Error checking reservation status:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};