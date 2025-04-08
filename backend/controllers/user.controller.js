import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/index.js"
import TryCatch from "../utils/trycatch.js"

// Đăng ký người dùng
export const registerController = TryCatch(async (req, res) => {
    const { phone_number, password, email, fullname, address, role_name } = req.body

    const existingUser = await User.findOne({ where: { phone_number } })
    if (existingUser) {
        return res.status(400).json({ message: "Số điện thoại đã được sử dụng!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        phone_number,
        password: hashedPassword,
        fullname,
        email,
        address,
        role_name,
    })

    res.status(201).json({ message: "Đăng ký thành công!", user })
})

// Đăng nhập
export const loginController = TryCatch(async (req, res) => {
    const { phone_number, password } = req.body

    const user = await User.findOne({ where: { phone_number } })

    if (!user) {
        return res.status(404).json({ message: "Số điện thoại không tồn tại!" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: "Sai mật khẩu!" })
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role_name },
        "secret_key",
        { expiresIn: "1h" }
    )

    res.json({ message: "Đăng nhập thành công!", token, user })
})

// Lấy danh sách tất cả người dùng
export const getAllUserController = TryCatch(async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }, // bỏ mật khẩu cho an toàn
        order: [['id', 'ASC']] // sắp xếp theo id tăng dần (tuỳ chọn)
    })
    if (!users) {
        return res.status(404).json({ message: "Danh sách không tồn tại!" })
    }
    res.status(200).json({
        message: 'Lấy tất cả danh sách thành công',
        users,
    })
})

// Lấy thông tin một người dùng
export const getUserByIdController = TryCatch(async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } })

    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" })
    }

    res.json(user)
})

// Cập nhật thông tin người dùng
export const updateUserController = TryCatch(async (req, res) => {
    const { id } = req.params
    const { phone_number, password, fullname, address } = req.body

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" })
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password

    await user.update({
        phone_number,
        password: hashedPassword,
        fullname,
        address,
    })

    res.json({ message: "Cập nhật thành công!", user })
})

// Xóa người dùng
export const deleteUserController = TryCatch(async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" })
    }

    await user.destroy()
    res.json({ message: "Xóa người dùng thành công!" })
})

// Đổi mật khẩu
export const changePassword = TryCatch(async (req, res) => {
    const { id } = req.params
    const { currentPassword, newPassword } = req.body

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu hiện tại không đúng!" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await user.update({ password: hashedPassword })

    res.json({ message: "Đổi mật khẩu thành công!" })
})