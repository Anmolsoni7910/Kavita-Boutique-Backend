import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controller.js'

router.get("/",userController.getAllUsers);
router.get("/profile",userController.getUserProfile);

export default router;