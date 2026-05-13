import express from 'express';
import * as newsletterController from '../controllers/newsletter.controller.js';
import { protect, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/subscribe', newsletterController.subscribe);
router.patch('/unsubscribe', newsletterController.unsubscribe);

// Admin routes
router.use(protect);
router.use(authorizeRoles('admin', 'super_admin'));

router.get('/', newsletterController.getAllSubscribers);
router.delete('/:id', newsletterController.deleteSubscriber);

export default router;
