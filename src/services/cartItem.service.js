import { CartItem } from "../models/cartItem.model.js";
import userService from './user.service.js';

const createCartItem = async(cartItemData) => {
    const cartItem = new CartItem(cartItemData);
    cartItem.quantity = 1;
    cartItem.price = cartItem.product.price * cartItem.quantity;
    cartItem.discountedPrice = cartItem.product.discountedPrice * cartItem.quantity;

    return await cartItem.save();
}

const updateCartItem = async(userId, cartItemId, cartItemData) => {
    try {
        const cartItem = await findCartItemById(cartItemId);
        //console.log("cartItemData", cartItem);

        if(!cartItem){
            throw new Error("cart item not found : ",cartItemId)
        }

        const user = await userService.findUserById(cartItem.userId);

        if(!user){
            throw new Error("user not found : ",userId)
        }

        if(user._id.toString() === userId.toString()) {
            cartItem.quantity = cartItemData.quantity;
            cartItem.price = cartItem.quantity * cartItem.product.price;
            cartItem.discountedPrice = cartItem.quantity * cartItem.product.discountedPrice;

            return await cartItem.save();
        }else{
            throw new Error("you can't update this cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const isCartItemExist = async(size,cart,product,userId) => {
    return await CartItem.findOne({cart,size,product,userId});
}

const removeCartItem = async(userId, cartItemId) => {
    try {
        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(cartItem.userId);
        const reqUser = await userService.findUserById(userId);

        console.log(user._id + " " + reqUser._id + " " + cartItem._id);

        if(user._id.toString() === reqUser._id.toString()){
            await CartItem.findByIdAndDelete(cartItemId);
        }else{
            throw new Error("You can't remove another user's item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const findCartItemById = async(cartItemId) => {
    try {
        const cartItem = await CartItem.findById(cartItemId).populate("product");

        if(!cartItem){
            throw new Error("Cart Item not found with id: ",cartItemId);
        }

        return cartItem;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    createCartItem,
    updateCartItem,
    removeCartItem,
    isCartItemExist,
    findCartItemById
}