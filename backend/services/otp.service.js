import database from "../configs/database.js";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const saveOTP = async (phone_number, otp) => {
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);
    await database.execute(
        "INSERT INTO otp_codes (phone_number, otp_code, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp_code = ?, expires_at = ?",
        [phone_number, otp, expires_at, otp, expires_at]
    );
}

const verifyOTP = async (phone_number, otp) => {
    const [otpRecord] = await database.execute(
        "SELECT * FROM otp_codes WHERE phone_number = ? AND otp_code = ? AND expires_at > NOW()",
        [phone_number, otp_code]
    );

    if (otpRecord.length === 0) return false;

    await database.execute("DELETE FROM otp_codes WHERE phone_number = ?", [phone_number]);

    return true;
}

export default {
    generateOTP,
    saveOTP,
    verifyOTP,
}