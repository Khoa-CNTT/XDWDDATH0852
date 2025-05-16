<template>
  <section class="py-12 px-4 bg-gray-50">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center text-rose-700 mb-8">
        Gợi ý từ đầu bếp <i class='bx bxs-chef-hat text-yellow-500'></i>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="item in recommendedItems"
          :key="item.name"
          class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="h-48 w-full object-cover rounded-md mb-3"
          />
          <h3 class="font-semibold text-lg text-rose-700">{{ item.name }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ item.desc }}</p>
          <span class="text-rose-600 font-medium">{{ item.price }} VNĐ</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const recommendedItems = [
  {
    name: 'Burger Đặc Biệt',
    desc: 'Thịt bò tươi ngon, phô mai tan chảy',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    price: '90.000',
  },
  {
    name: 'Gà Rán Giòn',
    desc: 'Vỏ giòn, thịt mềm, sốt cay',
    image: 'https://images.unsplash.com/photo-1567621166960-5e876c1b9e9b',
    price: '70.000',
  },
  {
    name: 'Pizza Hải Sản',
    desc: 'Ngập tràn hải sản tươi sống',
    image: 'https://images.unsplash/photo-1600028072396-9c7d9d8ab496',
    price: '130.000',
  },
];
</script>