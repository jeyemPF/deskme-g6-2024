import Reservation from "../models/Reservation.js";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
import ReservationHistory from "../models/ReservationHistory.js";



export const createReservation = async (req, res, next) => {
    try {
        const { userId, deskId } = req.params;
        const { date, startTime, endTime } = req.body;

        const user = await User.findById(userId);
        const desk = await Desk.findById(deskId);

        if (!user || !desk) {
            return res.status(404).json({ message: "User or desk not found" });
        }

        const newReservation = new Reservation({
            user: userId,
            desk: deskId,
            date,
            startTime,
            endTime,
            status: 'PENDING',
        });

        const savedReservation = await newReservation.save();

        // Create a reservation history entry
        const reservationHistory = new ReservationHistory({
            reservation: savedReservation._id,
            user: userId,
            desk: deskId,
            date,
            startTime,
            endTime,
            type: 'PENDING', 
        });
        await reservationHistory.save();

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


