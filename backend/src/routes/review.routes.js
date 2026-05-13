import express from 'express';
import { 
  getRecentReviews, 
  createReview, 
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
} from '../controllers/review.controller.js';
import { protect, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.get('/recent', getRecentReviews);
router.get('/product/:id', getProductReviews);
router.post('/', protect, createReview);

// Admin routes
router.use(protect, authorizeRoles('admin', 'super_admin'));
router.get('/', getAllReviews);
router.patch('/:id/status', updateReviewStatus);
router.delete('/:id', deleteReview);

export default router;
