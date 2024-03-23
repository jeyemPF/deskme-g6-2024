import Floor from "../models/Floor.js"

// CREATE
export const createFloor = async (req, res, next) => {
    const newFloor = new Floor(req.body)

    try {
        const newFloor = new Floor(req.body)
        const savedFloor = await newFloor.save()
        res.status(200).json(savedFloor)
    } catch (err) {
        next(err)
    }
}

// UPDATE
export const updateFloor = async (req, res, next) => {
    const newFloor = new Floor(req.body)

    try {
        const updatedFloor = await Floor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedFloor)
    } catch (err) {
        next(err)
    }
}

// DELETE
export const deleteFloor = async (req, res, next) => {
    const newFloor = new Floor(req.body)

    try {
        await Floor.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Floor has been deleted" })
    } catch (err) {
        next(err)
    }
}

// GET
export const getFloor = async (req, res, next) => {
    const newFloor = new Floor(req.body)

    try {
        const floor = await Floor.findById(req.params.id)
        res.status(200).json(floor)
    } catch (err) {
        next(err)
    }
}

// GET ALL
export const getFloors = async (req, res, next) => {
    const newFloor = new Floor(req.body)

    try {
        const floors = await Floor.find()
        res.status(200).json(floors)
    } catch (err) {
        next(err)
    }
}
