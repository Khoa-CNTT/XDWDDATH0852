<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Phần tiêu điểm -->
        <section class="relative">
            <div class="bg-cover bg-center h-96" :style="{ backgroundImage: `url(${featuredPost.image})` }">
                <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div class="max-w-2xl text-white">
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white mb-4">
                            <i class='bx bx-trending-up mr-1'></i> Nổi bật
                        </span>
                        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{{ featuredPost.title }}</h1>
                        <p class="text-lg text-gray-200 mb-6">{{ featuredPost.excerpt }}</p>
                        <div class="flex items-center">
                            <img class="h-10 w-10 rounded-full" :src="featuredPost.author.avatar"
                                :alt="featuredPost.author.name">
                            <div class="ml-3">
                                <p class="text-sm font-medium text-white">{{ featuredPost.author.name }}</p>
                                <p class="text-sm text-gray-300">{{ formatDate(featuredPost.date) }} · {{
                                    featuredPost.readTime }} phút đọc</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Nội dung chính -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Tab danh mục -->
            <div class="mb-10">
                <div class="border-b border-gray-200">
                    <div class="flex overflow-x-auto hide-scrollbar">
                        <button v-for="category in categories" :key="category.id"
                            @click="setActiveCategory(category.id)" :class="[
                                'px-4 py-2 font-medium text-sm whitespace-nowrap',
                                activeCategory === category.id
                                    ? 'border-b-2 border-red-500 text-red-500'
                                    : 'text-gray-500 hover:text-gray-700'
                            ]">
                            <i :class="`bx ${category.icon} mr-1`"></i>
                            {{ category.name }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bài viết gần đây -->
            <div class="mb-16">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Bài viết gần đây</h2>
                    <a href="#" class="text-red-500 hover:text-red-600 font-medium flex items-center">
                        Xem tất cả <i class='bx bx-right-arrow-alt ml-1'></i>
                    </a>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <article v-for="post in filteredPosts" :key="post.id"
                        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div class="relative h-48">
                            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover">
                            <div class="absolute top-0 right-0 p-2">
                                <span
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-red-500">
                                    <i class='bx bx-bookmark mr-1'></i> {{ post.category }}
                                </span>
                            </div>
                        </div>
                        <div class="p-5">
                            <h3 class="text-lg font-bold mb-2 text-gray-900">{{ post.title }}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <img class="h-8 w-8 rounded-full" :src="post.author.avatar" :alt="post.author.name">
                                    <div class="ml-2 text-xs text-gray-500">
                                        <p>{{ post.author.name }}</p>
                                        <p>{{ formatDate(post.date) }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center text-gray-500 text-sm">
                                    <span class="flex items-center mr-3">
                                        <i class='bx bx-time mr-1'></i> {{ post.readTime }} phút
                                    </span>
                                    <span class="flex items-center">
                                        <i class='bx bx-message-rounded mr-1'></i> {{ post.comments }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div v-if="filteredPosts.length === 0" class="col-span-full py-12 text-center">
                        <i class='bx bx-search text-5xl text-gray-300'></i>
                        <p class="mt-2 text-gray-500 text-lg">Không tìm thấy bài viết trong danh mục này</p>
                        <button @click="resetFilter" class="mt-4 text-red-500 hover:text-red-600 font-medium">
                            Xem tất cả bài viết
                        </button>
                    </div>
                </div>
            </div>

            <!-- Xu hướng ẩm thực -->
            <div class="mb-16">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Xu hướng ẩm thực</h2>
                    <a href="#" class="text-red-500 hover:text-red-600 font-medium flex items-center">
                        Khám phá thêm <i class='bx bx-right-arrow-alt ml-1'></i>
                    </a>
                </div>

                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div v-for="trend in trends" :key="trend.id"
                        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div class="relative h-40">
                            <img :src="trend.image" :alt="trend.title" class="w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 p-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold"
                                    :class="trend.trending ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'">
                                    <i class='bx bx-trending-up mr-1'></i> {{ trend.trending ? 'Hot' : 'Popular' }}
                                </span>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-bold mb-1 text-gray-900">{{ trend.title }}</h3>
                            <p class="text-gray-500 text-sm mb-3">{{ trend.description }}</p>
                            <div class="flex items-center justify-between text-sm">
                                <span class="flex items-center text-gray-500">
                                    <i class='bx bx-restaurant mr-1'></i> {{ trend.type }}
                                </span>
                                <span class="flex items-center text-gray-500">
                                    <i class='bx bx-map-pin mr-1'></i> {{ trend.origin }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           <!-- Bản tin -->
           <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="mb-6 md:mb-0 md:w-1/2">
                        <h2 class="text-2xl font-bold mb-2">Stay updated with food trends</h2>
                        <p class="text-red-100">Get the latest articles, recipes, and food guides straight to your
                            inbox.</p>
                    </div>
                    <div class="md:w-1/2">
                        <div class="flex">
                            <input type="email" v-model="emailSubscription" placeholder="Enter your email"
                                class="w-full px-4 py-3 rounded-l-lg text-gray-700 focus:outline-none" />
                            <button @click="subscribeNewsletter"
                                class="bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-r-lg flex items-center">
                                <span>Subscribe</span>
                                <i class='bx bx-right-arrow-alt ml-1'></i>
                            </button>
                        </div>
                        <p class="text-sm mt-2 text-red-100">
                            <i class='bx bx-check-circle mr-1'></i>
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Menu responsive
const showMobileMenu = ref(false);
const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
};

// Đăng ký bản tin
const email6899Subscription = ref('');
const subscribeNewsletter = () => {
    if (!emailSubscription.value) {
        alert('Vui lòng nhập địa chỉ email hợp lệ');
        return;
    }

    alert(`Cảm ơn bạn đã đăng ký với ${emailSubscription.value}!`);
    emailSubscription.value = '';
};

// Lọc danh mục
const activeCategory = ref('all');
const setActiveCategory = (categoryId) => {
    activeCategory.value = categoryId;
};
const resetFilter = () => {
    activeCategory.value = 'all';
};

// Hàm hỗ trợ
const currentYear = new Date().getFullYear();
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

// Dữ liệu
const categories = [
    { id: 'all', name: 'Tất cả', icon: 'bx-grid-alt' },
    { id: 'burgers', name: 'Burger', icon: 'bx-burger' },
    { id: 'pizza', name: 'Pizza', icon: 'bx-pizza' },
    { id: 'chicken', name: 'Gà', icon: 'bx-bowl-hot' },
    { id: 'mexican', name: 'Mexico', icon: 'bx-taco' },
    { id: 'asian', name: 'Châu Á', icon: 'bx-bowl-rice' },
    { id: 'desserts', name: 'Tráng miệng', icon: 'bx-cake' },
    { id: 'drinks', name: 'Đồ uống', icon: 'bx-drink' }
];

const featuredPost = {
    title: 'Lịch sử đồ ăn nhanh: Từ quán Drive-In đến hiện tượng toàn cầu',
    excerpt: 'Khám phá sự phát triển hấp dẫn của văn hóa đồ ăn nhanh và cách nó đã thay đổi thói quen ăn uống trên toàn thế giới trong thế kỷ qua.',
    image: 'https://i.pinimg.com/564x/9e/3b/7f/9e3b7f0a6c6f6b7f8c8e9f0a1b2c3d4.jpg',
    author: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    date: '2025-04-15',
    readTime: 8
};

const blogPosts = [
    {
        id: 1,
        title: 'Hướng dẫn tối đa về Burger thủ công',
        excerpt: 'Khám phá điều gì làm nên một chiếc burger thực sự xuất sắc, từ nguyên liệu chất lượng đến kỹ thuật nấu ăn của các đầu bếp hàng đầu.',
        image: 'https://imgs.search.brave.com/8LMmjo-wzbxp4aWFl9rsS6BoGvIC2DTTpeReutHi1RE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWct/Z2xvYmFsLmNwY2Ru/LmNvbS9yZWNpcGVz/L2UyZTk3M2Q3ODUx/YjMyY2EvMzAweDIy/MGNxNzAvaGFtYnVy/Z2VyLXQlRTElQkEl/QTFpLWdpYS1zaWV1/LW5nb24tc3R5bGUt/aGFuLXF1JUUxJUJC/JTkxYy1yZWNpcGUt/bWFpbi1waG90by5q/cGc',
        category: 'Burger',
        categoryId: 'burgers',
        author: {
            name: 'Michael Brown',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        date: '2025-05-01',
        readTime: 6,
        comments: 24
    },
    {
        id: 2,
        title: 'Cuộc chiến Pizza: Phong cách New York vs Chicago Deep Dish',
        excerpt: 'So sánh chi tiết hai phong cách pizza biểu tượng của Mỹ, thu hút đông đảo người hâm mộ trên cả nước.',
        image: 'https://i.pinimg.com/736x/d4/8d/0e/d48d0ea5bbb1ab7f94f6738516c72377.jpg',
        category: 'Pizza',
        categoryId: 'pizza',
        author: {
            name: 'Lisa Martinez',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
        },
        date: '2025-04-28',
        readTime: 7,
        comments: 36
    },
    {
        id: 3,
        title: 'Công thức bí mật: Gà rán cay Nashville',
        excerpt: 'Tìm hiểu lịch sử và kỹ thuật đằng sau món đặc sản miền Nam cay nồng đang làm sôi động thế giới đồ ăn nhanh.',
        image: 'https://i.pinimg.com/736x/7a/4c/54/7a4c54b5470ad696455a63f02e6f88d0.jpg',
        category: 'Gà',
        categoryId: 'chicken',
        author: {
            name: 'James Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
        },
        date: '2025-04-22',
        readTime: 5,
        comments: 18
    },
    {
        id: 4,
        title: 'Nghệ thuật làm Tacos đích thực',
        excerpt: 'Vượt xa Taco Tuesday: Khám phá truyền thống phong phú và các biến thể vùng miền của món ăn đường phố nổi tiếng nhất Mexico.',
        image: 'https://i.pinimg.com/736x/36/c2/f3/36c2f327c045d865c6478652b2647436.jpg',
        category: 'Mexico',
        categoryId: 'mexican',
        author: {
            name: 'Elena Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        },
        date: '2025-04-18',
        readTime: 6,
        comments: 29
    },
    {
        id: 5,
        title: 'Gà rán Hàn Quốc: Món ăn giòn rụm nhất châu Á',
        excerpt: 'Cách kỹ thuật chiên hai lần này tạo nên cơn sốt toàn cầu và ảnh hưởng đến các chuỗi đồ ăn nhanh phương Tây.',
        image: 'https://i.pinimg.com/736x/47/4b/54/474b5427e7172797f48773934681bfe1.jpg',
        category: 'Châu Á',
        categoryId: 'asian',
        author: {
            name: 'David Kim',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        date: '2025-04-14',
        readTime: 5,
        comments: 15
    },
    {
        id: 6,
        title: 'Đổi mới kem: Vượt xa hương vani',
        excerpt: 'Khám phá cuộc cách mạng sáng tạo trong món tráng miệng đông lạnh đang diễn ra tại các chuỗi đồ ăn nhanh trên toàn thế giới.',
        image: 'https://i.pinimg.com/736x/f1/db/d0/f1dbd046f9d9cd42d9be777cb7f78e9d.jpg',
        category: 'Tráng miệng',
        categoryId: 'desserts',
        author: {
            name: 'Emily Taylor',
            avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
        },
        date: '2025-04-10',
        readTime: 4,
        comments: 21
    }
];

// Bài viết được lọc theo danh mục
const filteredPosts = computed(() => {
    if (activeCategory.value === 'all') {
        return blogPosts;
    }
    return blogPosts.filter(post => post.categoryId === activeCategory.value);
});

// Dữ liệu xu hướng ẩm thực
const trends = [
    {
        id: 1,
        title: 'Burger chay',
        description: 'Các lựa chọn thay thế thịt đang thay đổi thực đơn đồ ăn nhanh khắp mọi nơi.',
        image: 'https://i.pinimg.com/736x/aa/f3/aa/aaf3aa4e15769c860aff8b2a22edfc78.jpg',
        type: 'Chay',
        origin: 'Mỹ',
        trending: true
    },
    {
        id: 2,
        title: 'Tacos Birria',
        description: 'Món ăn Mexico ngon miệng, đầy phô mai đang chiếm lĩnh mạng xã hội.',
        image: 'https://i.pinimg.com/736x/8f/f4/61/8ff461edc72ae6ece270dc002c6960e0.jpg',
        type: 'Mexico',
        origin: 'Jalisco',
        trending: true
    },
    {
        id: 3,
        title: 'Bánh mì kẹp xúc xích Hàn Quốc',
        description: 'Món ăn đường phố giòn rụm, đầy phô mai với nhiều lớp phủ đa dạng.',
        image: 'https://i.pinimg.com/736x/3e/70/cf/3e70cf431bd29d4a4c7844db02a1639a.jpg',
        type: 'Ăn vặt',
        origin: 'Hàn Quốc',
        trending: false
    },
    {
        id: 4,
        title: 'Gà rán cay Nashville',
        description: 'Món gà rán cay đang trở thành món ăn chủ đạo trong đồ ăn nhanh.',
        image: 'https://i.pinimg.com/736x/8b/36/35/8b3635eacf5552c8c98484f76efdda94.jpg',
        type: 'Gà',
        origin: 'Nashville',
        trending: false
    },
    {
        id: 5,
        title: 'Trà sữa trân châu',
        description: 'Món đồ uống ngọt ngào, dai dai đã chinh phục cả thế giới.',
        image: 'https://i.pinimg.com/736x/49/35/83/493583cdee9a2fc6391f06338b75f7b8.jpg',
        type: 'Đồ uống',
        origin: 'Đài Loan',
        trending: true
    }
];
</script>