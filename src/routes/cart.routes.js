import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import cartController from '../controllers/cart.controller.js'

router.get("/",authenticate,cartController.findUserCart);
router.put("/add",authenticate,cartController.addItemToCart);

//check for put -> post

export default router;