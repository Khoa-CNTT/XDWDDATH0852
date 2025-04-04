import { body, validationResult } from 'express-validator'

const validateRegister = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Họ và tên không được để trống')
        .matches(/^[\p{L}\s]+$/u).withMessage('Họ và tên chỉ được chứa chữ và khoảng trắng (có dấu)'),

    body('phone_number')
        .notEmpty().withMessage('Số điện thoại không được để trống')
        .matches(/^0[0-9]{9}$/).withMessage('Số điện thoại không đủ 9 số'),

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

const validateLogin = [
    body('phone').matches(/^0[0-9]{9}$/).withMessage('Số điện thoại không hợp lệ'),
    body('password').isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự')
]

export default { 
    validateRegister, 
    validateLogin, 
};