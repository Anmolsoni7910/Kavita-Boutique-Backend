import cartItemService from "../services/cartItem.service.js";

const updateCartItem = async(req,res) => {
    const user = req.user;
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id,req.params.id,req.body);
        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const removeCartItem = async(req,res) => {
    const user = req.user;
    try {
        await cartItemService.removeCartItem(user._id,req.params.id);

        return res.status(200).send({message: "cart item removed successfully", status:true});
    } catch (error) {
        console.log("remove cartItem error:",error.message);
        return res.status(500).json({ error: error.message });
    }
}

export default {
    updateCartItem,
    removeCartItem
}