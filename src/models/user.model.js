import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER",
    },
    mobile:{
        type: String,
        //required: true,
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        }
    ],
    paymentInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment_information",
        }
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating",
        }
    ],
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }, 
});

export const User = mongoose.model("User",userSchema);