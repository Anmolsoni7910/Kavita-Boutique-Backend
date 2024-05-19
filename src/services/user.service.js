import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwtProvider from "../config/jwtProvider.js";

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, role } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("user already exist with email: ", email);
    }

    password = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    console.log("user created: ", user);
    return user;
  } catch (error) {
    console.log("createUser error - ",error.message);
    throw new Error(error.message);
  }
};

const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("user not found with id: ",userId);
        }
        return user;
    } catch (error) {
        console.log("findUserById error - ",error.message);
        throw new Error(error.message);
    }
};

const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({email});    // {email: email} -> {email}
        if(!user){
            throw new Error("user not found with email: ",email);
        }
        return user;
    } catch (error) {
        console.log("getUserByEmail error - ",error.message);
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async(token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        console.log("userId: ",userId);
        const user = (await findUserById(userId)).populate("addresses");
        if(!user){
            throw new Error("user not exist with id: ",userId);
        }
        return user;
    } catch (error) {
        console.log("getUserProfileByToken error - ",error.message);
        throw new Error(error.message);
    }
};

const getAllUsers = async() => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log("getAllUsers error - ",error.message);
        throw new Error(error.message);
    }
};

export default {
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail,
    getAllUsers,
}