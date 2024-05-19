import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import reviewController from '../controllers/review.controller.js'

router.post("/create",authenticate,reviewController.createReview);
router.get("/product/:productId",authenticate,reviewController.getAllReviews);

export default router;