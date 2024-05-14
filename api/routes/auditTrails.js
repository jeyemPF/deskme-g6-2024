
import express from "express";
import { getAuditTrails } from "../controllers/auditTrail.js";

const router = express.Router()

router.get('/', getAuditTrails);


export default router;  