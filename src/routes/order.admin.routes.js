import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import adminOrderController from '../controllers/adminOrder.controller.js'

router.get("/",authenticate,adminOrderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,adminOrderController.confirmedOrder);
router.put("/:orderId/ship",authenticate,adminOrderController.shippOrder);
router.put("/:orderId/deliver",authenticate,adminOrderController.deliverOrder);
router.put("/:orderId/cancel",authenticate,adminOrderController.cancelledOrder);
router.delete("/:orderId/delete",authenticate,adminOrderController.deleteOrder);

export default router;