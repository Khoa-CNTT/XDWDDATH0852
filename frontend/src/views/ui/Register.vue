<template>
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
      <div class="bg-rose-600 text-white py-4 px-6">
        <h2 class="text-xl font-bold">Tạo tài khoản mới</h2>
      </div>
  
      <form @submit.prevent="handleRegister" class="p-6">
        <div v-if="error" class="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>
  
        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {{ success }}
        </div>
  
        <div class="mb-4">
          <label for="fullname" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-user'></i> Nhập họ tên</label>
          <input
            type="text"
            id="fullname"
            v-model="fullname"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
  
        <div class="mb-4">
          <label for="email" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-envelope' ></i> Nhập email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
  
        <div class="mb-4">
          <label for="phone_number" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
            class='bx bx-phone'></i> Nhập số điện thoại</label>
          <input
            type="tel"
            id="phone_number"
            v-model="phone_number"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
  
        <div class="mb-4">
          <label for="address" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-map'></i> Nhập địa chỉ</label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
        <div class="mb-4">
          <label for="password" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-lock'></i> Nhập mật khẩu</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-lock'></i> Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
            required
          >
        </div>
  
        <div class="mb-6">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="terms"
              v-model="agreeToTerms"
              class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
              required
            >
            <label for="terms" class="ml-2 block text-gray-700">
              Tôi đồng ý với các <a href="#" class="text-rose-600 hover:text-rose-800">điều khoản và điều kiện trên</a>
            </label>
          </div>
        </div>
  
        <button
          type="submit"
          class="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 cursor-pointer duration-200"
          :disabled="loading || !agreeToTerms"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Đăng ký</span>
        </button>
  
        <div class="mt-4 text-center">
          <p class="text-gray-600">
            Đã có sẵn tài khoản?
            <router-link to="/login" class="text-rose-600 hover:text-rose-800">Đăng nhập</router-link>
          </p>
        </div>
      </form>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const fullname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone_number = ref('')
const address = ref('')
const role_name = ref('customer')
const agreeToTerms = ref(false)
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Mật khẩu không khớp'
    loading.value = false
    return
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/register`,
      {
        fullname: fullname.value,
        password: password.value,
        email: email.value,
        phone_number: phone_number.value,
        address: address.value,
        role_name: role_name.value,
      }
    )

    success.value = 'Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...'

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    console.error('Lỗi đăng ký:', err)
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Đã xảy ra lỗi. Vui lòng thử lại.'
    }
  } finally {
    loading.value = false
  }
};
</script>
