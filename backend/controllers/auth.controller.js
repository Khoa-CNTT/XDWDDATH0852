import otpService from "../services/otp.service.js";
import sendSMS from '../services/sendSMS.service.js';

// Send SMS
const sendSMSController = async (req, res) => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ success: false, message: 'Missing phone' });
    }

    const result = await sendSMS(phone_number);

    if (result.success) {
        res.status(200).json({ success: true, sid: result.sid });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
};

// Send OTP
const sendOTPController = async (req, res) => {
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
    sendSMSController,
    sendOTPController,
}