<template>
    <div class="contact-container bg-white py-12">
        <div class="container mx-auto px-4">
            <!-- Tiêu đề trang -->
            <div class="text-center mb-12">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Liên Hệ Với Chúng Tôi</h1>
                <p class="text-gray-600 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Hãy liên hệ
                    với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Thông tin liên hệ -->
                <div class="bg-gray-50 p-8 rounded-lg shadow-sm">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Thông Tin Liên Hệ</h2>

                    <div class="space-y-6">
                        <div class="flex items-start">
                            <MapPin class="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 class="font-medium text-gray-800">Địa Chỉ</h3>
                                <p class="text-gray-600 mt-1">TP. Đà Nẵng</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <Phone class="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 class="font-medium text-gray-800">Điện Thoại</h3>
                                <p class="text-gray-600 mt-1">+1 234 567 890</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <Mail class="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 class="font-medium text-gray-800">Email</h3>
                                <p class="text-gray-600 mt-1">info@foodshop.com</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <Clock class="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 class="font-medium text-gray-800">Giờ Làm Việc</h3>
                                <p class="text-gray-600 mt-1">Thứ Hai - Thứ Sáu: 8:00 - 22:00</p>
                                <p class="text-gray-600">Thứ Bảy - Chủ Nhật: 10:00 - 23:00</p>
                            </div>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="mt-8">
                        <h3 class="font-medium text-gray-800 mb-4">Theo Dõi Chúng Tôi</h3>
                        <div class="flex space-x-4">
                            <a href="#"
                                class="flex items-center bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 p-3 rounded-full transition-colors duration-300">
                                <i class='bx bxl-facebook-circle text-xl' ></i>
                            </a>
                            <a href="#"
                                class="flex items-center bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 p-3 rounded-full transition-colors duration-300">
                                <i class='bx bxl-instagram-alt text-xl' ></i>
                            </a>
                            <a href="#"
                                class="flex items-center bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 p-3 rounded-full transition-colors duration-300">
                                <i class='bx bxl-twitter text-xl'></i>
                            </a>
                            <a href="#"
                                class="flex items-center bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 p-3 rounded-full transition-colors duration-300">
                                <i class='bx bxl-youtube text-xl' ></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Form liên hệ -->
                <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Gửi Tin Nhắn</h2>

                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                                <input type="text" id="name" v-model="form.name"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                    required>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="email" v-model="form.email"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                    required>
                            </div>
                        </div>

                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Số Điện
                                Thoại</label>
                            <input type="tel" id="phone" v-model="form.phone"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
                        </div>

                        <div>
                            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Chủ Đề</label>
                            <select id="subject" v-model="form.subject"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                required>
                                <option value="">-- Chọn chủ đề --</option>
                                <option value="general">Thông tin chung</option>
                                <option value="reservation">Đặt bàn</option>
                                <option value="order">Đơn hàng</option>
                                <option value="feedback">Phản hồi</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Tin Nhắn</label>
                            <textarea id="message" v-model="form.message" rows="5"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                required></textarea>
                        </div>

                        <div class="flex items-center">
                            <input type="checkbox" id="privacy" v-model="form.privacy"
                                class="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" required>
                            <label for="privacy" class="ml-2 block text-sm text-gray-700">
                                Tôi đồng ý với <a href="#" class="text-red-500 hover:underline">chính sách bảo mật</a>
                                của FoodShop
                            </label>
                        </div>

                        <div class="text-right">
                            <button type="submit"
                                class="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                :disabled="submitting">
                                <span v-if="submitting">Đang gửi...</span>
                                <span v-else>Gửi Tin Nhắn</span>
                            </button>
                        </div>
                    </form>

                    <!-- Thông báo thành công -->
                    <div v-if="submitted" class="mt-6 p-4 bg-green-50 text-green-700 rounded-md">
                        <div class="flex items-center">
                            <CheckCircle class="h-5 w-5 text-xl mr-2" />
                            <span>Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất có
                                thể.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bản đồ -->
            <div class="mt-16">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Vị Trí Của Chúng Tôi</h2>
                <div class="h-96 bg-gray-200 rounded-lg overflow-hidden">
                    <!-- Trong thực tế, bạn sẽ thay thế div này bằng iframe Google Maps hoặc component bản đồ -->
                    <div class="w-full h-full flex items-center justify-center bg-gray-100">
                        <MapPin class="h-12 w-12 text-red-500 mr-3" />
                        <span class="text-gray-500 text-lg">Bản đồ Google sẽ được hiển thị ở đây</span>
                    </div>
                </div>
            </div>

            <!-- FAQ -->
            <div class="mt-16">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Câu Hỏi Thường Gặp</h2>

                <div class="space-y-4 max-w-3xl mx-auto">
                    <div v-for="(faq, index) in faqs" :key="index"
                        class="border border-gray-200 rounded-md overflow-hidden">
                        <button @click="toggleFaq(index)"
                            class="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-300">
                            <span class="font-medium text-gray-800">{{ faq.question }}</span>
                            <ChevronDown :class="['h-5 w-5 text-gray-500 transition-transform duration-300', { 'transform rotate-180': faq.open }]" />
                        </button>
                        <div v-show="faq.open" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p class="text-gray-600">{{ faq.answer }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
})

const submitting = ref(false)
const submitted = ref(false)

const submitForm = async () => {
    submitting.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))

        Object.keys(form).forEach(key => {
            form[key] = key === 'privacy' ? false : ''
        })

        submitted.value = true
        setTimeout(() => {
            submitted.value = false
        }, 5000)
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.')
    } finally {
        submitting.value = false
    }
}

const faqs = ref([
    {
        question: 'Làm thế nào để đặt bàn tại nhà hàng?',
        answer: 'Bạn có thể đặt bàn trực tiếp trên trang web...',
        open: false
    },
    {
        question: 'Nhà hàng có dịch vụ giao hàng không?',
        answer: 'Có, chúng tôi cung cấp dịch vụ giao hàng trong phạm vi 10km...',
        open: false
    },
    {
        question: 'Tôi có thể hủy đơn hàng sau khi đã đặt không?',
        answer: 'Bạn có thể hủy đơn hàng trong vòng 15 phút sau khi đặt...',
        open: false
    },
    {
        question: 'Nhà hàng có phục vụ các món ăn chay không?',
        answer: 'Có, chúng tôi có nhiều lựa chọn món ăn chay...',
        open: false
    },
    {
        question: 'Làm thế nào để tôi có thể trở thành đối tác của FoodShop?',
        answer: 'Để trở thành đối tác, vui lòng gửi email đến partners@foodshop.com...',
        open: false
    }
]);

const toggleFaq = (index) => {
    faqs.value[index].open = !faqs.value[index].open
};
</script>


<style scoped>
.contact-container {
    min-height: 100vh;
}
</style>