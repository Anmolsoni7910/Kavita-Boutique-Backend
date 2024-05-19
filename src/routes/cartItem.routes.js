import express from 'express';
const router = express.Router();

import authenticate from '../middleware/authenticate.js'
import cartItemController from '../controllers/cartItem.controller.js'

router.put("/:id",authenticate,cartItemController.updateCartItem);
router.delete("/:id",authenticate,cartItemController.removeCartItem);

export default router;