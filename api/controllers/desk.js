import Desk from "../models/Desk.js";
import Reservation from "../models/Reservation.js";
import { officeEquipmentEnum } from "../utils/officeEquipment.js";
import mongoose from "mongoose";

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


export const createMultipleDesksLeftWing = async (req, res, next) => {
    try {
        const desks = [];
        for (let i = 1; i <= 7; i++) {
            const desk = new Desk({
                title: `Desk ${i}`,
                status: 'available',
                officeEquipment: officeEquipmentEnum.slice((i - 1) * 3, i * 3),
                area: 'Left wing'
            });
            desks.push(desk);
        }

        const savedDesks = await Desk.insertMany(desks);
        res.status(201).json(savedDesks);
    } catch (err) {
        next(err);
    }
};

export const createMultipleDesksCenterWing = async (req, res, next) => {
    try {
        const desks = [];
        for (let i = 8; i <= 17; i++) {
            const desk = new Desk({
                title: `Desk ${i}`,
                status: 'available',
                officeEquipment: officeEquipmentEnum.slice((i - 8) * 3, (i - 7) * 3),
                area: 'Center Wing'
            });
            desks.push(desk);
        }

        const savedDesks = await Desk.insertMany(desks);
        res.status(201).json(savedDesks);
    } catch (err) {
        next(err);
    }
};


export const createMultipleDesksRightWing = async (req, res, next) => {
    try {
        const desks = [];
        for (let i = 18; i <= 24; i++) {
            const desk = new Desk({
                title: `Desk ${i}`,
                status: 'available',
                officeEquipment: officeEquipmentEnum.slice((i - 19) * 3, (i - 18) * 3), // Ensure each desk gets a unique set of 3 items
                area: 'Right Wing'
            });
            desks.push(desk);
        }

        const savedDesks = await Desk.insertMany(desks);
        res.status(201).json(savedDesks);
    } catch (err) {
        next(err);
    }
};



export const deleteAllDesks = async (req, res, next) => {
    try {
        await Desk.deleteMany({});
        res.status(200).json({ message: 'All desks have been deleted' });
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

export const countReservedDesks = async (req, res, next) => {
    try {
        const reservedDesksCount = await Desk.countDocuments({ status: 'reserved' });
        res.status(200).json({ count: reservedDesksCount });
    } catch (err) {
        next(err);
    }
};

export const countUnavailableDesks = async (req, res, next) => {
    try{
        const unavailableDeskCount = await Desk.countDocuments({ status: 'unavailable'});
        res.status(200).json({ count: unavailableDeskCount });
    } catch (err) {
        next(err);
    }
};


export const getAllDesks = async (req, res, next) => {
    try {
      // Find all desks from all wings
      const desks = await Desk.find({ area: { $in: ['Left wing', 'Center Wing', 'Right Wing'] } });
  
      if (!desks || desks.length === 0) {
        return res.status(404).json({ message: 'No desks found in any wing' });
      }
  
      res.status(200).json(desks);
    } catch (err) {
      next(err);
    }
  }
  


  export const getAllDeskAtLeftWing = async (req, res, next) => {
    try {
        // Find all desks in the left wing
        const desks = await Desk.find({ area: 'Left wing' });
    
        if (!desks) {
          return res.status(404).json({ message: 'No desks found in the left wing' });
        }
    
        res.status(200).json(desks);
      } catch (err) {
        next(err);
      }
  }


  export const getAllDeskAtLeftWingDetails = async (req, res, next) => {
    try {
        const deskId = req.params.deskId;
        
        // Check if deskId is a valid ObjectId or convert it to ObjectId
        const isValidObjectId = mongoose.Types.ObjectId.isValid(deskId);
        const query = isValidObjectId ? { _id: mongoose.Types.ObjectId(deskId), area: 'Left wing' } : { title: `Desk ${deskId}`, area: 'Left wing' };
    
        // Find the desk with the specified ID or desk number in the left wing
        const desk = await Desk.findOne(query);
    
        if (!desk) {
          return res.status(404).json({ message: 'Desk not found in the left wing' });
        }
    
        res.status(200).json(desk);
      } catch (err) {
        next(err);
      }
  }


  export const getAllDesksDetails = async (req, res, next) => {
    try {
      const deskId = req.params.deskId;
  
      // Check if deskId is a valid ObjectId or convert it to ObjectId
      const isValidObjectId = mongoose.Types.ObjectId.isValid(deskId);
  
      let query;
      
      if (isValidObjectId) {
        // If deskId is a valid ObjectId, query by _id and area
        query = { _id: mongoose.Types.ObjectId(deskId), area: { $in: ['Left wing', 'Center Wing', 'Right Wing'] } };
      } else {
        // If deskId is not a valid ObjectId, assume it's a desk number and query by title and area
        query = { title: `Desk ${deskId}`, area: { $in: ['Left wing', 'Center Wing', 'Right Wing'] } };
      }
  
      const desk = await Desk.findOne(query);
  
      if (!desk) {
        return res.status(404).json({ message: 'Desk not found in the Map' });
      }
  
      res.status(200).json(desk);
    } catch (err) {
      next(err);
    }
  }

  export const getAvailableDesksDetails = async (req, res, next) => {
    try {
      // Define the query to find desks with status 'available'
      const query = { 
        status: 'available',
        area: { $in: ['Left wing', 'Center Wing', 'Right Wing'] }
      };
  
      // Define the projection to include the title, office equipment, area, and status
      const projection = {
        title: 1,
        officeEquipment: 1,
        area: 1,
        status: 1
      };
  
      // Find desks that match the query and projection
      const desks = await Desk.find(query, projection);
  
      if (desks.length === 0) {
        return res.status(404).json({ message: 'No available desks found in the Map' });
      }
  
      res.status(200).json(desks);
    } catch (err) {
      next(err);
    }
  }
  
  

  
  