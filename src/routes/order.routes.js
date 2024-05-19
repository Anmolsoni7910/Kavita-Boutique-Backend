import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import orderController from '../controllers/order.controller.js';

router.post("/",authenticate,orderController.createOrder);
router.get("/user",authenticate,orderController.orderHistory);
router.get("/:id",authenticate,orderController.findOrderById);

export default router;