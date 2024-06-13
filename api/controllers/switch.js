// api/controllers/switch.js

import Switch from '../models/Switch.js';
import { approveReservations, pendingReservations } from './reservation.js';
// Controller function to handle a request to toggle autoAccepting and update reservations accordingly
export const toggleAutoAccepting = async (req, res, next) => {
    try {
        // Find the existing Switch document in the database
        let existingSwitch = await Switch.findOne();

        // If no Switch document exists, create a new one with default values
        if (!existingSwitch) {
            const newSwitch = new Switch();
            await newSwitch.save();
            existingSwitch = newSwitch;
            res.status(201).json({ message: 'Switch created with default values' });
            return;
        }

        // Toggle the autoAccepting value
        existingSwitch.autoAccepting = !existingSwitch.autoAccepting;
        await existingSwitch.save();

        // Update reservations based on the new autoAccepting value
        if (existingSwitch.autoAccepting) {
            await approveReservations(); // Approve all pending reservations
        } else {
            await pendingReservations(); // Set all approved reservations back to pending
        }

        res.status(200).json({ message: 'Auto-accepting toggled successfully', autoAccepting: existingSwitch.autoAccepting });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
