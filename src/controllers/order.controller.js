import orderService from "../services/order.service.js";

const createOrder = async(req,res) => {
    const user = req.user;
    try {
        let createdOrder = await orderService.createOrder(user,req.body);
        console.log("order:",createdOrder);
        return res.status(200).send(createdOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const findOrderById = async(req,res) => {
    try {
        const order = await orderService.findOrderById(req.params.id);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const orderHistory = async(req,res) => {
    const user = req.user;
    try {
        const history = await orderService.usersOrderHistory(user._id);
        return res.status(200).send(history);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

export default {
    createOrder,
    findOrderById,
    orderHistory
}