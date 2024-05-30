    import express from "express";
    import {  countReservedDesks, countUnavailableDesks, createDesk, deleteDesk, getDeskCount  } from "../controllers/desk.js";
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

     router.get('/count-reserved', countReservedDesks);

     router.get('/count-unavailable', countUnavailableDesks);



    export default router;
