import express from 'express'
const router = express.Router();

import productController from '../controllers/product.controller.js'

router.get("/",productController.getAllProducts);
router.get("/id/:id",productController.findProductById);
router.get("/id/:category",productController.findProductByCategory);

export default router;