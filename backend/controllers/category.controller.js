import { Category } from "../models/index.js";

// Thêm danh mục mới
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Xử lý đường dẫn hình ảnh
    let imgPath = null;
    if (req.file) {
      imgPath = `/uploads/${req.file.filename}`;
    }

    // Kiểm tra xem danh mục đã tồn tại chưa
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ message: "Danh mục đã tồn tại!" });
    }

    // Tạo danh mục mới
    const category = await Category.create({ name, description, img: imgPath });

    res.status(201).json({ message: "Thêm danh mục thành công!", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Lấy danh sách tất cả danh mục
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Lấy chi tiết danh mục theo ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại!" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại!" });
    }

    let imgPath = category.img;
    if (req.file) {
      imgPath = `/uploads/${req.file.filename}`;
    }

    await category.update({ name, description, img: imgPath });

    res.json({ message: "Cập nhật danh mục thành công!", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại!" });
    }

    await category.destroy();
    res.json({ message: "Xóa danh mục thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};