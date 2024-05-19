import cartService from "../services/cart.service.js";

const findUserCart = async(req,res) => {
    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).json({message:"Failed to get Cart", error: error.message});
    }
}

const addItemToCart = async(req,res) =>{
    const user = req.user;
    try {
        await cartService.addCartItem(user._id.toString(),req.body);
        return res.status(200).json({message:"Item Added to Cart Successfully", status: true});
    } catch (error) {
        return res.status(500).json({message:"Failed to add Item to Cart", error: error.message});
    }
}

export default {
    findUserCart,
    addItemToCart
}