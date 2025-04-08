import express from 'express'
import { loginController, registerController } from '../controllers/user.controller.js'
const router = express.Router()

// Swagger
/**
 * @swagger
 * tags:
 *   - name: User
 */

/**
 * @swagger /api/users/register:
 *   post:
 *     summary: Register user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: ......
 *               password:
 *                 type: string
 *                 example: ......
 *               email:
 *                 type: string
 *                 example: ......@gmail.com
 *               phone_number:
 *                 type: string
 *                 example: 09xxxxxxx
 *               address:
 *                 type: string
 *                 example: ......
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', registerController) // Đăng ký người dùng
/**
 * @swagger /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "09xxxxxxx"
 *               password:
 *                 type: string
 *                 example: "....."
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', loginController) // Đăng nhập

export default router