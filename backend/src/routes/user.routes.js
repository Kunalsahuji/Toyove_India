import express from 'express';
import {
  adminCreateUser,
  adminGetUser,
  adminListUsers,
  adminUpdateUser,
  adminUpdateUserStatus,
  getMyPreferences,
  getMe,
  updateMyPreferences,
  updateMe,
  updatePassword,
} from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import {
  adminCreateUserSchema,
  adminListUsersSchema,
  adminUpdateUserSchema,
  adminUpdateUserStatusSchema,
  adminUserIdParamSchema,
  updateProfileSchema,
  updatePasswordSchema,
} from '../validators/user.validator.js';
import { protect, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();
const adminRouter = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/me', getMe);
router.get('/me/preferences', getMyPreferences);
router.patch('/me/preferences', updateMyPreferences);
router.patch('/me', validate(updateProfileSchema), updateMe);
router.patch('/me/password', validate(updatePasswordSchema), updatePassword);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', validate(adminListUsersSchema), adminListUsers);
adminRouter.post('/', validate(adminCreateUserSchema), adminCreateUser);
adminRouter.get('/:id', validate(adminUserIdParamSchema), adminGetUser);
adminRouter.patch('/:id', validate(adminUpdateUserSchema), adminUpdateUser);
adminRouter.patch('/:id/status', validate(adminUpdateUserStatusSchema), adminUpdateUserStatus);

export { adminRouter as adminUserRoutes };
export default router;
