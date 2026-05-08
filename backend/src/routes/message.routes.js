import express from 'express';
import { adminListMessages, adminUpdateMessageStatus, createContactMessage } from '../controllers/message.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createContactMessageSchema, messageStatusSchema } from '../validators/message.validator.js';

const router = express.Router();
const adminRouter = express.Router();

router.post('/contact', validate(createContactMessageSchema), createContactMessage);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', adminListMessages);
adminRouter.patch('/:id/status', validate(messageStatusSchema), adminUpdateMessageStatus);

export { adminRouter as adminMessageRoutes };
export default router;
