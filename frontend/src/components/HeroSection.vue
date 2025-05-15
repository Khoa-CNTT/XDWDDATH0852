<template>
  <section class="bg-rose-100 py-16 px-4">
    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center relative">
      
      <!-- Text -->
      <div class="text-center lg:text-left max-w-xl space-y-6 z-10">
        <h1 class="text-4xl font-bold text-rose-700">Đặt đồ ăn nhanh siêu tốc</h1>
        <p class="text-gray-700 text-lg">Chỉ cần vài cú nhấp, món ăn bạn yêu thích sẽ đến tận tay.</p>
        <router-link to="/menu"
          class="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
          Xem thực đơn
        </router-link>
      </div>

      <!-- Hai hình chồng nhau -->
      <div class="relative w-[350px] h-[350px] mt-10 lg:mt-0 ml-16">
        <img
          src="https://i.pinimg.com/736x/a2/b5/f2/a2b5f226ff2f97fb457a2a66aee5b4cc.jpg"
          class="absolute top-5 left-5 w-full h-full object-cover rounded-xl shadow-lg z-0"
          alt="Fast food 1"
        />
        <img
          src="https://i.pinimg.com/736x/c3/89/4c/c3894c2ba636c6bae0f78053bc925b76.jpg"
          class="absolute top-0 left-60 w-full h-full object-cover rounded-xl shadow-2xl z-10"
          alt="Fast food 2"
        />
      </div>
    </div>
  </section>
</template>