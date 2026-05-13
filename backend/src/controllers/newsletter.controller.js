import Newsletter from '../models/Newsletter.js';
import { sendNewsletterWelcomeEmail } from '../services/email.service.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
export const subscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  // Check if already subscribed
  const existingSubscriber = await Newsletter.findOne({ email });
  if (existingSubscriber) {
    if (existingSubscriber.status === 'active') {
      return next(new AppError('You are already subscribed to our newsletter!', 400));
    } else {
      // Re-activate if they were unsubscribed
      existingSubscriber.status = 'active';
      await existingSubscriber.save();
      
      // Send welcome email again
      await sendNewsletterWelcomeEmail(email);
      
      return successResponse(res, 200, 'Subscription reactivated successfully!', existingSubscriber);
    }
  }

  const subscriber = await Newsletter.create({ email });

  // Send welcome email with coupon
  try {
    await sendNewsletterWelcomeEmail(email);
  } catch (err) {
    console.error('Error sending welcome email:', err);
  }

  successResponse(res, 201, 'Thank you for subscribing to our newsletter!', subscriber);
});

/**
 * @desc    Get all subscribers (Admin only)
 * @route   GET /api/newsletter
 * @access  Private/Admin
 */
export const getAllSubscribers = asyncHandler(async (req, res, next) => {
  const subscribers = await Newsletter.find().sort({ createdAt: -1 });
  successResponse(res, 200, 'Subscribers fetched successfully', subscribers);
});

/**
 * @desc    Delete a subscriber (Admin only)
 * @route   DELETE /api/newsletter/:id
 * @access  Private/Admin
 */
export const deleteSubscriber = asyncHandler(async (req, res, next) => {
  const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
  
  if (!subscriber) {
    return next(new AppError('No subscriber found with that ID', 404));
  }

  successResponse(res, 200, 'Subscriber deleted successfully');
});

/**
 * @desc    Unsubscribe (Public)
 * @route   PATCH /api/newsletter/unsubscribe
 * @access  Public
 */
export const unsubscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const subscriber = await Newsletter.findOneAndUpdate(
    { email },
    { status: 'unsubscribed' },
    { new: true }
  );

  if (!subscriber) {
    return next(new AppError('No subscriber found with that email', 404));
  }

  successResponse(res, 200, 'You have been unsubscribed from our newsletter.');
});
