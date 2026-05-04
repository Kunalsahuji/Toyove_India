import express from 'express';
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminListCategories,
  adminReorderCategories,
  adminToggleNavbar,
  adminUpdateCategory,
  getAllCategories,
  getCategoryBySlug,
  getCategoryTree,
  getNavbarCategories,
} from '../controllers/category.controller.js';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  categoryIdParamSchema,
  createCategorySchema,
  reorderCategoriesSchema,
  toggleNavbarSchema,
  updateCategorySchema,
} from '../validators/category.validator.js';

const router = express.Router();
const adminRouter = express.Router();

router.get('/navbar', getNavbarCategories);
router.get('/tree', getCategoryTree);
router.get('/all', getAllCategories);
router.get('/:slug', getCategoryBySlug);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', adminListCategories);
adminRouter.post('/', validate(createCategorySchema), adminCreateCategory);
adminRouter.patch('/reorder', validate(reorderCategoriesSchema), adminReorderCategories);
adminRouter.patch('/:id/navbar', validate(toggleNavbarSchema), adminToggleNavbar);
adminRouter.patch('/:id', validate(updateCategorySchema), adminUpdateCategory);
adminRouter.delete('/:id', validate(categoryIdParamSchema), adminDeleteCategory);

export { adminRouter as adminCategoryRoutes };
export default router;
