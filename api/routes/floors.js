import express from "express"
import Floor from "../models/Floor.js"
import { createError } from "../utils/error.js"
import { createFloor, deleteFloor, getFloor, getFloors, updateFloor } from "../controllers/floor.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// CREATE
router.post("/", verifyAdmin, createFloor);

// UPDATE
router.put("/:id", verifyAdmin, updateFloor);

// DELETE
router.delete("/:id", verifyAdmin, deleteFloor);

// GET
router.get("/:id", verifyAdmin, getFloor);

// GET ALL
router.get("/",  verifyAdmin, getFloors);

export default router
