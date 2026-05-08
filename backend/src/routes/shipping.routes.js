import express from 'express';
import { adminCreateShippingMethod, adminListShippingMethods, adminUpdateShippingMethod, listShippingMethods } from '../controllers/shipping.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { shippingMethodIdParamSchema, shippingMethodSchema } from '../validators/shipping.validator.js';

const router = express.Router();
const adminRouter = express.Router();

router.get('/', listShippingMethods);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', adminListShippingMethods);
adminRouter.post('/', validate(shippingMethodSchema), adminCreateShippingMethod);
adminRouter.patch('/:id', validate(shippingMethodIdParamSchema.merge(shippingMethodSchema)), adminUpdateShippingMethod);

export { adminRouter as adminShippingRoutes };
export default router;
