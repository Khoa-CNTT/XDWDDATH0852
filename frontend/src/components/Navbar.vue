<template>
    <div>
        <nav class="bg-rose-600 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
            <div class="container mx-auto flex justify-between items-center">
                <router-link to="/" class="text-2xl font-bold">FoodShop</router-link>

                <div class="ml-10 flex items-baseline space-x-4">
                    <router-link to="/" class="hover:bg-red-400 hover:text-white px-3 py-2 rounded-md font-medium">
                        Trang chủ
                    </router-link>
                    <router-link to="/menu" class="hover:bg-red-400 hover:text-white px-3 py-2 rounded-md font-medium">
                        Menu
                    </router-link>
                    <router-link to="/about" class="hover:bg-red-400 hover:text-white px-3 py-2 rounded-md font-medium">
                        Giới thiệu
                    </router-link>
                    <router-link to="/blog" class="hover:bg-red-400 hover:text-white px-3 py-2 rounded-md font-medium">
                        Blog
                    </router-link>

                    <template v-if="user && user.role_name !== 'admin'">
                        <router-link to="/contact"
                            class="hover:bg-red-400 hover:text-white px-3 py-2 rounded-md font-medium">
                            Liên hệ
                        </router-link>
                    </template>
                </div>


                <div class="flex items-center space-x-6">
                    <template v-if="user">
                        <template v-if="user.role_name !== 'admin'">
                            <router-link to="/cart" class="hover:text-rose-200 relative transition-colors">
                                <div class="relative flex items-center">
                                    <i class='bx bx-cart h-6 w-6 text-2xl'></i>
                                    <span v-if="cartCount > 0"
                                        class="absolute -top-2 -right-2 bg-yellow-400 text-rose-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {{ cartCount }}
                                    </span>
                                </div>
                            </router-link>
                        </template>

                        <div class="relative">
                            <button @click="isUserMenuOpen = !isUserMenuOpen"
                                class="flex items-center hover:text-rose-200 transition-colors focus:outline-none cursor-pointer">
                                <i class='bx bx-user-circle text-2xl'></i>
                                {{ user.name }}
                                <i class='bx bx-chevron-down text-2xl'
                                    :class="{ 'transform rotate-180 duration-200': isUserMenuOpen }"></i>
                            </button>

                            <div v-if="isUserMenuOpen"
                                class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10"
                                @mouseleave="isUserMenuOpen = false">
                                <!-- For User -->
                                <template v-if="user.role_name !== 'admin'">
                                    <router-link to="/orders"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-package h-4 w-4 mr-3 text-xl'></i>
                                            Đơn hàng của tôi
                                        </div>
                                    </router-link>
                                    <router-link to="/profile"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bxs-user-circle h-4 w-4 mr-3 text-xl'></i>
                                            Thông tin cá nhân
                                        </div>
                                    </router-link>
                                </template>
                                <!-- For Admin -->
                                <template v-if="user.role_name === 'admin'">
                                    <router-link to="/admin/dashboard"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bxs-dashboard h-4 w-4 mr-2'></i>
                                            Bảng điều khiển
                                        </div>
                                    </router-link>
                                    <router-link to="/admin/products"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-bowl-hot h-4 w-4 mr-2'></i>
                                            Quản lý món ăn
                                        </div>
                                    </router-link>
                                    <router-link to="/admin/adminCategories"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-category h-4 w-4 mr-2'></i>
                                            Quản lý danh mục
                                        </div>
                                    </router-link>

                                    <router-link to="/admin/orders"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-message-alt-detail h-4 w-4 mr-2'></i>
                                            Quản lý đơn hàng
                                        </div>
                                    </router-link>
                                    <router-link to="/admin/users"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-group h-4 w-4 mr-2'></i>
                                            Quản lý người dùng
                                        </div>
                                    </router-link>
                                    <router-link to="/admin/vouchers"
                                        class="block px-4 py-2 hover:bg-rose-100 transition-colors"
                                        @click="isUserMenuOpen = false">
                                        <div class="flex items-center">
                                            <i class='bx bx-purchase-tag h-4 w-4 mr-2'></i>
                                            Quản lý voucher
                                        </div>
                                    </router-link>
                                    <div class="border-t border-gray-200 my-1"></div>
                                </template>
                                <!-- Log-out -->
                                <button @click="handleLogout"
                                    class="block w-full text-left px-4 py-2 hover:bg-rose-100 transition-colors cursor-pointer">
                                    <div class="flex items-center text-red-600">
                                        <i class='bx bx-log-out h-4 w-4 text-xl mr-3'></i>
                                        Đăng xuất
                                    </div>
                                </button>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <router-link to="/login"
                            class="hover:bg-red-400 hover:text-white font-medium px-3 py-2 rounded-md">Đăng
                            nhập</router-link>
                        <router-link to="/register"
                            class="hover:bg-red-400 hover:text-white font-medium px-3 py-2 rounded-md">Đăng
                            ký</router-link>
                    </template>
                </div>
            </div>
        </nav>
        <div class="h-16"></div>

        <div v-if="isNewOrderNotificationVisible"
            class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform flex items-center justify-between w-full sm:w-auto max-w-md"
            :class="{ 'translate-y-0 opacity-100': isNewOrderNotificationVisible, 'translate-y-[-20px] opacity-0': !isNewOrderNotificationVisible }">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.45-.573 3.596 0l-1.146 2.868a1.5 1.5 0 01-2.45 0l-1.146-2.868zM12 14.25a.75.75 0 00-.75.75v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-.75-.75z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-semibold">Đơn hàng mới!</span>
            </div>
            <div class="flex items-center space-x-2">
                <router-link :to="`/admin/orders`"
                    class="text-sm text-yellow-300 hover:text-yellow-200 focus:outline-none">
                    Xem chi tiết
                </router-link>
                <button @click="isNewOrderNotificationVisible = false"
                    class="text-sm hover:text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { cartAPI } from '../services/apis';
import { io } from 'socket.io-client';

const props = defineProps({
    user: Object
});
const emit = defineEmits(['logout']);

const cartCount = ref(0);
const isUserMenuOpen = ref(false);
const isNewOrderNotificationVisible = ref(false);
const latestOrderId = ref(null);
const socket = ref(null);

const updateCartCount = async () => {
    if (props.user) {
        try {
            const res = await cartAPI.getCartCount(props.user.id);
            cartCount.value = res.data.count || 0;
            localStorage.setItem(`cartCount_${props.user.id}`, cartCount.value);
            localStorage.setItem('currentUser', JSON.stringify(props.user));
        } catch {
            cartCount.value = 0;
            localStorage.removeItem(`cartCount_${props.user.id}`);
        }
    }
};

const handleCartUpdate = () => {
    updateCartCount();
};

const handleLogout = () => {
    isUserMenuOpen.value = false;
    if (props.user) {
        localStorage.removeItem(`cartCount_${props.user.id}`);
    }
    localStorage.removeItem('currentUser');
    cartCount.value = 0;
    emit('logout');
};

onMounted(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            const savedCount = localStorage.getItem(`cartCount_${user.id}`);
            if (savedCount !== null) {
                cartCount.value = parseInt(savedCount);
            }
        } catch {
            localStorage.removeItem('currentUser');
        }
    }
    updateCartCount();

    socket.value = io('http://localhost:5000');
    socket.value.on('newOrder', (order) => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser && localUser.role_name === 'admin') {
            latestOrderId.value = order.id;
            isNewOrderNotificationVisible.value = true;
            setTimeout(() => {
                isNewOrderNotificationVisible.value = false;
            }, 5000);
        }
    });

    window.addEventListener('cartUpdated', handleCartUpdate);
});

onBeforeUnmount(() => {
    window.removeEventListener('cartUpdated', handleCartUpdate);
    if (socket.value) socket.value.disconnect();
});
</script>