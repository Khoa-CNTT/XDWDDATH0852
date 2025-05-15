<template>
    <div>
        <section class="px-4 md:px-8 lg:px-16 py-12 bg-white">
            <div class="max-w-7xl mx-auto">
                <!-- Tiêu đề -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <h2 class="text-3xl font-semibold text-red-500 ">
                        Our Blog <span class="font-light text-gray-800"> & Bài viết của chúng tôi</span>
                    </h2>
                    <router-link to="/blog">
                        <button
                            class="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition text-sm w-fit">
                            Read All Articles
                        </button>
                    </router-link>
                </div>

                <!-- Lưới bài viết -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Bài viết chính lớn -->
                    <div class="md:col-span-2 bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://i.pinimg.com/736x/aa/f3/aa/aaf3aa4e15769c860aff8b2a22edfc78.jpg"
                            alt="Featured" class="w-full h-64 sm:h-80 object-cover" />
                        <div class="p-4">
                            <p class="text-sm text-gray-500 mb-1">April 3, 2025</p>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                Hướng dẫn tối đa về Burger thủ công
                            </h3>
                        </div>
                    </div>

                    <!-- Các bài viết nhỏ -->
                    <div class="bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://i.pinimg.com/736x/18/25/b8/1825b8da8ffaa2683acfb709531c4833.jpg" alt=""
                            class="w-full h-32 object-cover" />
                        <div class="p-3">
                            <p class="text-xs text-gray-500 mb-1">January 3, 2023</p>
                            <h4 class="text-sm font-medium text-gray-800">
                                Cách chế biến khoai tây chiên hoàn hảo bằng nồi chiên không dầu
                            </h4>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://i.pinimg.com/736x/5c/7a/bf/5c7abf4bf3ac7440af505641a682d7cc.jpg" alt=""
                            class="w-full h-32 object-cover" />
                        <div class="p-3">
                            <p class="text-xs text-gray-500 mb-1">January 3, 2023</p>
                            <h4 class="text-sm font-medium text-gray-800">
                                Gà rán Hàn Quốc: Món ăn giòn rụm nhất châu Á
                            </h4>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://i.pinimg.com/736x/fd/b8/1b/fdb81bd29807aa10606b2fb9ad048e16.jpg" alt=""
                            class="w-full h-32 object-cover" />
                        <div class="p-3">
                            <p class="text-xs text-gray-500 mb-1">January 3, 2023</p>
                            <h4 class="text-sm font-medium text-gray-800">
                                7 công thức làm bánh phô mai ngon bạn có thể làm
                            </h4>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://i.pinimg.com/736x/fb/a9/9a/fba99a32b96177a02a4d90f576d9b840.jpg" alt=""
                            class="w-full h-32 object-cover" />
                        <div class="p-3">
                            <p class="text-xs text-gray-500 mb-1">January 3, 2023</p>
                            <h4 class="text-sm font-medium text-gray-800">
                                Cuộc chiến Pizza: Phong cách New York vs Chicago Deep Dish </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>