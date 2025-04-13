import { OrderDetail, Order, MenuItem } from "../models/index.js"

// Thêm chi tiết đơn hàng
export const createOrderDetail = async (req, res) => {
  try {
    const { order_Id, menu_item_Id, quantity, price } = req.body

    const order = await Order.findByPk(order_Id)
    if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" })

    const menuItem = await MenuItem.findByPk(menu_item_Id)
    if (!menuItem) return res.status(404).json({ message: "Món ăn không tồn tại!" })

    const subtotal = quantity * price

    const orderDetail = await OrderDetail.create({ order_Id, menu_item_Id, quantity, price, subtotal })

    res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công!", orderDetail })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Lấy danh sách chi tiết đơn hàng theo order_Id
export const getOrderDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params
    const orderDetails = await OrderDetail.findAll({
      where: { order_Id: orderId },
      include: [{ model: MenuItem, attributes: ["name", "price"] }],
    })

    if (orderDetails.length === 0) {
      return res.status(404).json({ message: "Không có chi tiết đơn hàng nào!" })
    }

    res.json(orderDetails)
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Cập nhật chi tiết đơn hàng
export const updateOrderDetail = async (req, res) => {
  try {
    const { id } = req.params
    const { quantity, price } = req.body

    const orderDetail = await OrderDetail.findByPk(id)
    if (!orderDetail) return res.status(404).json({ message: "Chi tiết đơn hàng không tồn tại!" })

    const subtotal = quantity * price

    await orderDetail.update({ quantity, price, subtotal })

    res.json({ message: "Cập nhật chi tiết đơn hàng thành công!", orderDetail })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Xóa chi tiết đơn hàng
export const deleteOrderDetail = async (req, res) => {
  try {
    const { id } = req.params

    const orderDetail = await OrderDetail.findByPk(id)
    if (!orderDetail) return res.status(404).json({ message: "Chi tiết đơn hàng không tồn tại!" })

    await orderDetail.destroy()
    res.json({ message: "Xóa chi tiết đơn hàng thành công!" })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}