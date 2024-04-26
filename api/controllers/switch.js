import Switch from '../models/Switch.js'; 

// Controller function to handle a request to toggle autoAccepting
export const toggleAutoAccepting = async (req, res, next) => {
    try {
        // Find the existing Switch document in the database
        const existingSwitch = await Switch.findOne();

        // If no Switch document exists, create a new one with default values
        if (!existingSwitch) {
            const newSwitch = new Switch();
            await newSwitch.save();
            res.status(201).json({ message: 'Switch created with default values' });
            return;
        }

        // Toggle the autoAccepting value
        existingSwitch.autoAccepting = !existingSwitch.autoAccepting;
        await existingSwitch.save();

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
