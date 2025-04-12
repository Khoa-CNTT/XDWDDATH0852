import { MenuItem, Category } from "../models/index.js"

// Thêm món ăn
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, cat_Id, status, img } = req.body

    // Kiểm tra danh mục có tồn tại không
    const category = await Category.findByPk(cat_Id)
    if (!category) {
      return res.status(400).json({ message: "Danh mục không tồn tại!" })
    }

    const menuItem = await MenuItem.create({
      name,
      price,
      cat_Id,
      status,
      img,
    })

    res.status(201).json({ message: "Món ăn đã được thêm!", menuItem })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Lấy danh sách tất cả món ăn
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [{ model: Category, attributes: ["name"] }]
    })
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Lấy thông tin một món ăn
export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params
    const menuItem = await MenuItem.findByPk(id, {
      include: [{ model: Category, attributes: ["name"] }]
    })

    if (!menuItem) {
      return res.status(404).json({ message: "Món ăn không tồn tại!" })
    }

    res.json(menuItem)
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Cập nhật món ăn
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, cat_Id, status, img } = req.body

    const menuItem = await MenuItem.findByPk(id)
    if (!menuItem) {
      return res.status(404).json({ message: "Món ăn không tồn tại!" })
    }

    // Kiểm tra danh mục có tồn tại không
    if (cat_Id) {
      const category = await Category.findByPk(cat_Id)
      if (!category) {
        return res.status(400).json({ message: "Danh mục không tồn tại!" })
      }
    }

    await menuItem.update({
      name,
      price,
      cat_Id,
      status,
      img,
    })

    res.json({ message: "Cập nhật món ăn thành công!", menuItem })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}

// Xóa món ăn
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params
    const menuItem = await MenuItem.findByPk(id)
    if (!menuItem) {
      return res.status(404).json({ message: "Món ăn không tồn tại!" })
    }

    await menuItem.destroy()
    res.json({ message: "Xóa món ăn thành công!" })
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error })
  }
}