import express from "express";
const router = express.Router();

// Chèn các routes
import userRoutes from './user.route.js'

// Sử dụng các routes
router.use('/users', userRoutes);

// Xuất router ra app.js
export default router;