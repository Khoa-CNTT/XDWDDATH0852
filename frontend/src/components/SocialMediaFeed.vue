<template>
  <section class="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold text-center text-rose-700 mb-10">
        Kết nối với chúng tôi
        <i class="bx bxs-heart text-rose-500 animate-pulse"></i>
      </h2>

      <!-- Carousel Container -->
      <div class="relative">
        <div
          ref="carousel"
          class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 pb-4"
        >
          <div
            v-for="post in socialPosts"
            :key="post.id"
            class="min-w-[300px] sm:min-w-[350px] bg-white rounded-xl shadow-lg flex-shrink-0 snap-start group relative overflow-hidden cursor-pointer"
          >
            <img
              :src="post.image"
              :alt="post.caption"
              class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-white text-center text-sm font-medium px-4">
                {{ post.caption }}
              </p>
            </div>
            <div class="p-4 flex justify-between items-center">
              <span class="text-rose-500 text-xs font-semibold">Date: {{ post.date }}</span>
              <a :href="post.link" target="_blank" class="text-rose-500 hover:text-rose-700">
                <i class="bx bxl-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition"
        >
          <i class="bx bx-chevron-left text-2xl"></i>
        </button>
        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition"
        >
          <i class="bx bx-chevron-right text-2xl"></i>
        </button>
      </div>

      <!-- Follow Buttons -->
      <div class="text-center mt-10">
        <p class="text-gray-600 mb-4">Theo dõi chúng tôi để nhận cập nhật mới nhất!</p>
        <div class="flex justify-center gap-4">
          <a
            href="https://instagram.com/foodshop"
            target="_blank"
            class="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition flex items-center gap-2"
          >
            <i class="bx bxl-instagram text-xl"></i>
            Instagram
          </a>
          <a
            href="https://facebook.com/foodshop"
            target="_blank"
            class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center gap-2"
          >
            <i class="bx bxl-facebook text-xl"></i>
            Facebook
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const today = new Date();

const date = today.getDate();
const month = today.getMonth() + 1;  
const year = today.getFullYear();

const dateString = `${date}/${month}/${year}`;

const socialPosts = [
  {
    id: 1,
    image: 'https://i.pinimg.com/736x/0e/99/35/0e9935d0e68d5280177f87e09b57ff42.jpg',
    caption: 'Burger mới tại FoodShop, bạn đã thử chưa? 🍔',
    date: dateString,
    link: 'https://instagram.com/foodshop',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/79/dd/c0/79ddc027d507b78a821dc333d5479ae8.jpg',
    caption: 'Gà rán giòn ngon tuyệt, đặt ngay hôm nay! 🍗',
    date: dateString,
    link: 'https://instagram.com/foodshop',
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/736x/50/4f/78/504f785fb4001c42bc6e9fe1a4264d9d.jpg',
    caption: 'Pizza hải sản hot hit, chỉ có tại FoodShop! 🍕',
    date: dateString,
    link: 'https://instagram.com/foodshop',
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/736x/ae/1f/a7/ae1fa7a58e6e8cb5268a97293f6ead5a.jpg',
    caption: 'Trà lipton ngọt ngào, mát lạnh, giải khát! 🥤',
    date: dateString,
    link: 'https://instagram.com/foodshop',
  },
];

// Ref để tham chiếu đến container carousel
const carousel = ref(null);

// Hàm cuộn sang trái
const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -350, behavior: 'smooth' });
  }
};

// Hàm cuộn sang phải
const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 350, behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Ẩn thanh cuộn nhưng vẫn cho phép cuộn */
::-webkit-scrollbar {
  display: none;
}

section {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>