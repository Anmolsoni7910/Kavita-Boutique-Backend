import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      size: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountedPrice: {
        type: Number,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      deliveryDate: {
        type: Date,
      },
});

export const OrderItem = mongoose.model("OrderItem",orderItemSchema);