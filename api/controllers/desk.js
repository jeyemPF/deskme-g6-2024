import Desk from "../models/Desk.js";
import Reservation from "../models/Reservation.js";
import cron from 'node-cron';




export const createDesk = async (req, res, next) => {
    const reservationId = req.params.reservationId;
    const newDesk = new Desk(req.body);

    try {
        const savedDesk = await newDesk.save();
        await Reservation.findByIdAndUpdate(reservationId, { desk: savedDesk._id  });
        res.status(201).json(savedDesk);
    } catch (err) {
        next(err);
    }
};


const updateDeskStatus = async (reservationId) => {
    try {
        const reservation = await Reservation.findById(reservationId);
        if (reservation && reservation.endTime <= new Date()) {
            const desk = await Desk.findById(reservation.desk);
            if (desk) {
                desk.status = 'available';
                await desk.save();
            }
        }
    } catch (error) {
        console.error('Error updating desk status:', error);
    }
};

// Schedule the task to run every minute to check for expired reservations
// Schedule the task to run every minute to check for expired reservations
cron.schedule('* * * * *', async () => {
    console.log('Checking for expired reservations...');
    // Get all reservations that have passed their end time
    const expiredReservations = await Reservation.find({ endTime: { $lte: new Date() } });

    // Update the status of the desks for the expired reservations
    expiredReservations.forEach(async (reservation) => {
        await updateDeskStatus(reservation._id);
    });
});
