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
    const { fullname, email, password, phone_number } = req.body;
    const user = await UserService.registerUserService(fullname, email, password, phone_number)
    if (user.success === false) return res.status(400).json({ message: 'Email already registered' });
    return res.status(200).json({ message: 'Register successfuly' });
})

const loginUserController = TryCatch(async (req, res) => {
    const { phone_number, password } = req.body;
    const user = await UserService.loginUserService(phone_number, password)
    if (user.success === false) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json({ message: 'Login successfuly' });
})

export default {
    getAllUserController,
    registerUserController,
    loginUserController,
}