
import express from "express";
import { getAuditTrails } from "../controllers/auditTrail.js";

const router = express.Router()

router.get('/audit-trails', getAuditTrails);


export default router;  