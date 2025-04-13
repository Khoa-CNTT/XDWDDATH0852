import bcrypt from "bcryptjs"
import {
  sequelize,
  User,
  Category,
  MenuItem,
  Voucher,
  Order,
  OrderDetail,
  Payment,
  Review,
  Message,
  Cart
} from "../models/index.js"

const seedDatabase = async () => {
  try {
    console.log("🚀 Seeding started...")

    await sequelize.sync({ alter: true })
    console.log("🛠️ Database synced!")

    await Promise.all([
      Message.destroy({ where: {} }),
      Review.destroy({ where: {} }),
      Payment.destroy({ where: {} }),
      OrderDetail.destroy({ where: {} }),
      Order.destroy({ where: {} }),
      Voucher.destroy({ where: {} }),
      Cart.destroy({ where: {} }),
      MenuItem.destroy({ where: {} }),
      Category.destroy({ where: {} }),
      User.destroy({ where: {} })
    ])
    console.log("🧹 Old data cleared!")

    // Users
    const users = await Promise.all([
      User.create({
        email: "admin@example.com",
        phone_number: "0987654321",
        password: await bcrypt.hash("123456", 10),
        fullname: "Nguyen Van A",
        address: "Hanoi",
        role_name: "admin"
      }),
      User.create({
        email: "tranthib@example.com",
        phone_number: "0912345678",
        password: await bcrypt.hash("abcdef", 10),
        fullname: "Tran Thi B",
        address: "Ho Chi Minh City",
        role_name: "customer"
      }),
      User.create({
        email: "levanc@example.com",
        phone_number: "0909090909",
        password: await bcrypt.hash("password", 10),
        fullname: "Le Van C",
        address: "Da Nang",
        role_name: "customer"
      })
    ])
    console.log("✅ Users created!")

    // Categories
    const categories = await Category.bulkCreate([
      { name: "Vietnamese Food", description: "Traditional Vietnamese dishes", img: "vietnam_food.jpg" },
      { name: "Beverages", description: "Soft drinks and coffee", img: "beverages.jpg" },
      { name: "Desserts", description: "Sweet treats", img: "desserts.jpg" }
    ])
    console.log("✅ Categories created!")

    // Menu Items
    const menuItems = await MenuItem.bulkCreate([
      { name: "Pho Bo", img: "pho_bo.jpg", price: 50000, cat_Id: categories[0].id, status: "available" },
      { name: "Bun Cha", img: "bun_cha.jpg", price: 55000, cat_Id: categories[0].id, status: "available" },
      { name: "Ca Phe Sua", img: "ca_phe_sua.jpg", price: 25000, cat_Id: categories[1].id, status: "available" },
      { name: "Tra Dao", img: "tra_dao.jpg", price: 30000, cat_Id: categories[1].id, status: "available" },
      { name: "Che Ba Mau", img: "che_ba_mau.jpg", price: 20000, cat_Id: categories[2].id, status: "available" }
    ])
    console.log("✅ Menu items created!")

    // Vouchers
    const vouchers = await Voucher.bulkCreate([
      {
        code: "DISCOUNT10",
        description: "Giảm 10%",
        discount_type: "percent",
        discount_value: 10,
        min_order_amount: 100000,
        max_discount: 20000,
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        limit: 100,
        status: "active"
      },
      {
        code: "FREESHIP",
        description: "Miễn phí vận chuyển",
        discount_type: "flat",
        discount_value: 15000,
        min_order_amount: 50000,
        max_discount: null,
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 15)),
        limit: 50,
        status: "active"
      }
    ])
    console.log("✅ Vouchers created!")

    // Orders
    const orders = await Order.bulkCreate([
      { user_Id: users[1].id, total_price: 75000, voucher_Id: vouchers[0].id, status: "confirmed", payment_status: "paid" },
      { user_Id: users[2].id, total_price: 105000, voucher_Id: vouchers[1].id, status: "pending", payment_status: "unpaid" }
    ])
    console.log("✅ Orders created!")

    // Order Details
    await OrderDetail.bulkCreate([
      { order_Id: orders[0].id, menu_item_Id: menuItems[0].id, quantity: 1, price: 50000, subtotal: 50000 },
      { order_Id: orders[0].id, menu_item_Id: menuItems[2].id, quantity: 1, price: 25000, subtotal: 25000 },
      { order_Id: orders[1].id, menu_item_Id: menuItems[1].id, quantity: 2, price: 55000, subtotal: 110000 }
    ])
    console.log("✅ Order details created!")

    // Payments
    await Payment.bulkCreate([
      {
        order_Id: orders[0].id,
        user_Id: users[1].id,
        total_payment: 75000,
        method: "credit_card",
        status: "success",
        transaction_id: "TXN123456"
      }
    ])
    console.log("✅ Payments created!")

    // Reviews
    await Review.bulkCreate([
      { user_Id: users[1].id, rating: 5, comment: "Rất ngon, sẽ quay lại!" },
      { user_Id: users[2].id, rating: 4, comment: "Dịch vụ tốt, món ăn ổn!" }
    ])
    console.log("✅ Reviews created!")

    // Messages
    await Message.bulkCreate([
      { user_Id: users[1].id, order_Id: orders[0].id, content: "Tôi muốn thay đổi địa chỉ nhận hàng." },
      { user_Id: users[2].id, order_Id: orders[1].id, content: "Có thể thêm món tráng miệng không?" }
    ])
    console.log("✅ Messages created!")

    // Carts
    await Cart.bulkCreate([
      {
        user_id: users[1].id,
        items: [
          { menu_item_id: menuItems[0].id, name: menuItems[0].name, quantity: 1, price: 50000 },
          { menu_item_id: menuItems[2].id, name: menuItems[2].name, quantity: 2, price: 25000 }
        ],
        status: "active"
      },
      {
        user_id: users[2].id,
        items: [
          { menu_item_id: menuItems[1].id, name: menuItems[1].name, quantity: 2, price: 55000 }
        ],
        status: "checkout"
      }
    ])
    console.log("✅ Carts created!")

    console.log("🎉 Seed data inserted successfully!")
    process.exit()
  } catch (error) {
    console.error("❌ Error inserting sample data:", error)
    process.exit(1)
  }
}

seedDatabase()
