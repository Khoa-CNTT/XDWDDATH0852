<template>
    <div>
        <section class="bg-white py-16 px-4 md:px-8 lg:px-16">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
                <!-- Cột hình ảnh -->
                <div class="relative">
                    <img src="https://i.pinimg.com/736x/50/65/b4/5065b4f13ef621acfb78711c60b3c9b6.jpg" alt="Food"
                        class="rounded-xl object-cover w-full h-[500px]" />

                    <!-- Thông tin liên hệ -->
                    <div
                        class="absolute bottom-[-50px] left-34 bg-gray-800 text-white p-6 rounded-xl shadow-lg w-[300px]">
                        <h3 class="text-lg font-semibold mb-4">Thông tin của FoodShop</h3>
                        <ul class="space-y-3 text-sm">
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 5a2 2 0 012-2h1.6a1 1 0 01.95.68l.76 2.26a1 1 0 01-.28 1.1l-1.12.94a11.05 11.05 0 005.01 5.01l.94-1.12a1 1 0 011.1-.28l2.26.76a1 1 0 01.68.95V16a2 2 0 01-2 2h-.5C6.92 18 2 13.08 2 7.5V7a2 2 0 010-.5z" />
                                </svg>
                                <span>012 345 6789</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M2.01 4.59L12 13l9.99-8.41C21.79 4.22 21.4 4 21 4H3c-.4 0-.79.22-.99.59z" />
                                    <path d="M12 15L2 6.76V20h20V6.76L12 15z" />
                                </svg>
                                <span>foodshop@dtu.edu.vn</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.05 2.87A7 7 0 0116.95 11.12l-6.9 6.9a1 1 0 01-1.42 0l-6.9-6.9A7 7 0 015.05 2.87zM10 9a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span>304 Hùng Vương, Hải Châu, Thành phố Đà Nẵng</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Cột nội dung -->
                <div class="mt-12 lg:mt-0">
                    <h2 class="text-4xl font-bold text-gray-900 leading-tight mb-6">
                        Chúng tôi cung cấp thực phẩm <br />
                        lành mạnh cho gia đình của bạn.
                    </h2>
                    <p class="text-gray-600 text-base mb-4">
                        Câu chuyện của chúng tôi bắt đầu với tầm nhìn tạo ra trải nghiệm ẩm thực độc đáo kết hợp giữa ẩm
                        thực cao cấp, dịch vụ đặc biệt và bầu không khí sôi động. Bắt nguồn từ nền văn hóa ẩm thực phong
                        phú của thành phố, chúng tôi hướng đến việc tôn vinh nguồn gốc địa phương của mình trong khi
                        truyền tải khẩu vị toàn cầu.
                    </p>
                    <p class="text-gray-600 text-sm mb-6">
                        Tại FastFood, chúng tôi tin rằng ăn uống không chỉ là về thức ăn, mà còn là về trải nghiệm tổng
                        thể.
                        Đội ngũ nhân viên của chúng tôi, nổi tiếng với sự nồng nhiệt và tận tụy, luôn cố gắng biến mỗi
                        lần ghé thăm thành
                        một sự kiện khó quên.
                    </p>
                    <router-link to="/contact">
                        <button
                            class="bg-white text-gray-800 border border-gray-300 px-6 py-2 rounded-full hover:bg-rose-600 duration-200 hover:text-white cursor-pointer">
                            Thông tin thêm
                        </button>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>
