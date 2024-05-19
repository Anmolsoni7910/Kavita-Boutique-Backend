import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js';
import paymentController from '../controllers/payment.controller.js';

router.post("/:id",authenticate,paymentController.createPaymentLink);
router.get("/",authenticate,paymentController.updatePaymentInformation);

export default router;