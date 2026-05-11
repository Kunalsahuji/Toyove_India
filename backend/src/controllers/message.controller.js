import ContactMessage from '../models/ContactMessage.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { sendContactMessageEmail } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  
  // Background email notification to admin
  Promise.resolve(sendContactMessageEmail(message)).catch((error) => {
    logger.warn(`Contact notification email failed for message from ${message.email}: ${error.message}`);
  });

  return successResponse(res, 201, 'Message submitted successfully', message);
});

export const adminListMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return successResponse(res, 200, 'Messages fetched successfully', messages);
});

export const adminUpdateMessageStatus = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!message) return next(new AppError('Message not found', 404));
  return successResponse(res, 200, 'Message status updated successfully', message);
});
