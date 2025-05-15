<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Bảng điều khiển</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4">
            <i class='bx bx-cart-alt text-2xl'></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tổng đơn hàng</p>
            <h3 class="text-2xl font-bold">{{ totalOrders }}</h3>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 flex items-center">
          <i class='bx bx-trending-up text-sm mr-1'></i>
          <span>12% increase</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
            <i class='bx bx-dollar text-2xl'></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tổng doanh thu</p>
            <h3 class="text-2xl font-bold">$6,240</h3>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 flex items-center">
          <i class='bx bx-trending-up text-sm mr-1'></i>
          <span>8% increase</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4">
            <i class='bx bx-user text-2xl'></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Số lượng người dùng</p>
            <h3 class="text-2xl font-bold">{{ totalUsers }}</h3>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 flex items-center">
          <i class='bx bx-trending-up text-sm mr-1'></i>
          <span>24% increase</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-4">
            <i class='bx bx-package text-2xl'></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tổng sản phẩm</p>
            <h3 class="text-2xl font-bold">{{ totalProducts }}</h3>
          </div>
        </div>
        <div class="mt-4 text-sm text-red-600 flex items-center">
          <i class='bx bx-trending-down text-sm mr-1'></i>
          <span>3% decrease</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-lg font-semibold">Đơn hàng gần đây (mới)</h2>
          <router-link to="/admin/orders" class="text-rose-600 hover:text-rose-800 text-sm">Xem tất cả</router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn hàng</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên người dùng</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái thanh toán</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">#{{ order.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ order.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.total }} VNĐ</td>
                <td class="px-6 py-4">
                  <span :class="`px-3 py-1 rounded-full text-sm font-medium ${translateStatus(order.status).color}`">
                    {{ translateStatus(order.status).text }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold">Top sản phẩm</h2>
        </div>

        <ul class="divide-y divide-gray-200">
          <li v-for="product in topProducts" :key="product.id" class="p-4">
            <div class="flex items-center">
              <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded mr-3">
              <div class="flex-grow">
                <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                <p class="text-sm text-gray-500">${{ product.price.toFixed(2) }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ product.sales }} sold</p>
                <p class="text-xs text-gray-500">{{ product.revenue }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { menuItemAPI, orderAPI, userAPI } from '../../services/apis';

const totalOrders = ref(0)
const totalUsers = ref(0)
const totalProducts = ref(0)

onMounted(async () => {
  try {
    const response = await orderAPI.getOrderAll()
    totalOrders.value = response.data.length;
  } catch (error) {
    console.error('Failed to fetch total orders:', error);
  }
});

onMounted(async () => {
  try {
    const response = await userAPI.getAllUsers()
    totalUsers.value = response.data.users.length;
  } catch (error) {
    console.error('Failed to fetch total users:', error);
  }
})

onMounted(async () => {
  try {
    const response = await menuItemAPI.getAll()
    totalProducts.value = response.data.length;
  } catch (error) {
    console.error('Failed to fetch total users:', error);
  }
})

const translateStatus = (status) => {
  const statusMap = {
    pending: { text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
    processing: { text: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
    shipped: { text: 'Đã gửi hàng', color: 'bg-purple-100 text-purple-800' },
    delivered: { text: 'Đã giao hàng', color: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Đã hủy', color: 'bg-red-100 text-red-800' },
  };


  if (!status) {
    console.log("Status is undefined or null:", status);
  }

  const normalized = status?.toLowerCase;

  return statusMap[normalized] || { text: 'Không rõ', color: 'bg-gray-100 text-gray-800' };
}

const recentOrders = ref([]);
onMounted(async () => {
  try {
    const response = await orderAPI.getOrderAll()
    recentOrders.value = response.data.slice(0, 5).map(order => ({
      id: order.id,
      name: order.User.fullname || 'Ẩn danh',
      total: order.total_price.toLocaleString('vi-VN') || '0',
      status: translateStatus(order.status),
      paymentStatus: order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán',
    }
    ))
  } catch (err) {
    console.error('Lỗi lấy đơn hàng gần đây:', err)
  }
})

const topProducts = ref([
  {
    id: 1,
    name: 'Classic Burger',
    price: 8.99,
    sales: 42,
    revenue: '$377.58',
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    price: 12.99,
    sales: 38,
    revenue: '$493.62',
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 3,
    name: 'California Roll',
    price: 9.99,
    sales: 35,
    revenue: '$349.65',
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 4,
    name: 'Chocolate Brownie',
    price: 6.99,
    sales: 30,
    revenue: '$209.70',
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 5,
    name: 'Strawberry Milkshake',
    price: 4.99,
    sales: 28,
    revenue: '$139.72',
    image: '/placeholder.svg?height=100&width=100'
  }
]);
</script>