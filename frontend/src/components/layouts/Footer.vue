<template>
  <div class="font-sans">
    <footer class="bg-[#3b3b3b] px-20 py-20 flex flex-wrap justify-between gap-10 mt-12 text-white">
      <!-- Logo Section -->
      <div class="max-w-xs space-y-4">
        <div class="w-10">
          <!-- <img class="w-full" src="@/assets/img/1.png" alt="Logo" /> -->
        </div>
        <p class="text-sm leading-relaxed">
          In the new era of technology we look to the future with certainty and
          pride for our company and.
        </p>
        <div class="flex gap-3 mt-3 text-white">
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-900">
            <i class="fab fa-pinterest"></i>
          </a>
        </div>
      </div>

      <!-- Page Links -->
      <div class="flex gap-14">
        <ul class="space-y-2">
          <li class="text-red-600 font-semibold">Pages</li>
          <li><a href="#" class="hover:text-red-400">Home</a></li>
          <li><a href="#" class="hover:text-red-400">About</a></li>
          <li><a href="#" class="hover:text-red-400">Menu</a></li>
          <li><a href="#" class="hover:text-red-400">Pricing</a></li>
          <li><a href="#" class="hover:text-red-400">Blog</a></li>
          <li><a href="#" class="hover:text-red-400">Contact</a></li>
          <li><a href="#" class="hover:text-red-400">Delivery</a></li>
        </ul>
        <ul class="space-y-2">
          <li class="text-red-600 font-semibold">Utility Pages</li>
          <li><a href="#" class="hover:text-red-400">Start Here</a></li>
          <li><a href="#" class="hover:text-red-400">Styleguide</a></li>
          <li><a href="#" class="hover:text-red-400">Password Protected</a></li>
          <li><a href="#" class="hover:text-red-400">404 Not Found</a></li>
          <li><a href="#" class="hover:text-red-400">Licenses</a></li>
          <li><a href="#" class="hover:text-red-400">Changelog</a></li>
          <li><a href="#" class="hover:text-red-400">View More</a></li>
        </ul>
      </div>

      <!-- Instagram -->
      <div>
        <h3 class="text-red-600 font-semibold mb-3">Follow Us On Instagram</h3>
        <div class="grid grid-cols-2 gap-3">
          <!-- <img src="@/assets/img/pages/1.jpg" alt="Food 1" class="w-full h-20 object-cover rounded-md" />
            <img src="@/assets/img/pages/2.jpg" alt="Food 2" class="w-full h-20 object-cover rounded-md" />
            <img src="@/assets/img/pages/3.jpg" alt="Food 3" class="w-full h-20 object-cover rounded-md" />
            <img src="@/assets/img/pages/4.jpg" alt="Food 4" class="w-full h-20 object-cover rounded-md" /> -->
        </div>
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