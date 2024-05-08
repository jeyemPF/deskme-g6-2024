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


