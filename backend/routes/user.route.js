import express from 'express'
const router = express.Router()

import UserController from '../controllers/user.controller.js'
import Validate from '../middlewares/validate.js'

/**
 * @swagger
 * tags:
 *   - name: User
 */

/**
 * @swagger /api/all:
 *   get:
 *     summary: Get all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/all', UserController.getAllUserController)
/**
 * @swagger /api/register:
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
 *                 example: "Nguyễn Văn An"
 *               password:
 *                 type: string
 *                 example: user12345
 *               email:
 *                 type: string
 *                 example: abcde@gmail.com
 *               phone_number:
 *                 type: string
 *                 example: 09xxxxxxx
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', Validate.validateRegister, UserController.registerUserController)
/**
 * @swagger /api/login:
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
 *                 example: 09xxxxxxx
 *               password:
 *                 type: string
 *                 example: user12345
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', Validate.validateLogin, UserController.loginUserController)


export default router