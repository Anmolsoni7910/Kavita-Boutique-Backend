import express from 'express'
const router = express.Router();

import productController from '../controllers/product.controller.js'

router.post("/", productController.createProduct);
router.post("/creates",productController.createMultipleProduct);
router.delete("/:id",productController.deleteProduct);
router.put("/:id",productController.updateProduct);

export default router;

// import upload and insert upload middleware here