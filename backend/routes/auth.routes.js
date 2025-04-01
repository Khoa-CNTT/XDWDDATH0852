import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
*/

/**
 * @swagger /api/send-otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "0912345678"
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/send-otp', authController.sendOTP)

export default router