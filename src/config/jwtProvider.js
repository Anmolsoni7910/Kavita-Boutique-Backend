import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const SECERET_KEY = process.env.SECERET_KEY;

const generateToken = (userId) => {
    const token = jwt.sign({userId},SECERET_KEY,{expiresIn:'48h'});
    // console.log("generateToken userId:",userId);
    // console.log("generateToken token:",token);
    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token,SECERET_KEY);
    // console.log("decodedToken: ",decodedToken);
    return decodedToken.userId;
}

export default {
    generateToken,
    getUserIdFromToken
}