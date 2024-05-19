import orderService from "../services/order.service.js";

const getAllOrders = async(req,res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

const confirmedOrder = async(req,res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.confirmedOrder(orderId);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

const shippOrder = async(req,res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.shipOrder(orderId);
        return res.status(200).json(order); 
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

const deliverOrder = async(req,res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.deliveredOrder(orderId);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ error: error.message});
    }   
}

const cancelledOrder = async(req,res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.cancelledOrder(orderId);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

const deleteOrder = async(req,res) => {
    try {
        const orderId = req.params.orderId;
        await orderService.deleteOrder(orderId);
        return res.status(200).json({message: "Order Deleted Successfully", success: true});
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

export default {
    getAllOrders,
    confirmedOrder,
    shippOrder,
    deliverOrder,
    cancelledOrder,
    deleteOrder,
}