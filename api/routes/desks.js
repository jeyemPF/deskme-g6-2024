import express from "express";
import { createDesk, deleteDesk, getAllDesks, getDeskById, updateDesk } from "../controllers/desk.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:floorid", verifyAdmin, createDesk);

// UPDATE
router.put("/:id", verifyAdmin, updateDesk);

// DELETE
router.delete("/:id/:floorid", verifyAdmin, deleteDesk);

// GET
router.get("/:id", verifyAdmin, getDeskById);

// GET ALL
router.get("/", verifyAdmin, getAllDesks);

export default router;
