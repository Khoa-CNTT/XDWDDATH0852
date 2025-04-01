import otpService from "../services/otp.service.js";

// Send OTP
const sendOTP = async (req, res) => {
    const { phone_number } = req.body;

    // Kiểm tra số điện thoại có hợp lệ không (bạn có thể thêm logic kiểm tra SĐT ở đây)
    if (!phone_number) {
        return res.status(400).json({ message: "Số điện thoại không hợp lệ!" });
    }

    // Tạo mã OTP
    const otp = otpService.generateOTP();

    // Lưu OTP vào database
    await otpService.saveOTP(phone_number, otp);

    // (Gửi OTP qua SMS - cần tích hợp API gửi tin nhắn SMS)
    console.log(`OTP gửi đến ${phone_number}: ${otp}`);

    return res.status(200).json({ message: "OTP đã được gửi!" });
};

export default {
    sendOTP,
}