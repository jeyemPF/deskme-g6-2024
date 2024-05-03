// Import necessary models
import Floor from '../models/Floor';
import Desk from '../models/Desk';

// Controller functions

// Get all floors
export const getAllFloors = async (req, res) => {
    try {
        const floors = await Floor.find();
        return res.status(200).json(floors);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Get desks by floor ID
export const getDesksByFloorId = async (req, res) => {
    const { floorId } = req.params;
    try {
        // Find desks associated with the given floor ID
        const desks = await Desk.find({ floor: floorId });
        return res.status(200).json(desks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Other controller functions for creating, updating, and deleting floors can be added as needed
