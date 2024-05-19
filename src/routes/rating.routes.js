import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import ratingController from '../controllers/rating.controller.js'

router.post("/create",authenticate,ratingController.createRating);
router.get("/product/:productId",authenticate,ratingController.getProductRatings);

export default router;