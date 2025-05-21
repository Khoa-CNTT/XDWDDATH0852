<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
        </div>

        <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="md:flex">
                <div class="md:w-1/2 p-4">
                    <div
                        class="relative aspect-square w-full max-w-[500px] max-h-[500px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
                        <img v-if="product.img" :src="product.img" :alt="product.name"
                            class="absolute inset-0 w-full h-full object-contain" @error="handleImageError">
                    </div>
                </div>

                <div class="md:w-1/2 p-6 md:p-8">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.name }}</h1>
                            <span
                                class="inline-block bg-rose-100 text-rose-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                                {{ getCategoryName(product.cat_Id) }}
                            </span>
                        </div>
                        <span class="text-2xl font-bold text-rose-600">{{ Number(product.price).toLocaleString('vi-VN')
                        }} VNĐ</span>
                    </div>

                    <div class="mb-6">
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                        <p class="text-gray-600">{{ product.description }}</p>
                    </div>

                    <div class="mb-6 flex items-center gap-3">
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">Số lượng:</h2>
                        <div class="flex items-center">
                            <button @click="quantity > 1 && quantity--"
                                class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 cursor-pointer">
                                <i class='bx bx-minus h-5 w-5'></i>
                            </button>
                            <input type="number" v-model="quantity" min="1"
                                class="w-14 text-center border-t border-b border-gray-200 py-1" readonly>
                            <button @click="quantity++"
                                class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 cursor-pointer">
                                <i class='bx bx-plus h-5 w-5'></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <button @click="addToCart"
                            class="flex-1 bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 flex items-center justify-center gap-2 cursor-pointer duration-200">
                            <i class='bx bxs-cart-add text-2xl'></i>
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            class="flex-1 border border-rose-600 text-rose-600 py-3 px-6 rounded-lg hover:bg-rose-50 flex items-center justify-center gap-2 cursor-pointer duration-200">
                            <i class='bx bx-heart text-xl'></i>
                            Thêm yêu thích
                        </button>
                    </div>

                    <div class="mt-8 border-t border-gray-200 pt-6">
                        <h2 class="text-lg font-semibold text-gray-700 mb-4">Khách hàng đánh giá</h2>

                        <div v-if="reviewsLoading" class="flex justify-center items-center mb-4">
                            <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-400">
                            </div>
                            <span class="ml-2 text-gray-500 text-sm">Loading...</span>
                        </div>

                        <div v-else-if="reviewsError" class="text-red-500 text-sm mb-4">{{ reviewsError }}</div>

                        <div v-else-if="reviewData.reviews?.length">
                            <div class="flex items-center mb-3" v-if="!isNaN(reviewData.averageRating)">
                                <div class="flex text-yellow-400">
                                    <i class='bx bxs-star h-5 w-5 fill-current'
                                        v-for="i in getStarCount(reviewData.averageRating)" :key="`avg-star-${i}`"></i>
                                    <i class='bx bx-star h-5 w-5'
                                        v-for="i in 5 - getStarCount(reviewData.averageRating)"
                                        :key="`avg-star-empty-${i}`"></i>
                                </div>
                                <span class="ml-2 text-gray-600 text-sm">{{
                                    parseFloat(reviewData.averageRating).toFixed(1) }} trên 5.0</span>
                            </div>
                            <p class="text-gray-500 text-sm mb-4">Dựa trên {{ reviewData.reviews.length }} đánh giá ({{
                                reviewData.reviews.length }})</p>

                            <div v-for="review in reviewData.reviews" :key="review.id"
                                class="mb-6 border-b border-gray-200 pb-4">
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400">
                                        <i class='bx bxs-star h-4 w-4 fill-current'
                                            v-for="i in getStarCount(review.rating)"
                                            :key="`star-${review.id}-${i}`"></i>
                                        <i class='bx bx-star h-4 w-4' v-for="i in 5 - getStarCount(review.rating)"
                                            :key="`star-empty-${review.id}-${i}`"></i>
                                    </div>
                                    <span class="ml-2 text-gray-500 text-xs">Bởi: {{ review.User?.fullname || 'Unknown'
                                        }}</span>
                                </div>
                                <p class="text-gray-700 text-sm">{{ review.comment }}</p>
                                <p class="text-gray-500 text-xs mt-1">{{ formatDate(review.created_at) }}</p>
                            </div>
                        </div>

                        <div v-else class="text-gray-500 text-sm">Chưa có đánh giá nào cho sản phẩm này.</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <!-- <i class='bx bx-bell h-16 w-16 mx-auto text-gray-400 mb-4'></i> -->
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm !!</h3>
            <p class="text-gray-500 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <router-link to="/menu" class="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700">
                Quay lại trang menu
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { menuItemAPI, categoryAPI, cartAPI, reviewAPI } from '../../services/apis'

const route = useRoute()
const productId = parseInt(route.params.id)

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const categories = ref([])
const reviewData = ref(null)
const reviewsLoading = ref(true)
const reviewsError = ref(null)

const handleImageError = (e) => {
    console.error('Image loading error:', e.target.src)
};

onMounted(async () => {
    try {
        loading.value = true
        reviewsLoading.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })

        // Gọi API lấy chi tiết sản phẩm trước
        const productRes = await menuItemAPI.getById(productId)
        product.value = {
            ...productRes.data,
            price: Number(productRes.data.price)
        }

        // Nếu có sản phẩm, mới gọi tiếp các API còn lại
        const [categoriesRes, reviewRes] = await Promise.allSettled([
            categoryAPI.getAll(),
            reviewAPI.getReviewByProductId(product.value.id),
        ])

        if (categoriesRes.status === 'fulfilled') {
            categories.value = categoriesRes.value.data
        }
        if (reviewRes.status === 'fulfilled') {
            const data = reviewRes.value.data
            reviewData.value = {
                averageRating: parseFloat(data.averageRating || 0),
                reviews: data.reviews || [],
            }
        } else {
            reviewData.value = { averageRating: 0, reviews: [] }
        }
    } catch (err) {
        // Nếu lỗi ở đây, chắc chắn là không có sản phẩm
        product.value = null
    } finally {
        loading.value = false
        reviewsLoading.value = false
    }
});

const getCategoryName = (categoryId) => {
    const category = categories.value.find(c => c.id === categoryId)
    return category ? category.name : ''
};

const addToCart = async () => {
    if (!product.value) return
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        window.location.href = '/login'
        return
    }

    try {
        const res = await cartAPI.addToCart(user.id, {
            menuItemId: product.value.id,
            quantity: quantity.value
        })

        if (res.data) {
            alert(`${quantity.value} ${product.value.name}${quantity.value > 1 ? 's' : ''} đã được thêm vào giỏ hàng!`)
            quantity.value = 1
            window.dispatchEvent(new Event('cartUpdated'))
        }
    } catch (err) {
        console.error('Error adding to cart:', err)
        alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.')
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString)

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false }

    const formattedDate = date.toLocaleDateString('vi-VN', optionsDate)
    const formattedTime = date.toLocaleTimeString('vi-VN', optionsTime)

    return `${formattedDate} lúc ${formattedTime}`
};

const getStarCount = (rating) => {
    const rounded = Math.round(parseFloat(rating))
    return isNaN(rounded) ? 0 : rounded
};
</script>