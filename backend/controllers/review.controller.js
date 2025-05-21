import { OrderDetail, Review, User } from "../models/index.js"
import TryCatch from '../utils/trycatch.js'

// Thêm đánh giá
export const createReview = TryCatch(async (req, res) => {
    try {
        const { menuItemId, orderId, rating, comment, userId } = req.body
        const orderDetail = await OrderDetail.findOne({
            where: {
                order_Id: orderId,
                menu_item_Id: menuItemId,
            },
        })

        if (!orderDetail) {
            return res
                .status(400)
                .json({ message: "Bạn chưa mua sản phẩm này trong đơn hàng này." })
        }

        const newReview = await Review.create({
            user_Id: userId,
            menu_item_Id: menuItemId,
            order_Id: orderId,
            rating,
            comment,
        })

        res.status(201).json(newReview)
    } catch (error) {
        console.error("Lỗi khi tạo đánh giá:", error)
        res.status(500).json({ message: "Đã có lỗi xảy ra khi tạo đánh giá." })
    }
})

// Lấy danh sách đánh giá
export const getReviews = TryCatch(async (req, res) => {
    const reviews = await Review.findAll({
        include: [{ model: User, attributes: ["fullname"] }],
        order: [["created_at", "DESC"]],
    })

    res.status(200).json(reviews)
})

// Lấy chi tiết đánh giá theo ID
export const getReviewById = TryCatch(async (req, res) => {
    const { id } = req.params

    const review = await Review.findByPk(id, {
        include: [{ model: User, attributes: ["fullname"] }],
    })

    if (!review) return res.status(404).json({ message: "Không tìm thấy đánh giá!" })

    res.status(200).json(review)
})

// Cập nhật đánh giá
export const updateReview = TryCatch(async (req, res) => {
    const { id } = req.params
    const { rating, comment } = req.body

    const review = await Review.findByPk(id)
    if (!review) return res.status(404).json({ message: "Đánh giá không tồn tại!" })

    await review.update({ rating, comment, updated_at: new Date() })

    res.status(200).json({ message: "Cập nhật đánh giá thành công!", review })
})

// Xóa đánh giá
export const deleteReview = TryCatch(async (req, res) => {
    const { id } = req.params

    const review = await Review.findByPk(id)
    if (!review) return res.status(404).json({ message: "Đánh giá không tồn tại!" })

    await review.destroy()
    res.status(200).json({ message: "Xóa đánh giá thành công!" })
})


export const getReviewByProductID = TryCatch(async (req, res) => {
    try {
        const menuItemId = req.params.id

        const reviews = await Review.findAll({
            where: { menu_item_Id: menuItemId },
            include: [
                {
                    model: User,
                    attributes: ["fullname"],
                },
            ],
            order: [["created_at", "DESC"]],
        })

        const totalRating = reviews.reduce(
            (sum, review) => sum + parseFloat(review.rating),
            0
        )
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

        res.status(200).json({ averageRating, reviews })
    } catch (error) {
        console.error("Lỗi khi lấy đánh giá sản phẩm:", error)
        res
            .status(500)
            .json({ message: "Đã có lỗi xảy ra khi lấy đánh giá sản phẩm." })
    }
})