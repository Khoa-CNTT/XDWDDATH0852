<template>
    <section class="bg-white py-12 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-rose-700 mb-8">Khách hàng nói gì?</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(review, i) in reviews" :key="i"
               class="bg-rose-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-700 mb-4 italic">"{{ review.comment }}"</p>
            <div class="flex items-center space-x-2">
              <img :src="review.avatar" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold text-rose-700">{{ review.name }}</p>
                <p class="text-sm text-gray-600">{{ review.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const reviews = [
    {
      name: 'Minh Thư',
      comment: 'Đồ ăn nhanh mà ngon bất ngờ!',
      role: 'Sinh viên',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Tuấn Anh',
      comment: 'Món ngon, giao hàng cực nhanh.',
      role: 'Nhân viên văn phòng',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Quỳnh Mai',
      comment: 'Đặt món dễ dàng, trải nghiệm mượt mà!',
      role: 'Freelancer',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];
  </script>
  