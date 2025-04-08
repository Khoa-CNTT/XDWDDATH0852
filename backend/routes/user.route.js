import express from 'express'
import { changePassword, deleteUserController, getAllUserController, getUserByIdController, loginController, registerController, updateUserController } from '../controllers/user.controller.js'
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
/**
 * @swagger /api/users/all:
 *   get:
 *     summary: Get all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/all', getAllUserController) // Lấy danh sách tất cả người dùng
/**
 * @swagger /api/users/get/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/get/:id', getUserByIdController) // Lấy một người dùng
/**
 * @swagger /api/users/update/{id}:
 *   put:
 *     summary: Update one user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "09xxxxxxxx"
 *               password:
 *                 type: string
 *                 example: "...."
 *               fullname:
 *                 type: string
 *                 example: "...."
 *               address:
 *                 type: string
 *                 example: "...."
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put("/update/:id", updateUserController); // Cập nhật thông tin một người dùng
/**
 * @swagger /api/users/delete/{id}:
 *   delete:
 *     summary: Delete one user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete("/delete/:id", deleteUserController); // Xóa thông tin một người dùng
/**
 * @swagger /api/users/change-password/{id}:
 *   put:
 *     summary: Change password of user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "...."
 *               newPassword:
 *                 type: string
 *                 example: "...."
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put("/change-password/:id", changePassword); // Thay đổi mật khẩu

export default router