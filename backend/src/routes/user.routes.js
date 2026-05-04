import express from 'express';
import { getMe, updateMe, updatePassword } from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import { updateProfileSchema, updatePasswordSchema } from '../validators/user.validator.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/me', getMe);
router.patch('/me', validate(updateProfileSchema), updateMe);
router.patch('/me/password', validate(updatePasswordSchema), updatePassword);

export default router;
