import { Address } from '../models/address.model.js'
import { Order } from '../models/order.model.js'
import { OrderItem } from '../models/orderItem.model.js'
import cartService from './cart.service.js'

const createOrder = async(user, shippingAddress) => {
    let address;
    if(shippingAddress._id){
        const existedAddress = await Address.findById(shippingAddress._id);
        address = existedAddress;
    }else{
        address = new Address(shippingAddress);
        address.user = user;
        await address.save();

        user.addresses.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for(const item of cart.cartItems){
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        });

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address,
        orderDate: new Date(),
        orderStatus: "PENDING",
        "paymentDetails.status": "PENDING",
        createdAt: new Date(),
    });

    return await createdOrder.save();
}

const findOrderById = async(orderId) => {
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems", populate:{path:"product"}})
    .populate("shippingAddress");

    return order;
}

const placedOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
}

const confirmedOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";
    return await order.save();
}

const shipOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";
    return await order.save();
}

const deliveredOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";
    return await order.save();
}

const cancelledOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";
    return await order.save();
}

const usersOrderHistory = async(userId) => {
    try {
        const orders = await Order.find({
            user: userId,
            orderStatus: "PLACED"
        })
        .populate({
            path:"orderItems",
            populate:{
                path:"product",
            }
        }).lean();

        return orders;
    } catch (error) {
        console.log("userOrderHistory error",error.message);
        throw new Error(error.message);
    }
}

const getAllOrders = async() => {
    try {
        const orders = await Order.find().populate({
            path:"orderItems",
            populate:{
                path: "product",
            }
        }).lean();
        return orders;
    } catch (error) {
        console.log("get all order error",error.message);
        throw new Error(error.message);
    }
}

const deleteOrder = async(orderId) => {
    const order = await findOrderById(orderId);
    if(!order){
        throw new Error("order not found with id: ",orderId);
    }
    await Order.findByIdAndDelete(orderId);
}


//TODO: updateAddress

export default {
    createOrder,
    placedOrder,
    confirmedOrder,
    shipOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
}