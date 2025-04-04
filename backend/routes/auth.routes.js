import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
*/

/**
 * @swagger /api/auth/send-otp:
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
router.post('/auth/send-otp', authController.sendOTPController)
/**
 * @swagger /api/auth/send-sms:
 *   post:
 *     summary: Send SMS
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
 *                 example: "0943752093"
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/auth/send-sms', authController.sendSMSController);


export default router