import express from 'express';
import { adminCategoryRoutes } from './category.routes.js';
import { adminProductRoutes } from './product.routes.js';

const router = express.Router();

router.use('/categories', adminCategoryRoutes);
router.use('/products', adminProductRoutes);

export default router;
