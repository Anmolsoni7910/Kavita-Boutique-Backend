import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    discountedPrice: {
        type: Number,
    },
    discountPersent: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    sizes: [
        {
            name: {
                type: String,
            },
            quantity: {
                type: Number,
            },
        },
    ],
    imageUrl: {
        type: String,
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    numRatings: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

export const Product = mongoose.model("Product",productSchema);