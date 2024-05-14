    import express from "express";
    import { createDesk, deleteDesk, getDeskCount  } from "../controllers/desk.js";
    import { verifyAdmin } from "../utils/verifyToken.js";

    const router = express.Router();

    // CREATE
    router.post("/", createDesk);   

    // UPDATE
    router.put("/:id", verifyAdmin,);

    // DELETE
    router.delete("/:id", verifyAdmin, deleteDesk);

    // Counting desk

    router.get('/count', getDeskCount);

    // // DELETE
    // router.delete("/:id/:reservation", verifyAdmin,);

    // // GET
    // router.get("/:id", verifyAdmin, getDeskById);

    // // GET ALL
    // router.get("/", getAllDesks);

    export default router;
