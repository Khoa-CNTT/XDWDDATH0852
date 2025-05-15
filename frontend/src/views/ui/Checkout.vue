<template>
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6">
        <div class="bg-rose-600 text-white py-4 px-6">
            <h2 class="text-xl font-bold">Thanh toán</h2>
        </div>

        <div class="p-6">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <i class="bx bx-loader-alt animate-spin text-5xl text-rose-600 mx-auto"></i>
                <p class="mt-4 text-gray-600">Đang tải thông tin...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12 bg-white rounded-lg">
                <i class='bx bx-cart-alt text-gray-400 text-6xl'></i>
                <p class="text-gray-400 mb-4 font-semibold">{{ error }}</p>
                <div class="mt-4">
                    <button @click="loadData"
                        class="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 transition-colors cursor-pointer">
                        Thử lại
                    </button>
                    <router-link to="/cart"
                        class="ml-4 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer">
                        Quay lại giỏ hàng
                    </router-link>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else class="mb-8">
                <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-b-gray-500">#Tóm tắt đơn hàng</h3>

                <!-- Cart Items -->
                <div v-if="cartItems.length > 0">
                    <div v-for="item in cartItems" :key="item.id" class="flex items-center py-3 ">
                        <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md mr-4">
                        <div class="flex-grow">
                            <h4 class="font-medium">{{ item.name }}</h4>
                            <p class="text-gray-500 text-sm">Số lượng: {{ item.quantity }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} VNĐ</p>
                        </div>
                    </div>

                    <!-- Subtotal -->
                    <div class="flex justify-between my-3 text-red-400">
                        <span class="flex items-center gap-2 text-red-400"><i class='bx bx-money'></i>
                            Tổng tiền:</span>
                        <span>{{ subtotal.toLocaleString('vi-VN') }} VNĐ</span>
                    </div>

                    <div class="flex justify-between my-3 text-green-400">
                        <span class="flex items-center gap-2 text-green-400"><i class='bx bxs-truck text-xl'></i>
                            Phí vận chuyển:</span>
                        <span>{{ deliveryFee.toLocaleString('vi-VN') }} VNĐ</span>
                    </div>

                    <!-- Order Totals -->
                    <div class="mt-4 space-y-2">
                        <!-- Voucher Section -->
                        <div class="flex items-start">
                            <div class="flex-grow mr-2">
                                <input type="text" v-model="voucherCode" placeholder="Nhập voucher....."
                                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-gray-100 border-gray-300"
                                    :disabled="voucherApplied" />
                                <p class="text-sm mt-1 min-h-[20px] text-red-500">
                                    {{ voucherError }}
                                </p>
                            </div>
                            <div>
                                <button @click="applyVoucher"
                                    class="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 disabled:bg-gray-400 transition-colors cursor-pointer"
                                    :disabled="!voucherCode || voucherApplied">
                                    {{ voucherApplied ? 'Đã áp dụng' : 'Áp dụng' }}
                                </button>
                            </div>
                        </div>

                        <!-- Applied Voucher Info -->
                        <div v-if="voucherApplied && appliedVoucher" class="bg-green-50 p-3 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="font-medium text-green-800">{{ appliedVoucher?.code }}</p>
                                    <p class="text-sm text-green-600">{{ appliedVoucher?.description }}</p>
                                </div>
                                <span class="font-bold text-green-800">-{{
                                    parseInt(voucherDiscount).toLocaleString('vi-VN') }} VNĐ</span>
                            </div>
                            <button @click="removeVoucher"
                                class="text-sm text-rose-600 hover:text-rose-800 mt-2 transition-colors cursor-pointer">
                                Xóa voucher
                            </button>
                        </div>

                        <div class="flex justify-between font-bold text-lg pt-3 border-t border-t-gray-300">
                            <span>Tổng cộng thanh toán:</span>
                            <span>{{ total.toLocaleString('vi-VN') }} VNĐ</span>
                        </div>
                    </div>
                </div>

                <!-- Empty Cart -->
                <div v-else class="text-center py-8">
                    <i class="bx bx-cart-alt text-6xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                    <p class="text-gray-500 mb-4">Add some items to your cart to proceed with checkout.</p>
                    <router-link to="/"
                        class="inline-block bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors">
                        Browse Menu
                    </router-link>
                </div>
            </div>

            <!-- Delivery Information -->
            <div v-if="cartItems.length > 0">
                <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-b-gray-500">#Thông tin giao hàng</h3>

                <form @submit.prevent="placeOrder" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div>
                            <label for="fullName" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
                                    class='bx bx-user'></i> Họ và tên:</label>
                            <input type="text" id="fullName" v-model="form.fullName"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                                required>
                        </div>

                        <div>
                            <label for="email" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
                                    class='bx bx-envelope'></i> Email:</label>
                            <input type="email" id="email" v-model="form.email"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                                required>
                        </div>

                        <div>
                            <label for="phone" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
                                    class='bx bx-phone'></i> Số điện thoại:</label>
                            <input type="tel" id="phone" v-model="form.phone"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                                required>
                        </div>

                        <div>
                            <label for="address" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
                                    class='bx bx-home'></i> Địa chỉ:</label>
                            <input type="text" id="address" v-model="form.address"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                                required>
                        </div>
                    </div>

                    <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-b-gray-500">#Phương thức thanh toán</h3>

                    <div class="space-y-4">
                        <div class="flex items-center">
                            <input type="radio" id="cashOnDelivery" value="cashOnDelivery" v-model="form.paymentMethod"
                                class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300">
                            <label for="cashOnDelivery"
                                class="ml-2 flex items-center gap-1 text-gray-700 cursor-pointer">Thanh toán khi nhận
                                hàng</label>
                        </div>

                        <div class="flex items-center">
                            <input type="radio" id="vnpay" value="vnpay" v-model="form.paymentMethod"
                                class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300">
                            <label for="vnpay"
                                class="ml-2 flex items-center gap-1 text-gray-700 cursor-pointer">VNPay</label>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" id="terms" v-model="form.termsAccepted"
                            class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" required>
                        <label for="terms" class="ml-2 block text-gray-700 cursor-pointer">
                            Tôi đồng ý với các <a href="#" class="text-rose-600 hover:text-rose-800">điều khoản và điều
                                kiện trên</a>
                        </label>
                    </div>

                    <div class="flex justify-between">
                        <router-link to="/cart"
                            class="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                            <i class="bx bx-arrow-back h-5 w-5 mr-1"></i>
                            Quay lại giỏ hàng
                        </router-link>

                        <button type="submit"
                            class="bg-rose-600 text-white py-2 px-6 cursor-pointer rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-gray-400 transition-colors"
                            :disabled="loading || !form.termsAccepted">
                            <span v-if="loading">Loading...</span>
                            <span v-else>Đặt món</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccessModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="bx bx-check text-3xl text-green-600"></i>
                </div>

                <h2 class="text-2xl font-bold text-gray-800 mb-2">Đã đặt hàng thành công!</h2>
                <p class="text-gray-600 mb-6">Đơn hàng của bạn đã được đặt thành công. Bạn sẽ sớm nhận được email xác nhận.</p>

                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <p class="text-gray-700 font-medium">Đơn hàng số</p>
                    <p class="text-xl font-bold text-rose-600">{{ orderNumber }}</p>
                </div>

                <button @click="goToOrders"
                    class="bg-rose-600 text-white py-2 px-6 rounded-lg hover:bg-rose-700 w-full transition-colors cursor-pointer">
                    Xem lại đơn hàng
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { userAPI, cartAPI, orderAPI, paymentAPI, voucherAPI } from '../../services/apis';

const router = useRouter();
const cartItems = ref([]);
const loading = ref(true);
const error = ref(null);
const showSuccessModal = ref(false);
const orderNumber = ref('');
const user = ref(null);
const voucherCode = ref('');
const voucherApplied = ref(false);
const appliedVoucher = ref(null);
const voucherError = ref(null);

const form = ref({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cashOnDelivery',
    termsAccepted: false
});

const loadData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            router.push('/login');
            return;
        }

        const userResponse = await userAPI.getProfile(storedUser.id);
        user.value = userResponse.data;

        const cartResponse = await cartAPI.getCart(storedUser.id);

        if (!cartResponse.data?.items?.length) {
            error.value = 'Giỏ hàng trống!';
            return;
        }

        cartItems.value = cartResponse.data.items.map(item => ({
            id: item.menu_item_id,
            name: item.MenuItem.name,
            price: item.price,
            quantity: item.quantity,
            image: item.MenuItem.img
        }));

        if (user.value) {
            form.value.email = user.value.email;
            form.value.fullName = user.value.fullname || '';
            form.value.phone = user.value.phone_number || '';
            form.value.address = user.value.address || '';
        }
    } catch (error) {
        console.error('Error loading data:', error);
        error.value = 'Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.';
    } finally {
        loading.value = false;
    }
};

const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const deliveryFee = computed(() => {
    return subtotal.value > 500000 ? 0 : 30000;
});

const voucherDiscount = computed(() => {
    if (!voucherApplied.value || !appliedVoucher.value) return 0;

    const voucher = appliedVoucher.value;
    if (voucher.discount_type === 'percentage') {
        const discount = subtotal.value * (voucher.discount_value / 100);
        return voucher.max_discount ? Math.min(discount, voucher.max_discount) : discount;
    } else {
        return voucher.discount_value;
    }
});

const total = computed(() => {
    let calculatedTotal = subtotal.value + deliveryFee.value;
    if (voucherApplied.value) {
        calculatedTotal -= voucherDiscount.value;
    }
    return Math.max(calculatedTotal, 0);
});

const applyVoucher = async () => {
    try {
        voucherError.value = null;
        const response = await voucherAPI.checkVoucher({
            code: voucherCode.value,
            total_price: subtotal.value
        });

        if (response.data?.valid && response.data.voucher) {
            appliedVoucher.value = response.data.voucher;
            voucherApplied.value = true;
        } else {
            voucherError.value = response.data?.message || 'Voucher không hợp lệ';
            appliedVoucher.value = null;
            voucherApplied.value = false;
        }
    } catch (error) {
        console.error('Error applying voucher:', error);
        voucherError.value = error.response?.data?.message || 'Có lỗi khi kiểm tra voucher';
        appliedVoucher.value = null;
        voucherApplied.value = false;
    }
};

const removeVoucher = () => {
    voucherApplied.value = false;
    appliedVoucher.value = null;
    voucherCode.value = '';
    voucherError.value = null;
};

const placeOrder = async () => {
    if (!user.value) {
        alert('Vui lòng đăng nhập để tiếp tục');
        router.push('/login');
        return;
    }

    if (!form.value.termsAccepted) {
        alert('Vui lòng chấp nhận điều khoản và điều kiện');
        return;
    }

    loading.value = true;

    try {
        const orderData = {
            user_Id: user.value.id,
            total_price: total.value,
            status: 'pending',
            payment_status: form.value.paymentMethod === 'vnpay' ? 'pending' : 'pending',
            shipping_address: form.value.address,
            full_name: form.value.fullName,
            phone_number: form.value.phone,
            email: form.value.email,
            payment_method: form.value.paymentMethod,
            voucher_code: voucherApplied.value ? voucherCode.value : null
        };

        const orderResponse = await orderAPI.createOrder(orderData);

        if (orderResponse.data?.order) {
            const orderId = orderResponse.data.order.id;

            for (const item of cartItems.value) {
                await orderAPI.createOrderDetails({
                    order_Id: orderId,
                    menu_item_Id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    total_price: item.price * item.quantity
                });
            }

            if (form.value.paymentMethod === 'vnpay') {
                orderNumber.value = orderId;
                await initiateVNPayPayment(orderId);
            } else {
                await paymentAPI.createPayment({
                    order_Id: orderId,
                    user_Id: user.value.id,
                    total_payment: total.value,
                    method: form.value.paymentMethod,
                    status: 'pending'
                });

                await cartAPI.clearCart(user.value.id);
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                orderNumber.value = orderId;
                showSuccessModal.value = true;
            }
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
    } finally {
        loading.value = false;
    }
};

const initiateVNPayPayment = async (orderId) => {
    loading.value = true;
    try {
        const vnpayResponse = await paymentAPI.initiateVNPAY({
            orderId: orderId,
            amount: total.value,
            orderInfo: `${orderId}`,
            returnUrl: `${window.location.origin}/orders`
        });

        if (vnpayResponse.data?.data) {
            await cartAPI.clearCart(user.value.id);
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            window.location.href = vnpayResponse.data.data;
        } else {
            throw new Error('Không nhận được URL thanh toán từ VNPay');
        }
    } catch (error) {
        console.error('Error initiating VNPay payment:', error);
        alert('Không thể khởi tạo thanh toán VNPay. Vui lòng thử lại sau.');
    } finally {
        loading.value = false;
    }
};

const goToOrders = () => {
    showSuccessModal.value = false;
    router.push('/orders');
};

onMounted(loadData);
</script>
