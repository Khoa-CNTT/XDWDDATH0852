<template>
    <div>
        <div class="relative bg-rose-600 text-white py-16 rounded-md">
            <div class="container mx-auto px-4 flex flex-col items-center text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Món ăn ngon được giao tận nhà</h1>
                <p class="text-xl mb-8 max-w-2xl">Khám phá thực đơn các món ăn tươi ngon được chế biến bởi các đầu bếp
                    chuyên nghiệp và giao tận nhà bạn.</p>
                <button
                    class="bg-white text-rose-600 font-bold py-3 px-8 rounded-full hover:bg-rose-100 transition duration-300">
                    Order Now
                </button>
            </div>
        </div>

        <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading menu...</p>
        </div>

        <div v-else-if="error" class="container mx-auto px-4 py-8 text-center">
            <div class="text-red-600 mb-4">
                <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <p class="text-gray-600">{{ error }}</p>
        </div>

        <div v-else class="container mx-auto px-4 py-8">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
                <button @click="selectedCategory = null" class="px-4 py-2 rounded-full cursor-pointer"
                    :class="selectedCategory === null ? 'bg-rose-600 text-white' : 'bg-gray-200 hover:bg-gray-300'">
                    Tất cả
                </button>
                <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
                    class="px-4 py-2 rounded-full cursor-pointer"
                    :class="selectedCategory === category.id ? 'bg-rose-600 text-white' : 'bg-gray-200 hover:bg-gray-300'">
                    {{ category.name }}
                </button>
            </div>

            <div class="max-w-md mx-auto mb-8">
                <div class="relative flex items-center">
                    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm món ăn..."
                        class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-600 border-gray-300">
                    <i class='bx bx-search absolute right-3 text-gray-500 text-2xl'></i>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="product in filteredProducts" :key="product.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <router-link :to="`/product/${product.id}`" class="block">
                        <img v-if="product.img" :src="`${product.img}`" :alt="product.name"
                            class="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                            @error="handleImageError">
                    </router-link>

                    <div class="p-4">
                        <router-link :to="`/product/${product.id}`" class="block">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-lg font-bold hover:text-rose-600 transition-colors">
                                    {{ product.name }}
                                </h3>
                                <span class="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-1 rounded-full">{{
                                    getCategoryName(product.cat_Id) }}</span>
                            </div>

                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

                            <div class="flex justify-between items-center">
                                <span class="text-rose-600 font-bold">{{ Number(product.price).toLocaleString('vi-VN')
                                    }} VNĐ</span>
                            </div>
                        </router-link>

                        <div class="flex justify-end mt-4">
                            <button @click="addToCart(product)"
                                class="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 flex items-center justify-center gap-2 cursor-pointer transition duration-300">
                                <i class='bx bxs-cart-add text-2xl'></i>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredProducts.length === 0" class="text-center py-12">
                <i class='bx bx-bowl-hot mx-auto text-gray-400 mb-4 text-6xl'></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy món ăn nào</h3>
                <p class="text-gray-500">Hãy điều chỉnh tìm kiếm hoặc bộ lọc để tìm thấy những gì bạn đang tìm kiếm</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { categoryAPI, menuItemAPI, cartAPI } from '../../services/apis'

const searchQuery = ref('')
const selectedCategory = ref(null)
const categories = ref([])
const products = ref([])
const loading = ref(true)
const error = ref(null)
const cartQuantity = ref(0)

const handleImageError = (e) => {
    console.error('Image loading error:', e.target.src)
}

const updateCartQuantity = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return
        const response = await cartAPI.getCartCount(user.id)
        cartQuantity.value = response.data.count
    } catch (err) {
        console.error('Error updating cart quantity:', err)
    }
}

onMounted(async () => {
    try {
        loading.value = true
        const [catRes, prodRes] = await Promise.all([
            categoryAPI.getAll(),
            menuItemAPI.getAll()
        ])
        categories.value = catRes.data
        products.value = prodRes.data.map(p => ({ ...p, price: Number(p.price) }))
        updateCartQuantity()
    } catch (err) {
        error.value = 'Failed to load data. Please try again later.'
        console.error('Error loading data:', err)
    } finally {
        loading.value = false
    }
})

const filteredProducts = computed(() =>
    products.value.filter(product => {
        if (selectedCategory.value && product.cat_Id !== selectedCategory.value) return false
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            return (
                product.name.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            )
        }
        return product.status === 'available' // Chỉ hiển thị sản phẩm có trạng thái "available"
    })
)

const getCategoryName = (categoryId) => {
    const category = categories.value.find(c => c.id === categoryId)
    return category ? category.name : ''
}

const addToCart = async (product) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return (window.location.href = '/login')

        const cartData = {
            menuItemId: Number(product.id),
            quantity: 1
        }

        const response = await cartAPI.addToCart(user.id, cartData)

        if (response && response.data) {
            alert(`${product.name} đã được thêm vào giỏ hàng!`)
            await updateCartQuantity()
            window.dispatchEvent(new Event('cartUpdated'))
        }
    } catch (err) {
        console.error('Error adding to cart:', err)
        alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.')
    }
};
</script>