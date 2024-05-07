import AuditTrail from '../models/AuditTrail.js'; 
import { createError } from '../utils/error.js';

// Function to create an audit trail record
export const createAuditTrail = async (userId, email, eventType, eventDescription, status, additionalContext, clientLocation, userAgent) => {
  try {
    const auditTrail = new AuditTrail({
      user: userId,
      email,
      eventType,
      eventDescription,
      status,
      additionalContext,
      clientLocation,
      userAgent
    });
    await auditTrail.save();
    console.log('Audit trail created successfully:', auditTrail);
    return auditTrail;
  } catch (err) {
    console.error('Error creating audit trail record:', err);
    throw createError(500, 'Error creating audit trail record');
  }
};

// Function to get all audit trail records
export const getAllAuditTrails = async () => {
  try {
    const auditTrails = await AuditTrail.find();
    console.log('Audit trails retrieved successfully:', auditTrails);
    return auditTrails;
  } catch (err) {
    console.error('Error retrieving audit trail records:', err);
    throw createError(500, 'Error retrieving audit trail records');
  }
};
