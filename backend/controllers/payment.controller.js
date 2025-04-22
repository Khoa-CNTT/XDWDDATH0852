import { Payment, Order, User } from "../models/index.js"
import TryCatch from "../utils/trycatch.js"

// Thêm thông tin thanh toán
export const createPayment = TryCatch(async (req, res) => {
  const { order_Id, user_Id, total_payment, method, status, transaction_id } = req.body

  const order = await Order.findByPk(order_Id)
  if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })

  const user = await User.findByPk(user_Id)
  if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" })

  const payment = await Payment.create({
    order_Id,
    user_Id,
    total_payment,
    method,
    status,
    transaction_id,
  })

  res.status(201).json({ message: "Thêm thông tin thanh toán thành công!", payment })
})

// Lấy thông tin thanh toán theo order_Id
export const getPaymentByOrderId = TryCatch(async (req, res) => {
  const { orderId } = req.params

  const payment = await Payment.findOne({
    where: { order_Id: orderId },
    include: [{ model: Order, attributes: ["total_price", "status"] }],
  })

  if (!payment) return res.status(404).json({ message: "Không tìm thấy thông tin thanh toán!" })

  res.json(payment)
})

// Cập nhật trạng thái thanh toán
export const updatePayment = TryCatch(async (req, res) => {
  const { id } = req.params
  const { status, transaction_id } = req.body

  const payment = await Payment.findByPk(id)
  console.log('payment', payment)
  if (!payment) return res.status(404).json({ message: "Thông tin thanh toán không tồn tại!" })

  await payment.update({ status, transaction_id })

  res.json({ message: "Cập nhật trạng thái thanh toán thành công!", payment })
})

// Xóa thông tin thanh toán
export const deletePayment = TryCatch(async (req, res) => {
  const { id } = req.params

  const payment = await Payment.findByPk(id)
  if (!payment) return res.status(404).json({ message: "Thông tin thanh toán không tồn tại!" })

  await payment.destroy()
  res.json({ message: "Xóa thông tin thanh toán thành công!" })
})

// Khởi tạo thanh toán VNPAY
export const initiateVNPAYPayment = TryCatch(async (req, res) => {
  res.status(200).json({ message: "Chức năng tạo thanh toán VNPAY chưa được cài đặt!" })
})

// Xử lý return từ VNPAY
export const vnpayReturn = TryCatch(async (req, res) => {
  res.status(200).json({ message: "Xử lý return từ VNPAY chưa được triển khai!" })
})