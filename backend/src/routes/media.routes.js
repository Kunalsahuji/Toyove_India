import express from 'express';
import { authorizeRoles, protect } from '../middlewares/auth.js';
import { adminMediaUpload, adminMediaUploadMiddleware } from '../controllers/media.controller.js';

const adminRouter = express.Router();

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.post('/upload', adminMediaUploadMiddleware, adminMediaUpload);

export { adminRouter as adminMediaRoutes };
