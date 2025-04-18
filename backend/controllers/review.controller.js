import { Review, User } from "../models/index.js"
import TryCatch from '../utils/trycatch.js'

// Thêm đánh giá
export const createReview = TryCatch(async (req, res) => {
    const { user_Id, rating, comment } = req.body

    // Kiểm tra user có tồn tại không
    const user = await User.findByPk(user_Id)
    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" })

    const review = await Review.create({ user_Id, rating, comment })
    res.status(201).json({ message: "Thêm đánh giá thành công!", review })
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
