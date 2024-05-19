import userService from "../services/user.service.js";
import jwtProvider from "../config/jwtProvider.js";
import bcrypt from 'bcrypt'
import cartService from '../services/cart.service.js'

const register = async(req,res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user.id);

        await cartService.createCart(user);

        return res.status(200).send({jwt,message: "register success"});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if(!user){
            return res.status(404).json({message:'User not found with email ',email});
        }
        const isPasswordCorrect = await bcrypt.compare(password,(await user).password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: 'Invalid password'});
        }
        const jwt = jwtProvider.generateToken(user.id);
        return res.status(200).send({jwt,message:"login success"});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

export default {
    register,
    login
}
