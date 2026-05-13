import express from 'express';
import {
  adminGetOrder,
  adminListOrders,
  adminUpdateOrderReturnRequest,
  adminUpdateOrderStatus,
  cancelMyOrder,
  createOrder,
  getMyOrder,
  getOrderSummary,
  listMyOrders,
  requestMyOrderReturn,
  getRevenueStats,
} from '../controllers/order.controller.js';
import { authorizeRoles, optionalAuth, protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  adminListOrdersSchema,
  adminUpdateReturnRequestSchema,
  adminUpdateOrderStatusSchema,
  cancelMyOrderSchema,
  createOrderSchema,
  listMyOrdersSchema,
  orderIdParamSchema,
  orderSummaryParamSchema,
  requestReturnSchema,
} from '../validators/order.validator.js';

const router = express.Router();
const adminRouter = express.Router();

router.post('/', optionalAuth, validate(createOrderSchema), createOrder);
router.get('/summary/:orderNumber', optionalAuth, validate(orderSummaryParamSchema), getOrderSummary);
router.get('/my', protect, validate(listMyOrdersSchema), listMyOrders);
router.get('/my/:id', protect, validate(orderIdParamSchema), getMyOrder);
router.patch('/my/:id/cancel', protect, validate(cancelMyOrderSchema), cancelMyOrder);
router.patch('/my/:id/return-request', protect, validate(requestReturnSchema), requestMyOrderReturn);

adminRouter.use(protect, authorizeRoles('admin', 'super_admin'));
adminRouter.get('/', validate(adminListOrdersSchema), adminListOrders);
adminRouter.get('/stats/revenue', getRevenueStats);
adminRouter.get('/:id', validate(orderIdParamSchema), adminGetOrder);
adminRouter.patch('/:id/status', validate(adminUpdateOrderStatusSchema), adminUpdateOrderStatus);
adminRouter.patch('/:id/return-request', validate(adminUpdateReturnRequestSchema), adminUpdateOrderReturnRequest);

export { adminRouter as adminOrderRoutes };
export default router;
