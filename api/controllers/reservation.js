import Reservation from "../models/Reservation.js";

// Controller function to create a new reservation
export const createReservation = async (req, res, next) => {
    try {
        // Extract data from the request body
        const { userId, deskId, date, startTime, endTime } = req.body;

        // Create a new reservation object
        const newReservation = new Reservation({
            user: userId,
            desk: deskId,
            date,
            startTime,
            endTime,
            status: 'PENDING', // Default status
            mode: 0, // Default mode
        });

        // Save the reservation to the database
        const savedReservation = await newReservation.save();

        // Return a success response
        res.status(201).json(savedReservation);
    } catch (error) {
        // Handle errors    
        next(error);
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
