import express from "express";
const router = express.Router();

// Chèn các routes
import userRoutes from './user.route.js'
import categoryRoutes from './category.route.js' 

// Sử dụng các routes
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);

// Xuất router ra app.js
export default router;