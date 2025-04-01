import TryCatch from "../middlewares/trycatch.js";
import UserService from '../services/user.service.js'

const getAllUserController = TryCatch(async (req, res) => {
    let result = await UserService.getAllUserService()
    res.status(200).json({
        message: 'Get all users successfully',
        data: result,
    });
})

const registerUserController = TryCatch(async (req, res) => {
    const { fullname, email, password } = req.body;
    const user = await UserService.registerUserService(fullname, email, password)
    if (user.success === false) return res.status(400).json({ message: 'Email already registered' });
    return res.status(200).json({ message: 'Register successful' });
})







export default {
    getAllUserController,
    registerUserController,
}