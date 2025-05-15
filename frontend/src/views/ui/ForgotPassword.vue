<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-4 text-rose-600"><i class='bx bxs-lock'></i> Quên mật khẩu</h2>
    <p class="text-center text-sm text-gray-500 mb-6">
      Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu
    </p>
    <form @submit.prevent="sendResetLink ">
      <input
        type="email"
        v-model="email"
        placeholder="Nhập email của bạn..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 mb-4"
        required
      />
      <button
        type="submit"
        class="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition-colors cursor-pointer duration-200"
      >
        Gửi yêu cầu
      </button>
      <p v-if="message" class="text-sm text-center text-green-600 mt-4">{{ message }}</p>
      <p v-if="error" class="text-sm text-center text-red-500 mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userAPI } from '../../services/apis'

const email = ref('')
const message = ref('')
const error = ref('')

const sendResetLink = async () => {
  try {
    const response = await userAPI.forgotPassword({ email: email.value })
    message.value = response.data.message
    error.value = ''
  } catch (err) {
    message.value = ''
    error.value = err.response?.data?.message || 'Đã xảy ra lỗi'
  }
};
</script>
