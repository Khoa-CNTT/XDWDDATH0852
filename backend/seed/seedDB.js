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
} from "../models/index.js";

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        console.log("✅ Database structure recreated!");

        // Users
        const users = await User.bulkCreate([
            { phone_number: "0987654321", password: "123456", fullname: "Nguyen Van A", address: "Hanoi", role_name: "admin" },
            { phone_number: "0912345678", password: "abcdef", fullname: "Tran Thi B", address: "Ho Chi Minh City", role_name: "customer" },
            { phone_number: "0909090909", password: "password", fullname: "Le Van C", address: "Da Nang", role_name: "customer" },
        ]);

        // Categories
        const categories = await Category.bulkCreate([
            { name: "Vietnamese Food", description: "Traditional Vietnamese dishes" },
            { name: "Beverages", description: "Soft drinks and coffee" },
            { name: "Desserts", description: "Sweet treats" },
        ]);

        // Menu Items
        const menuItems = await MenuItem.bulkCreate([
            { name: "Pho Bo", img: "pho_bo.jpg", price: 50000, cat_Id: categories[0].id, status: "available" },
            { name: "Bun Cha", img: "bun_cha.jpg", price: 55000, cat_Id: categories[0].id, status: "available" },
            { name: "Ca Phe Sua", img: "ca_phe_sua.jpg", price: 25000, cat_Id: categories[1].id, status: "available" },
            { name: "Tra Dao", img: "tra_dao.jpg", price: 30000, cat_Id: categories[1].id, status: "available" },
            { name: "Che Ba Mau", img: "che_ba_mau.jpg", price: 20000, cat_Id: categories[2].id, status: "available" },
        ]);

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
        ]);

        // Orders
        const orders = await Order.bulkCreate([
            { user_Id: users[1].id, total_price: 75000, voucher_Id: vouchers[0].id, status: "confirmed", payment_status: "paid" },
            { user_Id: users[2].id, total_price: 105000, voucher_Id: vouchers[1].id, status: "pending", payment_status: "unpaid" },
        ]);

        // Order Details
        await OrderDetail.bulkCreate([
            { order_Id: orders[0].id, menu_item_Id: menuItems[0].id, quantity: 1, price: 50000, subtotal: 50000 },
            { order_Id: orders[0].id, menu_item_Id: menuItems[2].id, quantity: 1, price: 25000, subtotal: 25000 },
            { order_Id: orders[1].id, menu_item_Id: menuItems[1].id, quantity: 2, price: 55000, subtotal: 110000 },
        ]);

        // Payments
        await Payment.bulkCreate([
            { order_Id: orders[0].id, user_Id: users[1].id, total_payment: 75000, method: "credit_card", status: "success", transaction_id: "TXN123456" },
        ]);

        // Reviews
        await Review.bulkCreate([
            { user_Id: users[1].id, rating: 5, comment: "Rất ngon, sẽ quay lại!" },
            { user_Id: users[2].id, rating: 4, comment: "Dịch vụ tốt, món ăn ổn!" },
        ]);

        // Messages
        await Message.bulkCreate([
            { user_Id: users[1].id, order_Id: orders[0].id, content: "Tôi muốn thay đổi địa chỉ nhận hàng." },
            { user_Id: users[2].id, order_Id: orders[1].id, content: "Có thể thêm món tráng miệng không?" },
        ]);

        console.log("✅ Sample data inserted successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error inserting sample data:", error);
        process.exit(1);
    }
};

seedDatabase();