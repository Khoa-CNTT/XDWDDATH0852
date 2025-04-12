import express from "express"
import upload from "../middlewares/upload.middleware.js"
import { createMenuItem, deleteMenuItem, getMenuItemById, getMenuItems, updateMenuItem } from "../controllers/menuItem.controller.js"

const router = express.Router()

// Swagger
/**
 * @swagger
 * tags:
 *   - name: Category
*/

/**
 * @swagger /api/menu-items/create:
 *   post:
 *     summary: Create a new food
 *     tags: [Menu-Food]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               cat_Id:
 *                 type: integer
 *               status:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.post("/create", upload.single('img'), createMenuItem)
/**
 * @swagger /api/menu-items/all:
 *   get:
 *     summary: Get all menu
 *     tags: [Menu-Food]
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.get("/all", getMenuItems)
/**
 * @swagger /api/menu-items/{id}:
 *   get:
 *     summary: Get food from menu by id
 *     tags: [Menu-Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.get("/:id", getMenuItemById)
/**
 * @swagger /api/menu-items/update/{id}:
 *   put:
 *     summary: Update a food by id
 *     tags: [Menu-Food]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               cat_Id:
 *                 type: integer
 *               status:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.put("/update/:id", upload.single('img'), updateMenuItem)
/**
 * @swagger /api/menu-items/delete/{id}:
 *   delete:
 *     summary: Delete a food by id
 *     tags: [Menu-Food]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
*         description: success
 *       400:
 *         description: failed
 */
router.delete("/delete/:id", deleteMenuItem)

export default router