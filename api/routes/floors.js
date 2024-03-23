import express from "express"
import Floor from "../models/Floor.js"
import { createError } from "../utils/error.js"
import { createFloor, deleteFloor, getFloor, getFloors, updateFloor } from "../controllers/floor.js"

const router = express.Router()

// CREATE
router.post("/", createFloor);

// UPDATE
router.put("/:id", updateFloor);

// DELETE
router.delete("/:id", deleteFloor);

// GET
router.get("/:id", getFloor);

// GET ALL
router.get("/", getFloors);

export default router
