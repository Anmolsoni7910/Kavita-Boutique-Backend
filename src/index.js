import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    return res.status(200).send({message: "welcome to kavita boutique app - node"});
})

import authRouter from './routes/auth.routes.js'
app.use("/auth",authRouter);

import userRouter from './routes/user.routes.js'
app.use("/api/users",userRouter);

import productRouter from './routes/product.routes.js'
app.use("/api/products",productRouter);

import adminProductRouter from './routes/product.admin.routes.js'
app.use("/api/admin/products",adminProductRouter);

import cartRouter from './routes/cart.routes.js'
app.use("/api/cart",cartRouter);

import cartItemRouter from './routes/cartItem.routes.js'
app.use("/api/cart_items",cartItemRouter);

import orderRouter from './routes/order.routes.js'
app.use("/api/orders",orderRouter);

import adminOrderRouter from './routes/order.admin.routes.js'
app.use("/api/admin/orders",adminOrderRouter);

import reviewRouter from './routes/review.routes.js'
app.use("/api/reviews",reviewRouter);

import ratingRouter from './routes/rating.routes.js'
app.use("/api/ratings",ratingRouter);

import paymentRouter from './routes/payment.route.js'
app.use("/api/payments",paymentRouter);

export default app;