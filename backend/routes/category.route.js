import express from "express"
import upload from "../middlewares/upload.middleware.js"
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js"

const router = express.Router()

// Swagger
/**
 * @swagger
 * tags:
 *   - name: Category
*/

/**
 * @swagger /api/category/create:
 *   post:
 *     summary: Create new category
 *     tags: [Category]
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
 *               description:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.post("/create", upload.single('img'), createCategory)
/**
 * @swagger /api/category/all:
 *   get:
 *     summary: Get all category
 *     tags: [Category]
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.get("/all", getCategories)
/**
 * @swagger /api/category/get/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
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
router.get("/get/:id", getCategoryById)
/**
 * @swagger /api/category/update/{id}:
 *   put:
 *     summary: Update category by id
 *     tags: [Category]
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
 *               description:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: failed
 */
router.put("/update/:id", upload.single('img'), updateCategory)
/**
 * @swagger /api/category/delete/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
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
router.delete("/delete/:id", deleteCategory)

export default router