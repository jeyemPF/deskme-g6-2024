    import express from "express";
    import {  countReservedDesks, countUnavailableDesks, createDesk, createMultipleDesksCenterWing, createMultipleDesksLeftWing, createMultipleDesksRightWing, deleteAllDesks, getDeskCount  } from "../controllers/desk.js";
    import { verifyAdmin } from "../utils/verifyToken.js";

    const router = express.Router();

    // CREATE
    router.post("/", createDesk);   

    // UPDATE
    router.put("/:id", verifyAdmin,);

    // DELETE
    router.delete("/", deleteAllDesks);

    // GENERATE ALL DESKS
    router.post('/create-left-wing', createMultipleDesksLeftWing)

    // Create center wing
    router.post('/create-center-wing', createMultipleDesksCenterWing)

    // Create Rightwing
    router.post('/create-right-wing', createMultipleDesksRightWing)



    // Counting desk
     router.get('/count', getDeskCount);

     router.get('/count-reserved', countReservedDesks);

     router.get('/count-unavailable', countUnavailableDesks);



    export default router;
