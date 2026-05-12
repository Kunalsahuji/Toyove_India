import express from 'express';
import { getPageBySlug, adminListPages, adminUpsertPage } from '../controllers/pageContent.controller.js';
import { protect, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();
const adminRouter = express.Router();

// Public routes
router.get('/:slug', getPageBySlug);

// Admin routes
adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', adminListPages);
adminRouter.post('/', adminUpsertPage);

export { adminRouter as adminPageRoutes };
export default router;
