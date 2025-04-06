import sequelize from '../config/database.js';

// Import các model
import User from './users.js';
import Category from './categories.js';
import MenuItem from './menu_items.js';
import Voucher from './vouchers.js';
import Order from './orders.js';
import OrderDetail from './order_details.js';
import Payment from './payments.js';
import Review from './reviews.js';
import Message from './messages.js';

// Thiết lập quan hệ giữa các bảng

// User - Order (1 user có thể có nhiều đơn hàng)
User.hasMany(Order, { foreignKey: 'user_Id' });
Order.belongsTo(User, { foreignKey: 'user_Id' });

// Category - MenuItem (1 danh mục có nhiều món ăn)
Category.hasMany(MenuItem, { foreignKey: 'cat_Id' });
MenuItem.belongsTo(Category, { foreignKey: 'cat_Id' });

// Order - Voucher (Mỗi đơn hàng có thể sử dụng một mã giảm giá)
Voucher.hasMany(Order, { foreignKey: 'voucher_Id' });
Order.belongsTo(Voucher, { foreignKey: 'voucher_Id' });

// Order - OrderDetail (1 đơn hàng có nhiều chi tiết)
Order.hasMany(OrderDetail, { foreignKey: 'order_Id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_Id' });

// MenuItem - OrderDetail (1 món ăn có thể xuất hiện trong nhiều chi tiết đơn hàng)
MenuItem.hasMany(OrderDetail, { foreignKey: 'menu_item_Id' });
OrderDetail.belongsTo(MenuItem, { foreignKey: 'menu_item_Id' });

// Order - Payment (Mỗi đơn hàng có thể có nhiều lần thanh toán)
Order.hasMany(Payment, { foreignKey: 'order_Id' });
Payment.belongsTo(Order, { foreignKey: 'order_Id' });

// User - Payment (1 user có thể có nhiều thanh toán)
User.hasMany(Payment, { foreignKey: 'user_Id' });
Payment.belongsTo(User, { foreignKey: 'user_Id' });

// User - Review (1 user có thể viết nhiều đánh giá)
User.hasMany(Review, { foreignKey: 'user_Id' });
Review.belongsTo(User, { foreignKey: 'user_Id' });

// User - Message (1 user có thể gửi nhiều tin nhắn)
User.hasMany(Message, { foreignKey: 'user_Id' });
Message.belongsTo(User, { foreignKey: 'user_Id' });

// Order - Message (Mỗi đơn hàng có thể có nhiều tin nhắn)
Order.hasMany(Message, { foreignKey: 'order_Id' });
Message.belongsTo(Order, { foreignKey: 'order_Id' });


const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // { force: true } để xóa database
        console.log('✅ Database synced successfully!');
    } catch (error) {
        console.error('❌ Database sync failed:', error);
    }
};


export {
    sequelize,
    syncDB,
    User,
    Category,
    MenuItem,
    Voucher,
    Order,
    OrderDetail,
    Payment,
    Review,
    Message,
};
