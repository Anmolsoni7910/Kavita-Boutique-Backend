import dotenv from 'dotenv';
dotenv.config();
import Razorpay from 'razorpay';

const RAZERPAY_API_KEY= process.env.RAZERPAY_API_KEY;
const RAZERPAY_API_KEY_SECRET= process.env.RAZERPAY_API_KEY_SECRET;

export const razorpay = new Razorpay({
  key_id: RAZERPAY_API_KEY,
  key_secret: RAZERPAY_API_KEY_SECRET,
});