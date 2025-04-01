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
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: user12345
 *               email:
 *                 type: string
 *                 example: abcde@gmail.com
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', Validate.validateRegister, UserController.registerUserController)


export default router