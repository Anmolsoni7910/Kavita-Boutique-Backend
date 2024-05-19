import ratingService from '../services/rating.service.js';

const createRating = async(req,res) => {
    try {
        const user = req.user; //jo ke muzhe melega middleware se
        const rating = await ratingService.createRating(req.body,user);
        return res.status(200).json(rating);
    } catch (error) {
        console.log("error in createRating:",error.message);
        return res.status(500).json({ error: error.message });
    }
}

const getProductRatings = async(req,res) => {
    try {
        const productId = req.params.productId;
        const ratings = await ratingService.getProductRating(productId);
        return res.status(200).json(ratings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    createRating,
    getProductRatings
}