import express from 'express';
import {
  adminGetOrder,
  adminListOrders,
  adminUpdateOrderStatus,
  cancelMyOrder,
  createOrder,
  getMyOrder,
  getOrderSummary,
  listMyOrders,
} from '../controllers/order.controller.js';
import { authorizeRoles, optionalAuth, protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  adminListOrdersSchema,
  adminUpdateOrderStatusSchema,
  cancelMyOrderSchema,
  createOrderSchema,
  listMyOrdersSchema,
  orderIdParamSchema,
  orderSummaryParamSchema,
} from '../validators/order.validator.js';

const router = express.Router();
const adminRouter = express.Router();

router.post('/', optionalAuth, validate(createOrderSchema), createOrder);
router.get('/summary/:orderNumber', optionalAuth, validate(orderSummaryParamSchema), getOrderSummary);
router.get('/my', protect, validate(listMyOrdersSchema), listMyOrders);
router.get('/my/:id', protect, validate(orderIdParamSchema), getMyOrder);
router.patch('/my/:id/cancel', protect, validate(cancelMyOrderSchema), cancelMyOrder);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', validate(adminListOrdersSchema), adminListOrders);
adminRouter.get('/:id', validate(orderIdParamSchema), adminGetOrder);
adminRouter.patch('/:id/status', validate(adminUpdateOrderStatusSchema), adminUpdateOrderStatus);

export { adminRouter as adminOrderRoutes };
export default router;
