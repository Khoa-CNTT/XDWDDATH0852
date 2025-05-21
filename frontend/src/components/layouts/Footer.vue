<template>
  <div class="font-sans">
    <footer class="bg-[#3b3b3b] px-20 py-20 flex flex-wrap justify-between gap-10 mt-12 text-white">
      <!-- Phần Logo và mô tả -->
      <div class="max-w-xs space-y-4">
        <div class="w-10">
          <!-- <img class="w-full" src="@/assets/img/1.png" alt="Logo" /> -->
        </div>
        <p class="text-sm leading-relaxed">
          Trong thời đại công nghệ mới, chúng tôi hướng tới tương lai với sự tự tin và tự hào về công ty của mình.
        </p>

        <!-- Icon mạng xã hội dùng Boxicons -->
        <div class="flex gap-3 mt-3 text-white">
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="bx bxl-twitter"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="bx bxl-facebook"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="bx bxl-instagram"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="bx bxl-pinterest-alt"></i>
          </a>
        </div>
      </div>

      <!-- Danh sách các liên kết -->
      <div class="flex gap-14">
        <!-- Các trang chính -->
        <ul class="space-y-2">
          <li class="text-red-600 font-semibold">Trang</li>
          <li><a href="#" class="hover:text-red-400">Trang chủ</a></li>
          <li><a href="#" class="hover:text-red-400">Giới thiệu</a></li>
          <li><a href="#" class="hover:text-red-400">Thực đơn</a></li>
          <li><a href="#" class="hover:text-red-400">Giá cả</a></li>
          <li><a href="#" class="hover:text-red-400">Blog</a></li>
          <li><a href="#" class="hover:text-red-400">Liên hệ</a></li>
          <li><a href="#" class="hover:text-red-400">Giao hàng</a></li>
        </ul>

        <!-- Các trang tiện ích -->
        <ul class="space-y-2">
          <li class="text-red-600 font-semibold">Trang tiện ích</li>
          <li><a href="#" class="hover:text-red-400">Bắt đầu tại đây</a></li>
          <li><a href="#" class="hover:text-red-400">Hướng dẫn kiểu dáng</a></li>
          <li><a href="#" class="hover:text-red-400">Trang bảo vệ bằng mật khẩu</a></li>
          <li><a href="#" class="hover:text-red-400">Lỗi 404</a></li>
          <li><a href="#" class="hover:text-red-400">Giấy phép</a></li>
          <li><a href="#" class="hover:text-red-400">Nhật ký thay đổi</a></li>
          <li><a href="#" class="hover:text-red-400">Xem thêm</a></li>
        </ul>
      </div>

      <!-- Phần Instagram -->
      <div>
        <h3 class="text-red-600 font-semibold mb-3">Theo dõi chúng tôi trên website</h3>
        <div class="flex justify-center">
          <img src="https://i.pinimg.com/736x/33/5d/46/335d46cf0a99b7cf5850ee5623c6356f.jpg" alt="logo_foodshop"
            class="h-36 rounded-xl shadow-2xl object-cover mt-2" />
        </div>
        <div id="preny-chatbot-container"></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Chatbot AI
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://app.preny.ai/embed-global.js'; // Link đến file nhúng của chatbot Preny
  script.async = true;  // Tải script bất đồng bộ, không chặn các thao tác khác
  script.defer = true;  // Trì hoãn thực thi script cho đến khi HTML được phân tích xong
  script.dataset.prenyBotId = '68221c3b63c96f4aed5b920e'; // ID bot riêng của bạn để kết nối đúng chatbot
  script.dataset.buttonStyle = `
    width:70px;
    height:70px;
    border-radius:50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `; // Thiết lập kích thước nút chat
  script.dataset.image = 'https://i.pinimg.com/736x/52/26/1a/52261a8e8dc68dab5f4d818b9e7d14e1.jpg'; // Ảnh cho bot
  document.body.appendChild(script); // Gắn script vào body của trang
});
</script>