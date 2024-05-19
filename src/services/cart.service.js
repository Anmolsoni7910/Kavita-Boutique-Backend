import { Cart } from "../models/cart.model.js";
import {CartItem} from '../models/cartItem.model.js';
import {Product} from '../models/product.model.js';

const createCart = async(user) => {
    try {
        const cart = new Cart({user});
        return await cart.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserCart = async(userId) => {
    try {
        const cart = await Cart.findOne({user: userId});

        const cartItems = await CartItem.find({cart: cart._id}).populate("product");

        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for(let cartItem of cart.cartItems){
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discount = totalPrice - totalDiscountedPrice;

        return await cart.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

// add item to user cart
const addCartItem = async(userId, reqBody) => {
    try {
        const cart = await Cart.findOne({user: userId});

        const product = await Product.findById(reqBody.productId);

        const isPresent = await CartItem.findOne({cart: cart._id, product: product._id, userId});

        if(!isPresent){
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.discountedPrice,
                size: reqBody.size,
                discountedPrice: product.discountedPrice
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return createdCartItem;
        }

        return isPresent;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    createCart,
    findUserCart,
    addCartItem
}