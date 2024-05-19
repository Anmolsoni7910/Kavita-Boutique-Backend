import reviewService from '../services/review.service.js'

const createReview = async(req,res) => {
    const user = req.user;

    try {
        const review = await reviewService.createReview(req.body,user);
        return res.status(200).send(review);    
    } catch (error) {
        console.log("error --- ", error.message)
        return res.status(500).json({ error: error.message });
    }
}

const getAllReviews = async(req,res) => {
    const productId = req.params.productId;
    try {
        const reviews = await reviewService.getAllReview(productId);
        return res.status(200).send(reviews);
    } catch (error) {
        console.log("error --- ", error.message)
        return res.status(500).json({ error: error.message });
    }
}

export default {
    createReview,
    getAllReviews
}