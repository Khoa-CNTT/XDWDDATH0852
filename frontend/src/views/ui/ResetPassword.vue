<template>
    <div class="flex items-center justify-center px-4 my-10">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
            <h2 class="text-2xl font-bold text-center mb-6 text-rose-600"><i class='bx bxs-lock-open'></i> Đặt lại mật
                khẩu</h2>

            <form @submit.prevent="resetPassword">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2"><i class='bx bx-lock'></i> Mật khẩu
                        mới</label>
                    <input type="password" v-model="newPassword" placeholder="Nhập mật khẩu mới"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                        required />
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2"><i class='bx bx-lock'></i> Xác nhận mật
                        khẩu</label>
                    <input type="password" v-model="confirmPassword" placeholder="Nhập lại mật khẩu"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                        required />
                </div>

                <button type="submit"
                    class="w-full bg-rose-600 text-white font-bold py-2 px-4 rounded hover:bg-rose-700 transition duration-200 cursor-pointer">
                    Xác nhận
                </button>

                <div class="mt-4">
                    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
                    <div v-if="success" class="text-green-500 text-sm mb-4">{{ success }}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userAPI } from '../../services/apis';

const newPassword = ref('');
const confirmPassword = ref('');
const error = ref('')
const success = ref('')

const route = useRoute();
const router = useRouter()

const token = route.params.token

const resetPassword = async () => {
    error.value = ''
    success.value = ''

    if (newPassword.value !== confirmPassword.value) {
        error.value = 'Mật khẩu không khớp.'
        return
    }

    try {
        await userAPI.resetPassword({ token, newPassword: newPassword.value })
        success.value = 'Đổi mật khẩu thành công! Đang chuyển hướng...'
        alert('Thay đổi mật khẩu thành công !')
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    } catch (err) {
        error.value = err.response?.data?.message || 'Đã xảy ra lỗi!'
    }
};
</script>
