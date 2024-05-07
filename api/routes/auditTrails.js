
import express from "express";
import {  createAuditTrail, getAllAuditTrails  } from "../controllers/auditTrail.js";

import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/audit-trails', verifyToken, createAuditTrail);
// router.get('/audit-trails', getAllAuditTrails);


export default router;  