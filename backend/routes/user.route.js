import express from 'express'
import {
  changePassword,
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  loginController,
  registerController,
  updateUserController
} from '../controllers/user.controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
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
 *                 example: Nguyễn Văn A
 *               password:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: nguyenvana@gmail.com
 *               phone_number:
 *                 type: string
 *                 example: 0901234567
 *               address:
 *                 type: string
 *                 example: 123 Đường ABC, TP.HCM
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
router.post('/register', registerController)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập người dùng
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
 *                 example: 0901234567
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/login', loginController)

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/all', getAllUserController)

/**
 * @swagger
 * /api/users/get/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần lấy
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/get/:id', getUserByIdController)

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần cập nhật
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
 *                 example: 0901234567
 *               password:
 *                 type: string
 *                 example: 123456
 *               fullname:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               address:
 *                 type: string
 *                 example: 123 Đường ABC, TP.HCM
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put("/update/:id", updateUserController)

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Xoá người dùng theo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xoá
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete("/delete/:id", deleteUserController)

/**
 * @swagger
 * /api/users/change-password/{id}:
 *   put:
 *     summary: Đổi mật khẩu người dùng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần đổi mật khẩu
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
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: 654321
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Mật khẩu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put("/change-password/:id", changePassword)

export default router