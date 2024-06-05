    import express from "express";
    import {  countReservedDesks, countUnavailableDesks, createDesk, createMultipleDesksCenterWing, createMultipleDesksLeftWing, createMultipleDesksRightWing, deleteAllDesks, getAllDeskAtLeftWing, getAllDeskAtLeftWingDetails, getAllDesks, getAllDesksDetails, getDeskCount  } from "../controllers/desk.js";
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

     router.get('/get-all-desks', getAllDesks);

     router.get('/get-desk-left-wing', getAllDeskAtLeftWing)

     router.get('/get-desk-details/:deskId', getAllDeskAtLeftWingDetails)

     router.get('/get-all-desks/:deskId', getAllDesksDetails);



    export default router;
