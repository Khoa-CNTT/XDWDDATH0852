<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Quản lý món ăn</h1>
            <button @click="showAddProductModal = true"
                class="bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 flex items-center cursor-pointer">
                <i class="bx bx-plus mr-1 text-lg"></i>
                Thêm món
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-grow">
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                    <div class="relative">
                        <input type="text" id="search" v-model="searchQuery" placeholder="Tìm kiếm món ăn..."
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" />
                        <i class="bx bx-search absolute right-3 top-2.5 text-gray-500 text-xl"></i>
                    </div>
                </div>

                <div class="w-full md:w-48">
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                    <select id="category" v-model="selectedCategory"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300">
                        <option value="">Tất cả danh mục</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="w-full md:w-48">
                    <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
                    <select id="sort" v-model="sortBy"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300">
                        <option value="name">Tên món ăn</option>
                        <option value="price">Đơn giá</option>
                        <option value="cat_Id">Danh mục</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên món ăn</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Danh mục</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đơn giá</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="product in paginatedProducts" :key="product.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <img :src="product.img" :alt="product.name"
                                        class="w-10 h-10 object-cover rounded-md mr-3" />
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800">
                                    {{ getCategoryName(product.cat_Id) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatPrice(product.price)
                            }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ product.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editProduct(product)"
                                    class="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer">
                                    <i class="bx bx-edit text-xl"></i>
                                </button>
                                <button @click="deleteProduct(product.id)"
                                    class="text-red-600 hover:text-red-900 cursor-pointer">
                                    <i class="bx bx-trash text-xl"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredProducts.length === 0" class="text-center py-12">
                <i class="bx bx-package text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p class="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        </div>

        <div class="flex justify-center mt-4">
            <button :disabled="currentPage === 1" @click="currentPage--"
                class="px-3 py-1 mx-1 border rounded-md">Trước</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="currentPage++"
                class="px-3 py-1 mx-1 border rounded-md">Sau</button>
        </div>

        <!-- Add/Edit Product Modal -->
        <div v-if="showAddProductModal || showEditProductModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">{{ showEditProductModal ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới' }}
                    </h2>
                </div>

                <form @submit.prevent="showEditProductModal ? updateProduct() : addProduct()" class="p-4">
                    <div class="mb-4">
                        <label for="productName" class="block text-sm font-medium text-gray-700 mb-1">Tên món ăn</label>
                        <input type="text" id="productName" v-model="currentProduct.name"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="mb-4">
                        <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1">Giá tiền</label>
                        <input type="number" id="productPrice" v-model="currentProduct.price" step="0.01" min="0"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="mb-4">
                        <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-1">Danh
                            mục</label>
                        <select id="productCategory" v-model="currentProduct.cat_Id"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="productImage" class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="text" id="productImage" v-model="currentProduct.img"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="mb-4">
                        <label for="productStatus" class="block text-sm font-medium text-gray-700 mb-1">Trạng
                            thái</label>
                        <select id="productStatus" v-model="currentProduct.status"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required>
                            <option value="available">available</option>
                            <option value="unavailable">unavailable</option>
                        </select>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" @click="closeProductModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            Hủy
                        </button>
                        <button type="submit" class="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700">
                            {{ showEditProductModal ? 'Cập nhật' : 'Thêm' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">Xác nhận muốn xóa ?</h2>
                </div>

                <div class="p-4">
                    <p class="text-gray-700 mb-4">Bạn có chắc chắn muốn xóa món ăn này không? Hành động này không thể hoàn tác.</p>

                    <div class="flex justify-end gap-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                            Hủy
                        </button>
                        <button @click="confirmDelete"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('name');
const showAddProductModal = ref(false);
const showEditProductModal = ref(false);
const showDeleteModal = ref(false);
const productToDeleteId = ref(null);
const products = ref([]);
const categories = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Current product for add/edit
const currentProduct = ref({
    name: '',
    price: 0,
    img: '',
    cat_Id: 1,
    status: 'available',
});

// Computed
const filteredProducts = computed(() => {
    let result = [...products.value];

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter((product) => {
            const productName = product.name ? product.name.toLowerCase() : '';
            return productName.includes(query);
        });
    }

    // Filter by category
    if (selectedCategory.value) {
        result = result.filter((product) => product.cat_Id === parseInt(selectedCategory.value));
    }

    // Sort
    result.sort((a, b) => {
        if (sortBy.value === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy.value === 'price') {
            return parseFloat(a.price) - parseFloat(b.price);
        } else if (sortBy.value === 'cat_Id') {
            return a.cat_Id - b.cat_Id;
        }
        return 0;
    });

    return result;
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1;
});

// Methods
const getCategoryName = (categoryId) => {
    const category = categories.value.find((c) => c.id === categoryId);
    return category ? category.name : '';
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price) + ' VNĐ';
};

const resetCurrentProduct = () => {
    currentProduct.value = {
        name: '',
        price: 0,
        img: '',
        cat_Id: 1,
        status: 'available',
    };
};

const closeProductModal = () => {
    showAddProductModal.value = false;
    showEditProductModal.value = false;
    resetCurrentProduct();
};

const addProduct = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/menu-items/create`, currentProduct.value);
        await fetchProducts();
        closeProductModal();
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

const editProduct = async (product) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/menu-items/${product.id}`);
        currentProduct.value = response.data;
        showEditProductModal.value = true;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

const updateProduct = async () => {
    try {
        await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/menu-items/update/${currentProduct.value.id}`, currentProduct.value);
        await fetchProducts();
        closeProductModal();
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

const deleteProduct = (id) => {
    productToDeleteId.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/menu-items/delete/${productToDeleteId.value}`);
        await fetchProducts();
        showDeleteModal.value = false;
        productToDeleteId.value = null;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/menu-items/all`);
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/all`);
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

onMounted(async () => {
    await fetchProducts();
    await fetchCategories();
});
</script>