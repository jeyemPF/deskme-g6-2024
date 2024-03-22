import express from "express"
import Floor from "../models/Floor.js"

const router = express.Router()

// CREATE
router.post("/", async (req, res) => {
    try {
        const newFloor = new Floor(req.body)
        const savedFloor = await newFloor.save()
        res.status(200).json(savedFloor)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedFloor = await Floor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedFloor)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Floor.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Floor has been deleted" })
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// GET
router.get("/:id", async (req, res) => {
    try {
        const floor = await Floor.findById(req.params.id)
        res.status(200).json(floor)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// GET ALL
router.get("/", async (req, res) => {
    try {
        const floors = await Floor.find()
        res.status(200).json(floors)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

export default router
