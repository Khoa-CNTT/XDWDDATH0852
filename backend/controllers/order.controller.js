import { Order, OrderDetail, User, Voucher, MenuItem } from "../models/index.js"
import TryCatch from "../utils/trycatch.js"

// Tạo đơn hàng
export const createOrder = TryCatch(async (req, res) => {
  const { user_Id, total_price, voucher_code, status, payment_status } = req.body;

  // Kiểm tra user có tồn tại không
  const user = await User.findByPk(user_Id);
  if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" });

  let voucher_Id = null;

  // Nếu có voucher_code, kiểm tra voucher có tồn tại không
  if (voucher_code) {
    const voucher = await Voucher.findOne({ where: { code: voucher_code } });

    if (!voucher) {
      return res.status(404).json({ message: "Voucher không hợp lệ!" });
    }

    // Kiểm tra hiệu lực
    const now = new Date();
    if (now < new Date(voucher.start_date) || now > new Date(voucher.end_date)) {
      return res.status(400).json({ message: "Voucher đã hết hạn hoặc chưa có hiệu lực!" });
    }

    // Kiểm tra số lượt sử dụng
    if (voucher.limit > 0) {
      const usedCount = await Order.count({ where: { voucher_Id: voucher.id } });
      if (usedCount >= voucher.limit) {
        return res.status(400).json({ message: "Voucher đã hết lượt sử dụng!" });
      }
    }

    // Kiểm tra đơn hàng tối thiểu
    if (total_price < voucher.min_order_amount) {
      return res.status(400).json({
        message: `Đơn hàng không đạt giá trị tối thiểu để sử dụng voucher (${voucher.min_order_amount})`
      });
    }

    voucher_Id = voucher.id;
  }

  // Tạo đơn hàng
  const order = await Order.create({
    user_Id,
    total_price,
    voucher_Id,
    status,
    payment_status
  });

  res.status(201).json({
    message: "Tạo đơn hàng thành công!",
    order,
    voucher_code: voucher_code || null
  });
})

// Lấy danh sách đơn hàng
export const getAllOrders = TryCatch(async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, attributes: ["fullname", "phone_number"] },
      { model: Voucher, attributes: ["code"] }
    ],
  })
  res.json(orders)
})

// Lấy thông tin đơn hàng theo ID
export const getOrderById = TryCatch(async (req, res) => {
  const { id } = req.params
  const order = await Order.findByPk(id, {
    include: [
      { model: User, attributes: ["fullname", "phone_number", "address"] },
      { model: Voucher, attributes: ["code"] }
    ],
  })

  if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })
  res.json(order)
})

// Lấy thông tin đơn hàng theo User ID
export const getOrderByUserID = TryCatch(async (req, res) => {
  const { userId } = req.params

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" })

  const orders = await Order.findAll({
    where: { user_Id: userId },
    include: [
      { model: Voucher, attributes: ["code"] },
      {
        model: OrderDetail,
        include: [{ model: MenuItem, attributes: ["name", "img", "price"] }]
      }
    ],
    order: [['created_at', 'DESC']]
  })

  res.json(orders || [])
})

// Cập nhật đơn hàng
export const updateOrder = TryCatch(async (req, res) => {
  const { id } = req.params
  const { status, payment_status } = req.body

  const order = await Order.findByPk(id)
  if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })

  await order.update({ status, payment_status })
  res.json({ message: "Cập nhật đơn hàng thành công!", order })
})

// Hủy đơn hàng
export const cancelOrder = TryCatch(async (req, res) => {
  const { id } = req.params

  const order = await Order.findByPk(id)
  if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })

  if (!['pending', 'processing'].includes(order.status.toLowerCase())) {
    return res.status(400).json({ message: "Không thể hủy đơn hàng ở trạng thái này!" })
  }

  await order.update({ status: 'cancelled' })
  res.json({ message: "Hủy đơn hàng thành công!", order })
})

// Xóa đơn hàng
export const deleteOrder = TryCatch(async (req, res) => {
  const { id } = req.params

  const order = await Order.findByPk(id)
  if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })

  await order.destroy()
  res.json({ message: "Xóa đơn hàng thành công!" })
})

// Tổng doanh thu
export const getRevenue = TryCatch(async (req, res) => {
  // Lấy tất cả đơn hàng đã hoàn thành
  const orders = await Order.findAll({
    where: { status: 'completed' }
  });

  // Tính tổng doanh thu
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  res.json({ revenue: totalRevenue });
})