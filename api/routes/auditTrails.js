
import express from "express";
import { deleteAllAuditTrails, getAuditTrails } from "../controllers/auditTrail.js";

const router = express.Router()

router.get('/get-audit-trails', getAuditTrails);

//Delete all audit trail
router.delete('/', deleteAllAuditTrails);


export default router;  