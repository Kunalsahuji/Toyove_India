import Review from '../models/Review.js';
import asyncHandler from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get all recent reviews for homepage testimonials
 * @route   GET /api/reviews/recent
 * @access  Public
 */
export const getRecentReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate('user', 'firstName lastName avatar');

  return successResponse(res, 200, 'Recent reviews fetched', reviews);
});

/**
 * @desc    Submit a new review
 * @route   POST /api/reviews
 * @access  Private
 */
export const createReview = asyncHandler(async (req, res) => {
  const { product, rating, comment } = req.body;
  
  const review = await Review.create({
    product,
    user: req.user._id,
    userName: `${req.user.firstName} ${req.user.lastName}`,
    rating,
    comment,
    role: 'Verified Buyer'
  });

  return successResponse(res, 201, 'Review submitted successfully', review);
});

/**
 * @desc    Get all reviews for a product
 * @route   GET /api/reviews/product/:id
 * @access  Public
 */
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id, status: 'approved' })
    .sort({ createdAt: -1 })
    .populate('user', 'firstName lastName avatar');

  return successResponse(res, 200, 'Product reviews fetched', reviews);
});

/**
 * @desc    Get all reviews (Admin)
 * @route   GET /api/reviews
 * @access  Private/Admin
 */
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .populate('product', 'name')
    .populate('user', 'firstName lastName email');

  return successResponse(res, 200, 'All reviews fetched', reviews);
});

/**
 * @desc    Update review status (Admin)
 * @route   PATCH /api/reviews/:id/status
 * @access  Private/Admin
 */
export const updateReviewStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  return successResponse(res, 200, `Review status updated to ${status}`, review);
});

/**
 * @desc    Delete a review (Admin)
 * @route   DELETE /api/reviews/:id
 * @access  Private/Admin
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  return successResponse(res, 200, 'Review deleted successfully');
});
