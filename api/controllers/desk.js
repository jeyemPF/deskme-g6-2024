import Desk from "../models/Desk.js";
import Reservation from "../models/Reservation.js";





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

export const deleteDesk = async (req, res, next) => {
    const deskId = req.params.deskId; // Assuming deskId is passed as a parameter in the request URL
    
    try {
        // Find the desk by ID and delete it
        const deletedDesk = await Desk.findByIdAndDelete(deskId);

        // If the desk is found and deleted successfully
        if (deletedDesk) {
            // Remove the desk reference from any associated reservations
            await Reservation.updateMany({ desk: deskId }, { $unset: { desk: 1 } });

            res.status(200).json({ message: 'Desk deleted successfully.' });
        } else {
            // If the desk is not found
            res.status(404).json({ message: 'Desk not found.' });
        }
    } catch (err) {
        // If an error occurs during the deletion process
        next(err);
    }
};


export const getDeskCount = async (req, res, next) => {
    try {
        const deskCount = await Desk.countDocuments();
        res.status(200).json({ count: deskCount });
    } catch (err) {
        next(err);
    }
};