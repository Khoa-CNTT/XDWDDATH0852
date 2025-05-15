<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Quản lý người dùng</h1>
            <button @click="showAddUserModal = true"
                class="bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 flex items-center cursor-pointer">
                <i class="bx bx-plus mr-1 text-lg"></i>
                Thêm người dùng
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-grow">
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm Kiếm</label>
                    <div class="relative">
                        <input type="text" id="search" v-model="searchQuery" placeholder="Tìm kiếm người dùng..."
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" />
                        <i class="bx bx-search absolute right-3 top-2.5 text-gray-500 text-xl"></i>
                    </div>
                </div>

                <div class="w-full md:w-48">
                    <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                    <select id="role" v-model="selectedRole"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300">
                        <option value="">Tất cả vai trò</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                @click="sortUsers('fullname')">
                                Tên người dùng
                                <span v-if="sortKey === 'fullname'">
                                    <i v-if="sortOrder === 'asc'" class="bx bx-chevron-up"></i>
                                    <i v-else class="bx bx-chevron-down"></i>
                                </span>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số điện thoại
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                @click="sortUsers('role_name')">
                                Vai trò
                                <span v-if="sortKey === 'role_name'">
                                    <i v-if="sortOrder === 'asc'" class="bx bx-chevron-up"></i>
                                    <i v-else class="bx bx-chevron-down"></i>
                                </span>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Địa chỉ
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                @click="sortUsers('created_at')">
                                Tham gia vào
                                <span v-if="sortKey === 'created_at'">
                                    <i v-if="sortOrder === 'asc'" class="bx bx-chevron-up"></i>
                                    <i v-else class="bx bx-chevron-down"></i>
                                </span>
                            </th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in paginatedUsers" :key="user.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                                        {{ user.fullname ? user.fullname.charAt(0) : 'U' }}
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ user.fullname }}</div>
                                        <div class="text-sm text-gray-500">ID: {{ user.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ user.phone_number }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="user.role_name === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                    ">
                                    {{ user.role_name === 'admin' ? 'Admin' : 'Customer' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ user.address }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ formatDate(user.created_at) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-3">
                                    <i class="bx bx-edit text-xl cursor-pointer"></i>
                                </button>
                                <button @click="toggleUserStatus(user)" class="text-gray-600 hover:text-gray-900 mr-3"
                                    :title="user.status === 'active' ? 'Deactivate User' : 'Activate User'">
                                    <i v-if="user.status === 'active'" class="bx bx-user-x text-xl cursor-pointer"></i>
                                    <i v-else class="bx bx-user-check text-xl cursor-pointer"></i>
                                </button>
                                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
                                    <i class="bx bx-trash text-xl cursor-pointer"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredUsers.length === 0" class="text-center py-12">
                <i class="bx bx-group text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                <p class="text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
            </div>
        </div>

        <div class="flex justify-center mt-4" v-if="filteredUsers.length > itemsPerPage">
            <button @click="currentPage--" :disabled="currentPage === 1"
                class="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50">
                Previous
            </button>
            <button @click="currentPage++" :disabled="currentPage * itemsPerPage >= filteredUsers.length"
                class="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50">
                Next
            </button>
        </div>

        <!-- Add/Edit User Modal -->
        <div v-if="showAddUserModal || showEditUserModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">
                        {{ showEditUserModal ? 'Chỉnh sửa thông tin' : 'Thêm mới người dùng' }}
                    </h2>
                </div>

                <form @submit.prevent="showEditUserModal ? updateUser() : addUser()" class="p-4">
                    <div class="mb-4">
                        <label for="userName" class="block text-sm font-medium text-gray-700 mb-1">
                            Họ và tên
                        </label>
                        <input type="text" id="userName" v-model="currentUser.fullname"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="mb-4">
                        <label for="userEmail" class="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input type="email" id="userEmail" v-model="currentUser.email"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" />
                    </div>

                    <div class="mb-4">
                        <label for="userPhoneNumber" class="block text-sm font-medium text-gray-700 mb-1">
                            Số điện thoại
                        </label>
                        <input type="text" id="userPhoneNumber" v-model="currentUser.phone_number"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="mb-4">
                        <label for="userPassword" class="block text-sm font-medium text-gray-700 mb-1">
                            {{ showEditUserModal ? 'Mật khẩu mới (để trống để cập nhật)' : 'Mật khẩu' }}
                        </label>
                        <input type="password" id="userPassword" v-model="currentUser.password"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            :required="!showEditUserModal" />
                    </div>

                    <div class="mb-4">
                        <label for="userRole" class="block text-sm font-medium text-gray-700 mb-1">
                            Vai trò
                        </label>
                        <select id="userRole" v-model="currentUser.role_name"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="userAddress" class="block text-sm font-medium text-gray-700 mb-1">
                            Địa chỉ
                        </label>
                        <input type="text" id="userAddress" v-model="currentUser.address"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300"
                            required />
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" @click="closeUserModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                            Hủy
                        </button>
                        <button type="submit" class="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 cursor-pointer">
                            {{ showEditUserModal ? 'Cập nhật' : 'Thêm' }}
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
                    <p class="text-gray-700 mb-4">
                        Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác.
                    </p>

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
const selectedRole = ref('');
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);
const showDeleteModal = ref(false);
const userToDeleteId = ref(null);
const users = ref([]);
const currentUser = ref({
    fullname: '',
    email: '',
    phone_number: '',
    password: '',
    role_name: 'customer',
    address: '',
});
const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortKey = ref(null);
const sortOrder = ref('asc');

// Fetch users from API
const fetchUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/all`);
        users.value = response.data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

onMounted(fetchUsers);

// Computed
const filteredUsers = computed(() => {
    let result = [...users.value];

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (user) =>
                user.fullname.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone_number.includes(query)
        );
    }

    // Filter by role
    if (selectedRole.value) {
        result = result.filter((user) => user.role_name === selectedRole.value);
    }

    // Sort users
    if (sortKey.value) {
        result.sort((a, b) => {
            const valA = a[sortKey.value];
            const valB = b[sortKey.value];

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder.value === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            } else {
                return sortOrder.value === 'asc' ? valA - valB : valB - valA;
            }
        });
    }

    return result;
});

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredUsers.value.slice(start, end);
});

// Methods
const resetCurrentUser = () => {
    currentUser.value = {
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        role_name: 'customer',
        address: '',
    };
};

const closeUserModal = () => {
    showAddUserModal.value = false;
    showEditUserModal.value = false;
    resetCurrentUser();
};

const addUser = async () => {
    try {
        // Check if email already exists
        const existingUser = users.value.find((user) => user.email === currentUser.value.email);
        if (existingUser) {
            alert('Email already exists!');
            return;
        }

        await axios.post(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/register`, {
            ...currentUser.value,
        });
        fetchUsers();
        closeUserModal();
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

const editUser = (user) => {
    currentUser.value = { ...user };
    showEditUserModal.value = true;
};

const updateUser = async () => {
    try {
        await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/update/${currentUser.value.id}`, {
            ...currentUser.value,
        });
        fetchUsers();
        closeUserModal();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const toggleUserStatus = async (user) => {
    try {
        await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/update/${user.id}`, {
            ...user,
            status: user.status === 'active' ? 'inactive' : 'active',
        });
        fetchUsers();
    } catch (error) {
        console.error('Error toggling user status:', error);
    }
};

const deleteUser = (id) => {
    userToDeleteId.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/users/delete/${userToDeleteId.value}`);
        fetchUsers();
        showDeleteModal.value = false;
        userToDeleteId.value = null;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const sortUsers = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};
</script>