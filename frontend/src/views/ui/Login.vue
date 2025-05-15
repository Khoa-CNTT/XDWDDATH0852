<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
    <div class="bg-rose-600 text-white py-4 px-6">
      <h2 class="text-xl font-bold">Đăng nhập tài khoản của bạn</h2>
    </div>

    <form @submit.prevent="handleLogin" class="p-6">
      <div v-if="error" class="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <div class="mb-4">
        <label for="phone_number" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i
            class='bx bx-phone'></i> Số điện
          thoại</label>
        <input type="tel" id="phone_number" v-model="phoneNumber"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" required>
      </div>

      <div class="mb-6">
        <label for="password" class="flex items-center gap-1 text-gray-700 font-medium mb-2"><i class='bx bx-lock'></i>
          Mật khẩu</label>
        <input type="password" id="password" v-model="password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" required>
      </div>

      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <input type="checkbox" id="remember"
            class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded">
          <label for="remember" class="ml-2 block text-gray-700">Nhớ tài khoản</label>
        </div>

        <router-link to="/forgot-password" class="text-rose-600 hover:text-rose-800">Quên mật khẩu?</router-link>
      </div>

      <button 
        type="submit"
        class="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 cursor-pointer duration-200"
        :disabled="loading">
        <span v-if="loading">Loading...</span>
        <span v-else>Đăng nhập</span>
      </button>

      <div class="mt-4 text-center">
        <p class="text-gray-600">
          Chưa có tài khoản?
          <router-link to="/register" class="text-rose-600 hover:text-rose-800">Đăng ký</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const emit = defineEmits(['login-success'])

const phoneNumber = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/login`,
      {
        phone_number: phoneNumber.value,
        password: password.value,
      }
    )

    const userData = response.data.user
    const token = response.data.token

    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)

    emit('login-success', userData)

    if (userData.role_name === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }

  } catch (err) {
    console.error('Login error:', err)
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Số điện thoại hoặc mật khẩu không đúng'
    }
  } finally {
    loading.value = false
  }
};
</script>
