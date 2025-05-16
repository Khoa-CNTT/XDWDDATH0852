<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Quản lý danh mục</h1>
            <button @click="showAddCategoryModal = true"
                class="bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 flex items-center cursor-pointer">
                <i class="bx bx-plus text-xl mr-1"></i>
                Thêm danh mục
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-grow">
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                    <div class="relative">
                        <input type="text" id="search" v-model="searchQuery" placeholder="Tìm kiếm danh mục..."
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300">
                        <i class="bx bx-search absolute right-3 top-2.5 text-gray-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th @click="sortTable('name')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                Danh mục
                                <span v-if="sortColumn === 'name'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                            </th>
                            <th @click="sortTable('description')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                Mô tả
                                <span v-if="sortColumn === 'description'">{{ sortDirection === 'asc' ? '▲' : '▼'
                                    }}</span>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th @click="sortTable('id')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                ID
                                <span v-if="sortColumn === 'id'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                            </th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="category in paginatedCategories" :key="category.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <img v-if="category.image" :src="category.image" :alt="category.name"
                                            class="h-full w-full object-cover">
                                        <i v-else class="bx bx-bowl-hot text-gray-500 text-xl"></i>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                                        <div class="text-xs text-gray-500">ID: {{ category.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <div class="max-w-xs truncate">{{ category.description || 'Không có mô tả' }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ category.productCount }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ category.id }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editCategory(category)"
                                    class="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer">
                                    <i class="bx bx-edit text-xl"></i>
                                </button>
                                <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-900 cursor-pointer"
                                    :disabled="category.productCount > 0"
                                    :class="{ 'opacity-50 cursor-not-allowed': category.productCount > 0 }"
                                    :title="category.productCount > 0 ? 'Không thể xóa danh mục có sản phẩm' : 'Xóa danh mục'">
                                    <i class="bx bx-trash text-xl"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredCategories.length === 0" class="text-center py-12">
                <i class="bx bx-bowl-hot text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy danh mục nào</h3>
                <p class="text-gray-500">Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn để tìm những gì bạn đang tìm kiếm.</p>
            </div>
        </div>

        <div class="flex justify-center mt-4 gap-2">
            <button :disabled="currentPage === 1" @click="currentPage--"
                class="px-3 py-1 border rounded disabled:opacity-50">Trước</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="currentPage++"
                class="px-3 py-1 border rounded disabled:opacity-50">Sau</button>
        </div>

        <!-- Add / Edit Modal -->
        <div v-if="showAddCategoryModal || showEditCategoryModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">{{ showEditCategoryModal ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục' }}
                    </h2>
                </div>

                <form @submit.prevent="showEditCategoryModal ? updateCategory() : addCategory()" class="p-4">
                    <div class="mb-4">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                        <input type="text" id="categoryName" v-model="currentCategory.name"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required>
                    </div>

                    <div class="mb-4">
                        <label for="categoryDescription"
                            class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <textarea id="categoryDescription" v-model="currentCategory.description" rows="3"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="categoryImage" class="block text-sm font-medium text-gray-700 mb-1">Image
                            URL</label>
                        <input type="text" id="categoryImage" v-model="currentCategory.image"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300">
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" @click="closeCategoryModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">Hủy</button>
                        <button type="submit" class="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 cursor-pointer">{{
                            showEditCategoryModal ? 'Cập nhật' : 'Thêm' }}</button>
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
                    <p class="text-gray-700 mb-4">Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.</p>
                    <div class="flex justify-end gap-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">Hủy</button>
                        <button @click="confirmDelete"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortColumn = ref('id')
const sortDirection = ref('asc')
const showAddCategoryModal = ref(false)
const showEditCategoryModal = ref(false)
const showDeleteModal = ref(false)
const categoryToDeleteId = ref(null)

const currentCategory = ref({
    name: '',
    description: '',
    image: '',
})

const filteredCategories = computed(() => {
    let result = [...categories.value]
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(category =>
            category.name.toLowerCase().includes(query) ||
            (category.description && category.description.toLowerCase().includes(query))
        )
    }
    result.sort((a, b) => {
        const valueA = a[sortColumn.value]
        const valueB = b[sortColumn.value]
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortDirection.value === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA)
        } else {
            return sortDirection.value === 'asc'
                ? (valueA > valueB ? 1 : -1)
                : (valueA < valueB ? 1 : -1)
        }
    })
    return result
})

const paginatedCategories = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredCategories.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => {
    return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
})

const resetCurrentCategory = () => {
    currentCategory.value = { name: '', description: '', image: '' }
}

const closeCategoryModal = () => {
    showAddCategoryModal.value = false
    showEditCategoryModal.value = false
    resetCurrentCategory()
}

const addCategory = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/create`, currentCategory.value)
        await fetchCategories()
        closeCategoryModal()
    } catch (error) {
        console.error('Error adding category:', error)
    }
}

const editCategory = async (category) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/get/${category.id}`)
        currentCategory.value = {
            id: data.id,
            name: data.name,
            description: data.description || '',
            image: data.image || '',
        }
        showEditCategoryModal.value = true
    } catch (error) {
        console.error('Error fetching category:', error)
    }
}

const updateCategory = async () => {
    try {
        await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/update/${currentCategory.value.id}`, currentCategory.value)
        await fetchCategories()
        closeCategoryModal()
    } catch (error) {
        console.error('Error updating category:', error)
    }
}

const deleteCategory = (id) => {
    categoryToDeleteId.value = id
    showDeleteModal.value = true
}

const confirmDelete = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/delete/${categoryToDeleteId.value}`)
        await fetchCategories()
        showDeleteModal.value = false
        categoryToDeleteId.value = null
    } catch (error) {
        console.error('Error deleting category:', error)
    }
}

const fetchCategories = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/category/all`)
        categories.value = data
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}

const sortTable = (column) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortColumn.value = column
        sortDirection.value = 'asc'
    }
}

onMounted(fetchCategories);
</script>