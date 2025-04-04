import database from '../configs/database.js';
import bcrypt from 'bcryptjs'

const getAllUserService = async () => {
    let result = await database.execute('SELECT * FROM users');
    return result[0];
}

const sendOTP = async (req, res) => {
    const { phone_number } = req.body;

    // Kiểm tra số điện thoại đã có trong `users` chưa
    const [existingUser] = await database.execute("SELECT * FROM users WHERE phone_number = ?", [phone_number]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "Số điện thoại đã đăng ký!" });
    }

    // Tạo mã OTP (6 số ngẫu nhiên)
    const otp = otpService.generateOTP();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn sau 5 phút

    // Lưu OTP vào bảng `otp_codes` (nếu số đã có thì update)
    await database.execute(
        "INSERT INTO otp_codes (phone_number, otp_code, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp_code = ?, expires_at = ?",
        [phone_number, otp, expires_at, otp, expires_at]
    );

    // (Gửi OTP qua SMS)
    return res.status(200).json({ message: "OTP đã được gửi!", phone_number });
};

const registerUserService = async (fullname, email, password, phone_number) => {
    const queryCheckUser = 'SELECT * FROM users WHERE email = ?';
    const [results] = await database.query(queryCheckUser, [email]);
    if (results.length > 0) {
        return { success: false };
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Chèn user mới vào database
    const sql = 'INSERT INTO users (fullname, email, password, phone_number) VALUES (?, ?, ?, ?)';
    const [result] = await database.query(sql, [fullname, email, hashedPassword, phone_number]);

    // Trả về kết quả nếu đăng ký thành công
    return { success: true, userId: result.insertId };
}

const loginUserService = async (phone_number, password) => {
    const sql = 'SELECT * FROM users WHERE phone_number = ?';
    const [results] = await database.query(sql, [phone_number]);
    if (results.length === 0) {
        return { success: false };
    }
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) {
        return { success: false };
    }
    return { success: true, userId: results[0].id };
}


export default {
    getAllUserService,
    sendOTP,
    registerUserService,
    loginUserService,
}