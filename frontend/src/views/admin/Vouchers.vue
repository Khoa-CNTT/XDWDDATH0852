<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Quản lý Vouchers</h1>
            <button @click="showAddVoucherModal = true"
                class="bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 flex items-center cursor-pointer">
                <i class="bx bx-plus mr-1"></i>
                Tạo voucher
            </button>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-grow">
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm Kiếm</label>
                    <div class="relative">
                        <input type="text" id="search" v-model="searchQuery" placeholder="Tìm kiếm theo mã voucher..."
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300" />
                        <i class="bx bx-search absolute right-3 top-2.5 text-gray-500 h-5 w-5"></i>
                    </div>
                </div>

                <div class="w-full md:w-48">
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select id="status" v-model="selectedStatus"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 ">
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                        <option value="expired">Đã hết hạn</option>
                    </select>
                </div>

                <div class="w-full md:w-48">
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                    <select id="type" v-model="selectedType"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 ">
                        <option value="">Tất cả các loại</option>
                        <option value="percentage">Phần trăm (%)</option>
                        <option value="fixed">Số tiền cố định (VNĐ)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Vouchers Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã voucher
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Giảm giá
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thời hạn sử dụng
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lượt sử dụng
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="voucher in filteredVouchers" :key="voucher.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex flex-col">
                                        <div class="text-sm font-medium text-gray-900">{{ voucher.code }}</div>
                                        <div class="text-xs text-gray-500 mt-1">{{ voucher.description }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span class="font-medium" :class="{
                                    'text-green-600': voucher.type === 'percentage',
                                    'text-blue-600': voucher.type === 'fixed',
                                }">
                                    {{ voucher.type === 'percentage' ? `${voucher.value}%` :
                                        `${voucher.value.toLocaleString('vi-VN')} VNĐ` }}
                                </span>
                                <div class="text-xs text-gray-500 mt-1">
                                    {{ voucher.type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định (VNĐ)' }}
                                </div>
                                <div v-if="voucher.minOrderValue > 0" class="text-xs text-gray-500 mt-1">
                                    Tối thiểu: {{ voucher.minOrderValue.toLocaleString('vi-VN') }} VNĐ
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div><b>From:</b>  {{ formatDate(voucher.startDate) }}</div>
                                <div><b>To:</b> {{ formatDate(voucher.endDate) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{{ voucher.usedCount }} / {{ voucher.maxUses === 0 ? '∞' : voucher.maxUses }}</div>
                                <div class="text-xs text-gray-500 mt-1">
                                    {{ voucher.maxUsesPerUser === 0 ? 'Không giới hạn' : `${voucher.maxUsesPerUser}
                                    mỗi người dùng` }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                                    'bg-green-100 text-green-800': voucher.status === 'active',
                                    'bg-red-100 text-red-800': voucher.status === 'inactive',
                                    'bg-gray-100 text-gray-800': voucher.status === 'expired',
                                }">
                                    {{ voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editVoucher(voucher)"
                                    class="text-indigo-600 hover:text-indigo-900 mr-3">
                                    <i class="bx bx-edit h-5 w-5 text-xl cursor-pointer"></i>
                                </button>
                                <button @click="toggleVoucherStatus(voucher)"
                                    class="text-gray-600 hover:text-gray-900 mr-3"
                                    :title="voucher.status === 'active' ? 'Deactivate Voucher' : 'Activate Voucher'"
                                    :disabled="voucher.status === 'expired'"
                                    :class="{ 'opacity-50 cursor-not-allowed': voucher.status === 'expired' }">
                                    <i :class="{
                                        'bx bx-hide': voucher.status === 'active',
                                        'bx bx-show': voucher.status === 'inactive',
                                        'bx bx-time': voucher.status === 'expired',
                                    }" class="h-5 w-5 text-xl cursor-pointer"></i>
                                </button>
                                <button @click="deleteVoucher(voucher.id)" class="text-red-600 hover:text-red-900">
                                    <i class="bx bx-trash h-5 w-5 text-xl cursor-pointer"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Empty State -->
            <div v-if="filteredVouchers.length === 0" class="text-center py-12">
                <i class='bx bx-purchase-tag text-6xl text-gray-400 mb-4'></i>
                <h3 class=" text-xl font-semibold text-gray-700 mb-2">No vouchers found</h3>
                <p class="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        </div>

        <!-- Add/Edit Voucher Modal -->
        <div v-if="showAddVoucherModal || showEditVoucherModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">{{ showEditVoucherModal ? 'Chỉnh sửa Voucher' : 'Tạo mới voucher' }}
                    </h2>
                </div>

                <form @submit.prevent="showEditVoucherModal ? updateVoucher() : addVoucher()" class="p-4">
                    <div class="mb-4">
                        <label for="voucherCode" class="block text-sm font-medium text-gray-700 mb-1">Tạo Voucher
                            Code</label>
                        <div class="flex">
                            <input type="text" id="voucherCode" v-model="currentVoucher.code"
                                class="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                                required :disabled="showEditVoucherModal" />
                            <button v-if="!showEditVoucherModal" type="button" @click="generateRandomCode"
                                class="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-300">
                                Generate
                            </button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="voucherDescription"
                            class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <input type="text" id="voucherDescription" v-model="currentVoucher.description"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                            required />
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label for="voucherType" class="block text-sm font-medium text-gray-700 mb-1">Loại giảm giá</label>
                            <select id="voucherType" v-model="currentVoucher.type"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                                required>
                                <option value="percentage">Phần trăm</option>
                                <option value="fixed">Số tiền cố định</option>
                            </select>
                        </div>

                        <div>
                            <label for="voucherValue" class="block text-sm font-medium text-gray-700 mb-1">
                                {{ currentVoucher.type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định (VNĐ)' }}
                            </label>
                            <input type="number" id="voucherValue" v-model.number="currentVoucher.value" :min="0"
                                :max="currentVoucher.type === 'percentage' ? 100 : null" step="0.01"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                                required />
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="voucherMinOrderValue" class="block text-sm font-medium text-gray-700 mb-1">
                            Giá trị đơn hàng tối thiểu (VNĐ)
                        </label>
                        <input type="number" id="voucherMinOrderValue" v-model.number="currentVoucher.minOrderValue"
                            min="0" step="0.01"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 " />
                        <p class="mt-1 text-xs text-gray-500">Set to 0 for no minimum</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label for="voucherStartDate" class="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                            <input type="date" id="voucherStartDate" v-model="currentVoucher.startDate"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                                required />
                        </div>

                        <div>
                            <label for="voucherEndDate" class="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                            <input type="date" id="voucherEndDate" v-model="currentVoucher.endDate"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 "
                                required />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label for="voucherMaxUses" class="block text-sm font-medium text-gray-700 mb-1">Sử dụng tối đa</label>
                            <input type="number" id="voucherMaxUses" v-model.number="currentVoucher.maxUses" min="0"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 " />
                            <p class="mt-1 text-xs text-gray-500">Set to 0 for unlimited</p>
                        </div>

                        <div>
                            <label for="voucherMaxUsesPerUser" class="block text-sm font-medium text-gray-700 mb-1">
                                Sử dụng tối đa cho mỗi người
                            </label>
                            <input type="number" id="voucherMaxUsesPerUser"
                                v-model.number="currentVoucher.maxUsesPerUser" min="0"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 border-gray-300 " />
                            <p class="mt-1 text-xs text-gray-500">Set to 0 for unlimited</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="flex items-center">
                            <input type="checkbox" id="voucherStatus" v-model="currentVoucher.isActive"
                                class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" />
                            <label for="voucherStatus" class="ml-2 block text-sm text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" @click="closeVoucherModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            Hủy
                        </button>
                        <button type="submit" class="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700">
                            {{ showEditVoucherModal ? 'Cập nhật' : 'Tạo' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-4 border-b">
                    <h2 class="text-lg font-semibold">Confirm Delete</h2>
                </div>

                <div class="p-4">
                    <p class="text-gray-700 mb-4">Are you sure you want to delete this voucher? This action cannot be
                        undone.</p>

                    <div class="flex justify-end gap-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button @click="confirmDelete"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            Delete
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
const selectedStatus = ref('');
const selectedType = ref('');
const showAddVoucherModal = ref(false);
const showEditVoucherModal = ref(false);
const showDeleteModal = ref(false);
const voucherToDeleteId = ref(null);
const isLoading = ref(false);
const error = ref(null);

// Current date for validation
const today = new Date().toISOString().split('T')[0];

// Vouchers data from API
const vouchers = ref([]);

// Current voucher for add/edit
const currentVoucher = ref({
    code: '',
    description: '',
    type: 'percentage',
    value: 10,
    minOrderValue: 0,
    startDate: today,
    endDate: '',
    maxUses: 0,
    maxUsesPerUser: 0,
    isActive: true,
});

// Set default end date to 30 days from now
const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 30);
currentVoucher.value.endDate = defaultEndDate.toISOString().split('T')[0];

// Fetch vouchers from API
const fetchVouchers = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/voucher/all`);
        vouchers.value = Array.isArray(response.data)
            ? response.data.map((voucher) => ({
                ...voucher,
                type: voucher.discount_type === 'percent' ? 'percentage' : 'fixed',
                value: parseFloat(voucher.discount_value),
                minOrderValue: parseFloat(voucher.min_order_amount),
                maxUses: voucher.limit,
                maxUsesPerUser: voucher.max_uses_per_user || 0,
                usedCount: voucher.used_count || 0,
                startDate: voucher.start_date,
                endDate: voucher.end_date,
                status: voucher.status,
            }))
            : [];
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch vouchers';
        console.error('Error fetching vouchers:', err);
        vouchers.value = [];
    } finally {
        isLoading.value = false;
    }
};

// Computed
const filteredVouchers = computed(() => {
    if (!Array.isArray(vouchers.value)) {
        return [];
    }

    let result = [...vouchers.value];

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (voucher) =>
                voucher.code?.toLowerCase().includes(query) ||
                voucher.description?.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (selectedStatus.value) {
        result = result.filter((voucher) => voucher.status === selectedStatus.value);
    }

    // Filter by type
    if (selectedType.value) {
        result = result.filter((voucher) => voucher.type === selectedType.value);
    }

    // Sort by creation date (newest first)
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
});

// Methods
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const resetCurrentVoucher = () => {
    currentVoucher.value = {
        code: '',
        description: '',
        type: 'percentage',
        value: 10,
        minOrderValue: 0,
        startDate: today,
        endDate: defaultEndDate.toISOString().split('T')[0],
        maxUses: 0,
        maxUsesPerUser: 0,
        isActive: true,
    };
};

const closeVoucherModal = () => {
    showAddVoucherModal.value = false;
    showEditVoucherModal.value = false;
    resetCurrentVoucher();
};

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    currentVoucher.value.code = result;
};

const addVoucher = async () => {
    try {
        isLoading.value = true;
        const payload = {
            code: currentVoucher.value.code,
            description: currentVoucher.value.description,
            discount_type: currentVoucher.value.type === 'percentage' ? 'percent' : 'fixed',
            discount_value: currentVoucher.value.value,
            min_order_amount: currentVoucher.value.minOrderValue,
            start_date: currentVoucher.value.startDate,
            end_date: currentVoucher.value.endDate,
            limit: currentVoucher.value.maxUses,
            max_uses_per_user: currentVoucher.value.maxUsesPerUser,
            status: currentVoucher.value.isActive ? 'active' : 'inactive',
        };
        const response = await axios.post(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/voucher/create`, payload);

        vouchers.value.unshift({
            ...response.data.voucher,
            type: response.data.voucher.discount_type === 'percent' ? 'percentage' : 'fixed',
            value: parseFloat(response.data.voucher.discount_value),
            minOrderValue: parseFloat(response.data.voucher.min_order_amount),
            maxUses: response.data.voucher.limit,
            maxUsesPerUser: response.data.voucher.max_uses_per_user || 0,
            usedCount: response.data.voucher.used_count || 0,
            startDate: response.data.voucher.start_date,
            endDate: response.data.voucher.end_date,
            status: response.data.voucher.status,
        });

        alert(response.data.message);
        console.log('Voucher created:', response.data.message);
        closeVoucherModal();
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to create voucher';
        console.error('Error creating voucher:', err);
        alert(error.value);
    } finally {
        isLoading.value = false;
    }
};

const editVoucher = (voucher) => {
    currentVoucher.value = {
        id: voucher.id,
        code: voucher.code,
        description: voucher.description,
        type: voucher.type,
        value: voucher.value,
        minOrderValue: voucher.minOrderValue,
        startDate: voucher.startDate,
        endDate: voucher.endDate,
        maxUses: voucher.maxUses,
        maxUsesPerUser: voucher.maxUsesPerUser,
        isActive: voucher.status === 'active',
    };
    showEditVoucherModal.value = true;
};

const updateVoucher = async () => {
    try {
        isLoading.value = true;
        const { id, ...voucherData } = currentVoucher.value;
        const payload = {
            code: voucherData.code,
            description: voucherData.description,
            discount_type: voucherData.type === 'percentage' ? 'percent' : 'fixed',
            discount_value: voucherData.value,
            min_order_amount: voucherData.minOrderValue,
            start_date: voucherData.startDate,
            end_date: voucherData.endDate,
            limit: voucherData.maxUses,
            max_uses_per_user: voucherData.maxUsesPerUser,
            status: voucherData.isActive ? 'active' : 'inactive',
        };
        const response = await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/voucher/update/${id}`, payload);

        const index = vouchers.value.findIndex((v) => v.id === id);
        if (index !== -1) {
            vouchers.value[index] = {
                ...vouchers.value[index],
                ...response.data.voucher,
                type: response.data.voucher.discount_type === 'percent' ? 'percentage' : 'fixed',
                value: parseFloat(response.data.voucher.discount_value),
                minOrderValue: parseFloat(response.data.voucher.min_order_amount),
                maxUses: response.data.voucher.limit,
                maxUsesPerUser: response.data.voucher.max_uses_per_user || 0,
                usedCount: response.data.voucher.used_count || 0,
                startDate: response.data.voucher.start_date,
                endDate: response.data.voucher.end_date,
                status: response.data.voucher.status,
            };
        }

        alert(response.data.message);
        console.log('Voucher updated:', response.data.message);
        closeVoucherModal();
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to update voucher';
        console.error('Error updating voucher:', err);
        alert(error.value);
    } finally {
        isLoading.value = false;
    }
};

const toggleVoucherStatus = async (voucher) => {
    if (voucher.status === 'expired') {
        return;
    }

    try {
        isLoading.value = true;
        const newStatus = voucher.status === 'active' ? 'inactive' : 'active';
        await axios.put(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/voucher/update/${voucher.id}`, {
            status: newStatus,
        });

        const index = vouchers.value.findIndex((v) => v.id === voucher.id);
        if (index !== -1) {
            vouchers.value[index].status = newStatus;
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to update voucher status';
        console.error('Error updating voucher status:', err);
        alert(error.value);
    } finally {
        isLoading.value = false;
    }
};

const deleteVoucher = (id) => {
    voucherToDeleteId.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        isLoading.value = true;
        await axios.delete(`${import.meta.env.VITE_API_DOMAIN_SERVER}/api/voucher/delete/${voucherToDeleteId.value}`);
        vouchers.value = vouchers.value.filter((v) => v.id !== voucherToDeleteId.value);
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to delete voucher';
        console.error('Error deleting voucher:', err);
        alert(error.value);
    } finally {
        showDeleteModal.value = false;
        voucherToDeleteId.value = null;
        isLoading.value = false;
    }
};

// Fetch vouchers when component mounts
onMounted(fetchVouchers);
</script>
