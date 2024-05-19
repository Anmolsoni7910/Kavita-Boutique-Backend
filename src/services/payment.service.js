import { razorpay } from "../config/razorpayClient.js"
import orderService from "./order.service.js"

const createPaymentLink = async(orderId) => {
    try {
        const order = await orderService.findOrderById(orderId);   //kes order ke leya payment link generate karna hai
        //console.log("orderId:",order);
        const paymentLinkRequest = {
            amount: order?.totalPrice * 100,
            currency: "INR",
            customer: {
                name: order?.user?.firstName + ' ' + order?.user?.lastName,
                contact: order?.shippingAddress?.mobile,
                email: order?.user?.email
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment/${orderId}`,    //frontend url, payment success page
            callback_method: 'get'
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);  //create paymentlink
        //console.log("paymentLink:",paymentLink);
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }

        return resData;
    } catch (error) {
        console.error('Error creating payment link:', error);
        throw new Error(error.message);
    }
}

const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;

    try {
        const order = await orderService.findOrderById(orderId);

        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
        }
        console.log( 'payment status',order);
        const resData = {
            message: "Your order is placed",
            success: true
        }

        return resData;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw new Error(error.message);
    }
}

export default {
    createPaymentLink,
    updatePaymentInformation
}