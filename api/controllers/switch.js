import Switch from '../models/Switch.js'; 
import { resetApprovedReservations, approveReservations  } from '../controllers/reservation.js'; // Import the function for approving reservations

// Controller function to handle a request to toggle autoAccepting and approve reservations if enabled
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

        // If autoAccepting is enabled, approve pending reservations, else reset approved reservations
        if (existingSwitch.autoAccepting) {
            // Approve pending reservations
            await approveReservations();
        } else {
            // Reset approved reservations
            await resetApprovedReservations();
        }

        res.status(200).json({ message: 'Auto-accepting toggled successfully', autoAccepting: existingSwitch.autoAccepting });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
export const getSwitchState = async (req, res, next) => {
    try {
        // Find the existing Switch document in the database
        const existingSwitch = await Switch.findOne();

        // If no Switch document exists, return a default state
        if (!existingSwitch) {
            return res.status(404).json({ message: 'Switch state not found' });
        }

        // Return the current state of autoAccepting
        res.status(200).json({ autoAccepting: existingSwitch.autoAccepting });
    } catch (error) {
        // Handle errors
        next(error);
    }
};

