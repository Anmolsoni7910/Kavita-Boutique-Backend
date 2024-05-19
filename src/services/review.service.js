import {Review} from '../models/review.model.js';
import productService from './product.service.js';

const createReview = async(reqBody,user) => {
    const product = await productService.findProductById(reqBody.productId);

    if(!product){
        throw new Error("product not found with id: ",reqData.productId);
    }

    const review = new Review({
        product: product._id,
        user: user._id,
        review: reqBody.review,
        createdAt: new Date(),
    });

    return await review.save();
}

const getAllReview = async(productId) => {
    const product = await productService.findProductById(productId);

    if(!product){
        throw new Error("product not found with id: ",productId);
    }

    const review = await Review.find({product: productId}).populate("user");

    console.log("Review: ",review);

    return review;
}

export default {
    createReview,
    getAllReview,
}