<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6"><i class='bx bxs-shopping-bag'></i> Giỏ hàng của tôi</h1>

        <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
        </div>

        <div v-else-if="error" class="text-center py-12 bg-white rounded-lg shadow-md">
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button @click="loadCart" class="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700">
                Thử lại
            </button>
        </div>

        <div v-else-if="cartItems.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4 border-b border-b-gray-300">
                        <h2 class="text-lg font-semibold">Các món ăn</h2>
                    </div>

                    <ul class="divide-y divide-gray-200">
                        <li v-for="item in cartItems" :key="item.id"
                            class="p-4 flex flex-col sm:flex-row sm:items-center">
                            <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
                            </div>

                            <div class="flex-grow">
                                <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                                <p class="text-gray-600 text-sm">{{ item.price.toLocaleString('vi-VN') }} VNĐ</p>
                            </div>

                            <div class="flex items-center mt-4 sm:mt-0">
                                <button @click="updateQuantity(item.id, item.quantity - 1)"
                                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300 cursor-pointer"
                                    :disabled="item.quantity <= 1">
                                    <i class='bx bx-minus'></i>
                                </button>
                                <input type="number" v-model.number="item.quantity" min="1"
                                    class="w-12 text-center border-t border-b border-gray-200 py-1"
                                    @change="checkQuantityBeforeUpdate(item.id, parseInt(item.quantity))" />
                                <button @click="updateQuantity(item.id, item.quantity + 1)"
                                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300 cursor-pointer">
                                    <i class='bx bx-plus'></i>
                                </button>
                                <span class="mx-10 font-medium">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} VNĐ</span>
                                <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 cursor-pointer">
                                    <i class='bx bxs-message-square-x h-5 w-5 text-2xl'></i>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <div class="p-4 border-t border-t-gray-300 flex justify-between">
                        <button @click="clearCart"
                            class="text-red-500 hover:text-red-700 flex items-center cursor-pointer">
                            <i class='bx bx-trash mr-2'></i> Xóa giỏ hàng
                        </button>
                        <router-link to="/menu" class="text-rose-600 hover:text-rose-800 flex items-center">
                            <i class='bx bx-left-arrow-alt h-5 w-5 mr-1'></i> Tiếp tục đặt hàng
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="md:col-span-1">
                <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                    <div class="p-4 border-b border-b-gray-300">
                        <h2 class="text-lg font-semibold">Tóm tắt hóa đơn</h2>
                    </div>

                    <div class="p-4 space-y-4">
                        <div class="flex justify-between">
                            <span class="font-medium text-gray-600">Tổng đơn hàng</span>
                            <span class="font-medium text-gray-600"></span>
                            <span class="font-medium text-gray-600">{{ subtotal.toLocaleString('vi-VN') }} VNĐ (SL: x{{ totalItems }})</span>
                        </div>
                        <div class="border-t border-t-gray-300 pt-4 flex justify-between font-bold">
                            <span>Tổng tiền thanh toán</span>
                            <span>{{ total.toLocaleString('vi-VN') }} VNĐ</span>
                        </div>

                        <button @click="handleCheckout"
                            class="block w-full bg-rose-600 text-white text-center py-3 px-4 rounded-lg hover:bg-rose-700 cursor-pointer">
                            Tiến hành thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12 bg-gradient-to-br from-white via-rose-100 to-white rounded-xl shadow-lg">
            <div class="animate-bounce mb-4">
                <i class='bx bx-cart-alt h-20 w-20 mx-auto text-rose-300'></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Ôi không! Giỏ hàng trống</h3>
            <p class="text-gray-600 mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá những món ngon nhé!</p>
            <router-link to="/menu"
                class="inline-block bg-rose-600 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:bg-rose-700 hover:scale-105 transform transition duration-300 ease-in-out">
                <i class='bx bx-shopping-bag'></i> Đặt món ngay
            </router-link>
        </div>

        <!-- Modal xác nhận số lượng lớn -->
        <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 class="text-lg font-semibold mb-4">Xác nhận số lượng lớn</h2>
                <p class="text-gray-600 mb-6">
                    Bạn đang đặt {{ totalItems }} món. Đây là số lượng lớn. Bạn có chắc chắn muốn tiếp tục không?
                </p>
                <div class="flex justify-end space-x-4">
                    <button @click="cancelUpdate" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 cursor-pointer">
                        Hủy
                    </button>
                    <button @click="confirmUpdate" class="bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 cursor-pointer">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartAPI } from '../../services/apis'

const cartItems = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()
const showConfirmModal = ref(false)
const pendingUpdate = ref(null) // Lưu thông tin cập nhật tạm thời

const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
    window.location.href = '/login'
}

const loadCart = async () => {
    try {
        loading.value = true
        const response = await cartAPI.getCart(user.id)

        if (!response.data || !response.data.items) {
            error.value = 'Dữ liệu giỏ hàng không hợp lệ'
            return
        }

        cartItems.value = response.data.items.map(item => ({
            id: item.menu_item_id,
            name: item.MenuItem?.name || 'Unknown Product',
            price: item.price || 0,
            quantity: item.quantity || 1,
            image: item.MenuItem?.img || ''
        }))
    } catch (err) {
        error.value = 'Không thể tải giỏ hàng. Vui lòng thử lại sau.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadCart()
    // Gửi sự kiện để cập nhật số lượng trên navbar
    window.addEventListener('cartUpdated', updateCartCount);
    updateCartCount(); // Cập nhật ban đầu
})

const subtotal = computed(() => cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0))
const shipping = computed(() => 0)
const total = computed(() => subtotal.value + shipping.value)
const totalItems = computed(() => cartItems.value.reduce((count, item) => count + item.quantity, 0))

const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return
    try {
        await cartAPI.updateCartItem(user.id, id, { quantity: newQuantity })
        await loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
    } catch (err) {
        alert('Không thể cập nhật số lượng. Vui lòng thử lại sau.')
    }
}

// Kiểm tra số lượng trước khi cập nhật
const checkQuantityBeforeUpdate = (id, newQuantity) => {
    const item = cartItems.value.find(item => item.id === id);
    if (!item) return;

    // Lưu thông tin cập nhật tạm thời
    pendingUpdate.value = { id, newQuantity };
    if (totalItems.value + (newQuantity - item.quantity) >= 99) {
        showConfirmModal.value = true; // Hiển thị modal xác nhận
    } else {
        updateQuantity(id, newQuantity); // Cập nhật trực tiếp nếu số lượng nhỏ
    }
};

const confirmUpdate = async () => {
    if (pendingUpdate.value) {
        await updateQuantity(pendingUpdate.value.id, pendingUpdate.value.newQuantity);
        showConfirmModal.value = false;
        pendingUpdate.value = null;
    }
};

const cancelUpdate = () => {
    if (pendingUpdate.value) {
        const item = cartItems.value.find(item => item.id === pendingUpdate.value.id);
        if (item) {
            item.quantity = cartItems.value.find(item => item.id === pendingUpdate.value.id).quantity; // Khôi phục số lượng cũ
        }
        showConfirmModal.value = false;
        pendingUpdate.value = null;
    }
};

const removeItem = async (id) => {
    try {
        await cartAPI.removeFromCart(user.id, id)
        await loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
    } catch (err) {
        alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.')
    }
}

const clearCart = async () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
        try {
            await cartAPI.clearCart(user.id)
            await loadCart()
            window.dispatchEvent(new Event('cartUpdated'))
        } catch (err) {
            alert('Không thể xóa giỏ hàng. Vui lòng thử lại sau.')
        }
    }
};

const handleCheckout = () => {
    if (cartItems.value.length === 0) {
        alert('Giỏ hàng trống!')
        return
    }
    if (totalItems.value >= 99) {
        showConfirmModal.value = true; // Hiển thị modal xác nhận nếu số lượng lớn
        router.push('/checkout'); // Tiến hành thanh toán nếu số lượng lớn
    } else {
        router.push('/checkout'); // Tiến hành thanh toán nếu số lượng nhỏ
    }
};

const confirmCheckout = () => {
    showConfirmModal.value = false;
    router.push('/checkout');
};

// Hàm cập nhật số lượng trên navbar
const updateCartCount = () => {
    const event = new CustomEvent('updateCartCount', { detail: totalItems.value });
    window.dispatchEvent(event);
};
</script>