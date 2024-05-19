import userService from '../services/user.service.js'

const getUserProfile = async(req,res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(404).send({error:"token not found"});
        }

        const user = await userService.getUserProfileByToken(token);

        return res.status(200).send(user);
    } catch (error) {
        console.log("getUserProfile error - ",error)
        return res.status(500).send({error:error.message})
    }
}

const getAllUsers = async(req,res) => {
    try {
        const users=await userService.getAllUsers()
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

export default {
    getAllUsers,
    getUserProfile
}