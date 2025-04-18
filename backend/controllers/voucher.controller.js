import Voucher from "../models/vouchers.js"
import TryCatch from '../utils/trycatch.js'

// Thêm voucher mới
export const createVoucher = TryCatch(async (req, res) => {
    const newVoucher = await Voucher.create(req.body)
    res.status(201).json({ message: "Tạo voucher thành công!", voucher: newVoucher })
})

// Lấy danh sách tất cả voucher
export const getVouchers = TryCatch(async (req, res) => {
    const vouchers = await Voucher.findAll()
    res.status(200).json(vouchers)
})

// Lấy chi tiết một voucher theo ID
export const getVoucherById = TryCatch(async (req, res) => {
    const { id } = req.params
    const voucher = await Voucher.findByPk(id)
    if (!voucher) {
        return res.status(404).json({ message: "Voucher không tồn tại!" })
    }
    res.status(200).json(voucher)
})

// Cập nhật voucher
export const updateVoucher = TryCatch(async (req, res) => {
    const { id } = req.params
    const [updated] = await Voucher.update(req.body, { where: { id } })

    if (!updated) {
        return res.status(404).json({ message: "Voucher không tồn tại hoặc không có thay đổi!" })
    }

    const updatedVoucher = await Voucher.findByPk(id)
    res.status(200).json({ message: "Cập nhật voucher thành công!", voucher: updatedVoucher })
})

// Xóa voucher
export const deleteVoucher = TryCatch(async (req, res) => {
    const { id } = req.params
    const deleted = await Voucher.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({ message: "Voucher không tồn tại!" })
    }

    res.status(200).json({ message: "Xóa voucher thành công!" })
})
