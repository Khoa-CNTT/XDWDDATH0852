<template>
    <section class="bg-rose-50 py-12 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-rose-700 mb-8">Món mới cập nhật <i class='bx bxs-hot text-red-500' ></i></h2>
        <div class="flex overflow-x-auto space-x-4">
          <div v-for="item in newItems" :key="item.name"
               class="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex-shrink-0 hover:shadow-lg transition">
            <img :src="item.image" alt="food" class="h-40 w-full object-cover rounded-md mb-2" />
            <h3 class="font-semibold text-lg text-rose-700">{{ item.name }}</h3>
            <p class="text-gray-600 text-sm">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const newItems = [
    {
      name: 'Taco Bò Cay',
      desc: 'Đậm đà vị Mexico',
      image: 'https://i.pinimg.com/736x/f3/7c/5e/f37c5efbd089d3b962d8cb1c2aa329cc.jpg',
    },
    {
      name: 'Hotdog Phô Mai',
      desc: 'Nóng hổi và béo ngậy',
      image: 'https://i.pinimg.com/736x/f2/38/4e/f2384e74515dd8a46dbe3c462478c554.jpg',
    },
    {
      name: 'Salad Trái Cây',
      desc: 'Tươi mát, healthy',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
    },
  ];
  </script>
  