import { Rating } from "../models/rating.model.js";
import productService from './product.service.js';

const createRating = async(reqBody,user) => {
    const product = await productService.findProductById(reqBody.productId);

    const rating = new Rating({
        product: product._id,
        user: user._id,
        rating: reqBody.rating,
        createdAt: new Date(),
    });

    return await rating.save();
}

const getProductRating = async(productId) => {
    const product = await productService.findProductById(productId);

    if(!product){
        throw new Error("product not found with id: ",productId);
    }

    return await Rating.find({product: productId}).populate("user"); // check {_id: productId}
}

export default {
    createRating,
    getProductRating
}