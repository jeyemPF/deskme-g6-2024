
import express from "express";
import { deleteAllAuditTrails, getAuditTrails, getCreatedUsers } from "../controllers/auditTrail.js";

const router = express.Router()

router.get('/get-audit-trails', getAuditTrails);

router.get('/created-users', getCreatedUsers);


//Delete all audit trail
router.delete('/', deleteAllAuditTrails);


export default router;  