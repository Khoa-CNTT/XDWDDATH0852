import { body, validationResult } from 'express-validator'

const validateRegister = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Họ và tên không được để trống")
        .matches(/^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƠĂÊÔơăêôƯư\s]+$/u)
        .withMessage("Họ và tên phải nhập chữ có dấu"),

    // body("dob")
    //     .notEmpty().withMessage("Ngày sinh không được để trống")
    //     .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    //     .withMessage("Ngày sinh phải có định dạng DD/MM/YYYY"),

    body("email")
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không hợp lệ"),

    body("password")
        .notEmpty().withMessage("Mật khẩu không được để trống")
        .isLength({ min: 8, max: 20 }).withMessage("Mật khẩu phải từ 8-20 ký tự")
        .matches(/^[A-Za-z]+[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/)
        .withMessage("Mật khẩu phải bắt đầu bằng chữ, chứa số hoặc ký tự đặc biệt"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export default { validateRegister };