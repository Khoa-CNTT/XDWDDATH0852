import { Cart, MenuItem, sequelize } from "../models/index.js"
import TryCatch from "../utils/trycatch.js"

// Lấy giỏ hàng của user
export const getCart = TryCatch(async (req, res) => {
    const { userId } = req.params

    let cart = await Cart.findOne({
        where: { user_id: userId, status: 'active' }
    })

    if (!cart) {
        cart = await Cart.create({
            user_id: userId,
            items: [],
            total: 0,
        })
    }

    const cartItems = cart.items || []
    const menuItemIds = cartItems.map(item => item.menu_item_id)

    const menuItems = await MenuItem.findAll({
        where: { id: menuItemIds },
        attributes: ['id', 'name', 'img', 'price']
    })

    const itemsWithDetails = cartItems.map(item => {
        const menuItem = menuItems.find(m => m.id === item.menu_item_id)
        return {
            menu_item_id: item.menu_item_id,
            name: menuItem?.name || 'Unknown Product',
            price: item.price,
            quantity: item.quantity,
            image: menuItem?.img || null,
            MenuItem: menuItem?.toJSON() || null
        }
    })

    const cartData = cart.toJSON()
    cartData.items = itemsWithDetails
    cartData.total = Number(cartData.total)

    res.json(cartData)
})

// Thêm sản phẩm vào giỏ hàng
export const addToCart = TryCatch(async (req, res) => {
    let transaction;
    try {
        const { userId } = req.params;
        const { menuItemId, quantity } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!userId || !menuItemId || !quantity) {
            return res.status(400).json({
                message: "Thiếu thông tin cần thiết!",
                details: { userId, menuItemId, quantity }
            });
        }

        console.log('Adding to cart:', { userId, menuItemId, quantity });

        // Bắt đầu transaction
        transaction = await sequelize.transaction();

        // Tìm hoặc tạo giỏ hàng
        let cart = await Cart.findOne({
            where: { user_id: userId, status: 'active' },
            transaction
        });

        if (!cart) {
            console.log('Creating new cart for user:', userId);
            cart = await Cart.create({
                user_id: userId,
                items: [],
                total: 0,
                status: 'active'
            }, { transaction });
        }

        // Tìm sản phẩm
        const menuItem = await MenuItem.findByPk(menuItemId, { transaction });
        if (!menuItem) {
            await transaction.rollback();
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        console.log('Found menu item:', menuItem.toJSON());

        // Lấy danh sách sản phẩm hiện tại trong giỏ hàng
        const items = cart.items || [];

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingItemIndex = items.findIndex(item => item.menu_item_id === menuItemId);

        if (existingItemIndex >= 0) {
            // Cập nhật số lượng nếu đã có
            console.log('Updating existing cart item');
            items[existingItemIndex].quantity += Number(quantity);
        } else {
            // Thêm mới sản phẩm vào giỏ hàng
            console.log('Adding new item to cart');
            items.push({
                menu_item_id: menuItemId,
                quantity: Number(quantity),
                price: Number(menuItem.price)
            });
        }

        // Cập nhật giỏ hàng
        await cart.update({ items }, { transaction });

        // Commit transaction
        await transaction.commit();

        // Lấy lại giỏ hàng với thông tin đầy đủ
        cart = await Cart.findOne({
            where: { id: cart.id }
        });

        // Lấy thông tin chi tiết của các sản phẩm trong giỏ hàng
        const cartItems = cart.items || [];
        const menuItemIds = cartItems.map(item => item.menu_item_id);

        // Lấy thông tin sản phẩm từ database
        const menuItems = await MenuItem.findAll({
            where: { id: menuItemIds },
            attributes: ['id', 'name', 'img', 'price']
        });

        // Kết hợp thông tin sản phẩm với số lượng trong giỏ hàng
        const itemsWithDetails = cartItems.map(item => {
            const menuItem = menuItems.find(m => m.id === item.menu_item_id);
            return {
                id: item.menu_item_id,
                name: menuItem ? menuItem.name : 'Unknown Product',
                price: item.price,
                quantity: item.quantity,
                image: menuItem ? menuItem.img : null
            };
        });

        // Chuyển đổi dữ liệu để đảm bảo các giá trị số được xử lý đúng
        const cartData = cart.toJSON();
        cartData.items = itemsWithDetails;
        cartData.total = Number(cartData.total);

        console.log('Final cart:', cartData);
        res.json(cartData);
    } catch (error) {
        // Rollback transaction nếu có lỗi
        if (transaction) {
            await transaction.rollback();
        }
        console.error("Error adding to cart:", error);
        res.status(500).json({
            message: "Lỗi server!",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
})

// Cập nhật số lượng sản phẩm
export const updateCartItem = TryCatch(async (req, res) => {
    const { userId, itemId } = req.params
    const { quantity } = req.body

    if (!userId || !itemId || !quantity) {
        return res.status(400).json({ message: "Thiếu thông tin cần thiết!" })
    }

    const transaction = await sequelize.transaction()

    try {
        const cart = await Cart.findOne({
            where: { user_id: userId, status: 'active' },
            transaction
        })

        if (!cart) {
            await transaction.rollback()
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" })
        }

        const items = cart.items || []
        const index = items.findIndex(item => item.menu_item_id === Number(itemId))

        if (index === -1) {
            await transaction.rollback()
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" })
        }

        items[index].quantity = Number(quantity)
        await cart.update({ items }, { transaction })
        await transaction.commit()

        const updatedCart = await Cart.findOne({ where: { id: cart.id } })
        const updatedItems = updatedCart.items || []
        const menuItemIds = updatedItems.map(item => item.menu_item_id)
        const menuItems = await MenuItem.findAll({
            where: { id: menuItemIds },
            attributes: ['id', 'name', 'img', 'price']
        })

        const itemsWithDetails = updatedItems.map(item => {
            const menuItem = menuItems.find(m => m.id === item.menu_item_id)
            return {
                menu_item_id: item.menu_item_id,
                name: menuItem?.name || 'Unknown Product',
                price: item.price,
                quantity: item.quantity,
                image: menuItem?.img || null,
                MenuItem: menuItem?.toJSON() || null
            }
        })

        const cartData = updatedCart.toJSON()
        cartData.items = itemsWithDetails
        cartData.total = Number(cartData.total)

        res.json({ message: "Cập nhật giỏ hàng thành công!", cart: cartData })
    } catch (error) {
        await transaction.rollback()
        throw error
    }
})

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = TryCatch(async (req, res) => {
    const { userId, itemId } = req.params

    if (!userId || !itemId) {
        return res.status(400).json({ message: "Thiếu thông tin cần thiết!" })
    }

    const transaction = await sequelize.transaction()

    try {
        const cart = await Cart.findOne({
            where: { user_id: userId, status: 'active' },
            transaction
        })

        if (!cart) {
            await transaction.rollback()
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" })
        }

        const items = cart.items || []
        const updatedItems = items.filter(item => item.menu_item_id !== Number(itemId))

        if (updatedItems.length === items.length) {
            await transaction.rollback()
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" })
        }

        await cart.update({ items: updatedItems }, { transaction })
        await transaction.commit()

        const updatedCart = await Cart.findOne({ where: { id: cart.id } })
        const cartItems = updatedCart.items || []
        const menuItemIds = cartItems.map(item => item.menu_item_id)
        const menuItems = await MenuItem.findAll({
            where: { id: menuItemIds },
            attributes: ['id', 'name', 'img', 'price']
        })

        const itemsWithDetails = cartItems.map(item => {
            const menuItem = menuItems.find(m => m.id === item.menu_item_id)
            return {
                id: item.menu_item_id,
                name: menuItem?.name || 'Unknown Product',
                price: item.price,
                quantity: item.quantity,
                image: menuItem?.img || null
            }
        })

        const cartData = updatedCart.toJSON()
        cartData.items = itemsWithDetails
        cartData.total = Number(cartData.total)

        res.json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công!", cart: cartData })
    } catch (error) {
        await transaction.rollback()
        throw error
    }
})

// Xóa toàn bộ giỏ hàng
export const clearCart = TryCatch(async (req, res) => {
    const { userId } = req.params

    const transaction = await sequelize.transaction()

    try {
        const cart = await Cart.findOne({
            where: { user_id: userId, status: 'active' },
            transaction
        })

        if (!cart) {
            await transaction.rollback()
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" })
        }

        await cart.update({ items: [], total: 0 }, { transaction })
        await transaction.commit()

        res.json({ message: "Đã xóa giỏ hàng thành công!" })
    } catch (error) {
        await transaction.rollback()
        throw error
    }
})

// Lấy số lượng sản phẩm trong giỏ hàng
export const getCartCount = TryCatch(async (req, res) => {
    const { userId } = req.params

    const cart = await Cart.findOne({
        where: { user_id: userId, status: 'active' }
    })

    const count = cart?.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0

    res.json({ count })
})