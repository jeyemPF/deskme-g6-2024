import Desk from "../models/Desk.js";
import Floor from "../models/Floor.js";

export const createDesk = async (req, res, next) => {
    const floorId = req.params.floorId;
    const newDesk = new Desk(req.body);

    try {
        const savedDesk = await newDesk.save();
        await Floor.findByIdAndUpdate(floorId, { $push: { desk: savedDesk._id } });
        res.status(201).json(savedDesk);
    } catch (err) {
        next(err);
    }
};

export const updateDesk = async (req, res, next) => {
    try {
        const updatedDesk = await Desk.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedDesk);
    } catch (err) {
        next(err);
    }
};

export const deleteDesk = async (req, res, next) => {
    try {
        await Desk.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Desk has been deleted" });
    } catch (err) {
        next(err);
    }
};

export const getDeskById = async (req, res, next) => {
    try {
        const desk = await Desk.findById(req.params.id);
        res.status(200).json(desk);
    } catch (err) {
        next(err);
    }
};

export const getAllDesks = async (req, res, next) => {
    try {
        const desks = await Desk.find();
        res.status(200).json(desks);
    } catch (err) {
        next(err);
    }
};
