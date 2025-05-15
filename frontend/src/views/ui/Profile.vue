<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <!-- Profile Header -->
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Thông tin cá nhân</h1>
            <button @click="toggleEditMode"
                class="py-2 px-5 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                {{ isEditing ? 'Hủy' : 'Chỉnh sửa thông tin' }}
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16">
            <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600">Loading your profile...</p>
        </div>

        <div v-else class="flex flex-col gap-6">
            <!-- Profile Summary Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div class="flex items-center gap-6 md:flex-row flex-col md:text-left text-center">
                    <div class="relative w-24 h-24 rounded-full overflow-hidden">
                        <img :src="user.avatar || 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg'" alt="Profile picture"
                            class="w-full h-full object-cover">
                            {{ console.log('user.avartar', user.avatar) }}
                        <div v-if="isEditing"
                            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                            <label for="avatar-upload" class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span class="sr-only">Upload new photo</span>
                            </label>
                            <input id="avatar-upload" type="file" class="hidden" @change="handleAvatarChange">
                        </div>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900">{{ user.fullname }}</h2>
                        <p class="text-sm text-gray-500 mt-1">Tài khoản được tạo: {{ formatDate(user.createdAt) }}</p>
                    </div>
                </div>
            </div>

            <!-- Personal Information Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3
                    class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200 flex items-center gap-2">
                    <i class='bx bx-info-circle'></i> Thông tin cá nhân
                </h3>

                <!-- View Mode -->
                <div v-if="!isEditing" class="flex flex-col gap-3">
                    <div class="flex flex-wrap gap-2">
                        <span class="text-gray-600 font-bold min-w-[120px]">Họ tên:</span>
                        <span class="text-gray-900 flex-1">{{ user.fullname }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span class="text-gray-600 font-bold min-w-[120px]">Email:</span>
                        <span class="text-gray-900 flex-1">{{ user.email }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span class="text-gray-600 font-bold min-w-[120px]">Số điện thoại:</span>
                        <span class="text-gray-900 flex-1">{{ user.phone || 'Not provided' }}</span>
                    </div>
                </div>

                <!-- Edit Mode -->
                <form v-else class="flex flex-col gap-5" @submit.prevent="savePersonalInfo">
                    <div class="flex flex-col gap-2">
                        <label for="fullname" class="text-sm font-medium text-gray-600">Họ tên</label>
                        <input type="text" id="fullname" v-model="editForm.fullname"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email" class="text-sm font-medium text-gray-600">Email</label>
                        <input type="email" id="email" v-model="editForm.email"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            required>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="phone" class="text-sm font-medium text-gray-600">Số điện thoại</label>
                        <input type="tel" id="phone" v-model="editForm.phone"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                    </div>
                    <div class="flex justify-end mt-2">
                        <button type="submit"
                            class="py-2 px-5 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition-colors cursor-pointer">Lưu thay đổi</button>
                    </div>
                </form>
            </div>

            <!-- Shipping Address Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200"><i
                        class='bx bx-home-alt'></i> Địa chỉ giao hàng</h3>

                <!-- View Mode -->
                <div v-if="!isEditing">
                    <div v-if="user.address" class="p-4 bg-gray-50 rounded-md mb-4">
                        <p class="text-sm text-gray-700 leading-relaxed">{{ user.address }}</p>
                    </div>
                    <div v-else class="italic text-gray-500">
                        <p>Không cung cấp địa chỉ giao hàng.</p>
                    </div>
                </div>

                <!-- Edit Mode -->
                <form v-else class="flex flex-col gap-5" @submit.prevent="saveAddress">
                    <div class="flex flex-col gap-2">
                        <label for="address" class="text-sm font-medium text-gray-600">Địa chỉ</label>
                        <input type="text" id="address" v-model="editForm.address"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            required>
                    </div>
                    <div class="flex justify-end mt-2">
                        <button type="submit"
                            class="py-2 px-5 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition-colors cursor-pointer">Lưu
                            địa chỉ</button>
                    </div>
                </form>
            </div>

            <!-- Password Change Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200"><i
                        class='bx bx-lock-alt'></i> Thay đổi mật khẩu</h3>
                <form class="flex flex-col gap-5" @submit.prevent="changePassword">
                    <div class="flex flex-col gap-2">
                        <label for="currentPassword" class="text-sm font-medium text-gray-600">Mật khẩu hiện tại</label>
                        <input type="password" id="currentPassword" v-model="passwordForm.currentPassword"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            required>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="newPassword" class="text-sm font-medium text-gray-600">Mật khẩu mới</label>
                        <input type="password" id="newPassword" v-model="passwordForm.newPassword"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            required minlength="8">
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="confirmPassword" class="text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
                        <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword"
                            class="p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            required>
                        <p v-if="passwordMismatch" class="text-xs text-red-600 mt-1">Mật khẩu không khớp</p>
                    </div>
                    <div class="flex justify-end mt-2">
                        <button type="submit"
                            class="py-2 px-5 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition-colors cursor-pointer">Thay
                            đổi</button>
                    </div>
                </form>
            </div>

            <!-- Preferences Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200">Preferences</h3>
                <div class="flex flex-col gap-5">
                    <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                            <h4 class="font-medium text-gray-900">Email Notifications</h4>
                            <p class="text-sm text-gray-500">Receive emails about your orders, account updates, and
                                promotions</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="preferences.emailNotifications" class="sr-only peer">
                            <div
                                class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500">
                            </div>
                        </label>
                    </div>
                    <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                            <h4 class="font-medium text-gray-900">SMS Notifications</h4>
                            <p class="text-sm text-gray-500">Receive text messages about your orders and delivery
                                updates</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="preferences.smsNotifications" class="sr-only peer">
                            <div
                                class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
                            </div>
                        </label>
                    </div>
                    <div class="flex justify-between items-center pb-4">
                        <div>
                            <h4 class="font-medium text-gray-900">Newsletter</h4>
                            <p class="text-sm text-gray-500">Subscribe to our newsletter for the latest products and
                                deals</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="preferences.newsletter" class="sr-only peer">
                            <div
                                class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
                            </div>
                        </label>
                    </div>
                    <div class="flex justify-end mt-2">
                        <button @click="savePreferences"
                            class="py-2 px-5 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition-colors cursor-pointer">Save
                            Preferences</button>
                    </div>
                </div>
            </div>

            <!-- Danger Zone Card -->
            <div class="bg-white rounded-lg border border-red-100 shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200"><i
                        class='bx bxs-user-account'></i> Tài khoản của bạn</h3>
                <div class="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h4 class="font-medium text-red-700">Xóa tài khoản</h4>
                        <p class="text-sm text-gray-500 max-w-lg">Xóa vĩnh viễn tài khoản của bạn và tất cả dữ liệu liên quan. Không thể hoàn tác hành động này.</p>
                    </div>
                    <button @click="confirmDeleteAccount"
                        class="py-2 px-5 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer">Xóa tài khoản</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { userAPI } from '../../services/apis';

// Reactive state
const loading = ref(true);
const isEditing = ref(false);
const passwordMismatch = ref(false);
const user = ref({});

// Form for editing profile
const editForm = reactive({
    fullname: '',
    email: '',
    phone: '',
    address: ''
});

// Form for changing password
const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

// User preferences
const preferences = reactive({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true
});

// Fetch user profile
const fetchUserProfile = async () => {
    try {
        // Get user from localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // Redirect to login if no user is found
            window.location.href = '/login';
            return;
        }

        // Parse user data
        const userData = JSON.parse(storedUser);
        console.log('User data from localStorage:', userData);

        // Fetch user data from API - using a simulated API response for demo
        // In a real application, you would uncomment the line below
        // const response = await userAPI.getProfile(userData.id);
        
       
        // Set user data
        user.value = {
            id: userData.id,
            fullname: userData.fullname || '',
            email: userData.email || '',
            phone: userData.phone || userData.phone_number || '',
            avatar: userData.avatar || 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg',
            createdAt: userData.createdAt || userData.created_at || new Date().toISOString(),
            address: userData.address || ''
        };

        // Initialize edit form with user data
        Object.assign(editForm, {
            fullname: user.value.fullname,
            email: user.value.email,
            phone: user.value.phone || '',
            address: user.value.address || ''
        });

        loading.value = false;
    } catch (error) {
        console.error('Error fetching profile:', error);
        loading.value = false;
    }
};

// Toggle edit mode
const toggleEditMode = () => {
    if (isEditing.value) {
        // Reset form to original values if canceling
        Object.assign(editForm, {
            fullname: user.value.fullname,
            email: user.value.email,
            phone: user.value.phone || '',
            address: user.value.address || ''
        });
    }
    isEditing.value = !isEditing.value;
};

// Save personal information
const savePersonalInfo = async () => {
    try {
        // Prepare data for API
        const updateData = {
            fullname: editForm.fullname,
            email: editForm.email,
            phone_number: editForm.phone
        };

        // In a real application, you would uncomment the line below
        await userAPI.updateProfile(user.value.id, updateData);

        // Update local user object
        Object.assign(user.value, updateData);

        // Save updated user to localStorage
        localStorage.setItem('user', JSON.stringify(user.value));

        // Exit edit mode
        isEditing.value = false;

        console.log('Personal info saved:', updateData);
        alert('Thông tin cá nhân được cập nhật thành công!');
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to update personal information. Please try again.');
    }
};

// Save address
const saveAddress = async () => {
    try {
        // Prepare data for API
        const updateData = {
            address: editForm.address
        };

        // In a real application, you would uncomment the line below
        // await userAPI.updateProfile(user.value.id, updateData);

        // Update local user object
        user.value.address = editForm.address;

        // Save updated user to localStorage
        localStorage.setItem('user', JSON.stringify(user.value));

        console.log('Address saved:', editForm.address);
        alert('Address updated successfully!');
    } catch (error) {
        console.error('Error saving address:', error);
        alert('Failed to update address. Please try again.');
    }
};

// Change password
const changePassword = async () => {
    // Check if passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        passwordMismatch.value = true;
        return;
    }

    passwordMismatch.value = false;

    try {
        // Prepare data for API
        const passwordData = {
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword
        };

        // In a real application, you would uncomment the line below
        const response = await userAPI.changePassword(user.value.id, passwordData);
        console.log('Password change response:', response);

        // Reset password form
        passwordForm.currentPassword = '';
        passwordForm.newPassword = '';
        passwordForm.confirmPassword = '';

        console.log('Password data sent:', passwordData);
        alert('Đổi mật khẩu thành công!');
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Không thể đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.');
    }
};

// Save preferences
const savePreferences = async () => {
    try {
        // Save preferences to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(preferences));

        console.log('Preferences saved:', preferences);
        alert('Preferences updated successfully!');
    } catch (error) {
        console.error('Error saving preferences:', error);
        alert('Failed to update preferences. Please try again.');
    }
};

// Handle avatar change
const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a local URL for the avatar
    const reader = new FileReader();
    reader.onload = (e) => {
        user.value.avatar = e.target.result;

        // Save updated user to localStorage
        localStorage.setItem('user', JSON.stringify(user.value));
    };
    reader.readAsDataURL(file);

    console.log('Avatar changed');
};

// Confirm account deletion
const confirmDeleteAccount = () => {
    if (confirm('Bạn có chắc muốn xóa tài khoản này không? Hành động này không thể hoàn tác!')) {
        deleteAccount();
    }
};

// Delete account
const deleteAccount = async () => {
    try {
        // In a real application, you would uncomment the line below
        await userAPI.deleteAccount(user.value.id);

        console.log('Account deleted');
        alert('Tài khoản của bạn đã được xóa. Bạn sẽ thoát ra khỏi hệ thống');

        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userPreferences');

        // Redirect to login page
        window.location.href = '/login';
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
    }
};

// Format date
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
};

// Lifecycle hooks
onMounted(() => {
    fetchUserProfile();

    // Load preferences from localStorage
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
        Object.assign(preferences, JSON.parse(storedPreferences));
    }
});
</script>