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

