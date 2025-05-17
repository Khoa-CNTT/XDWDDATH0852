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
          <span>12% tăng</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
            <i class='bx bx-dollar text-2xl'></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tổng doanh thu</p>
            <h3 class="text-2xl font-bold">{{ totalRevenue.toLocaleString('vi-VN') }} VNĐ</h3>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 flex items-center">
          <i class='bx bx-trending-up text-sm mr-1'></i>
          <span>8% tăng</span>
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
          <span>24% tăng</span>
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
          <span>3% giảm</span>
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
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.total.toLocaleString('vi-VN') }} VNĐ</td>
                <td class="px-6 py-4">
                  <span :class="`px-3 py-1 rounded-full text-sm font-medium ${translateStatus(order.status).color}`">
                    {{ translateStatus(order.status).text }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ order.paymentStatus }}</td>
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
                <p class="text-sm text-gray-500">{{ product.price.toLocaleString('vi-VN') }} VNĐ</p>
              </div>
              <!-- <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ product.sales }} lượt bán</p>
                <p class="text-xs text-gray-500">{{ product.revenue }}</p>
              </div> -->
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

// Tổng đơn hàng
const totalOrders = ref(0)
onMounted(async () => {
  try {
    const response = await orderAPI.getOrderAll()
    totalOrders.value = response.data.length;
  } catch (error) {
    console.error('Failed to fetch total orders:', error);
  }
});

// Tổng doanh thu
const totalRevenue = ref(0);
onMounted(async () => {
  try {
    const response = await orderAPI.getOrderAll();
    const orders = response.data;

    totalOrders.value = orders.length;

    // Tính tổng doanh thu từ các đơn hàng đã thanh toán
    const revenue = orders.reduce((sum, order) => {
      if (order.payment_status === 'paid') {
        return sum + (order.total_price || 0);
      }
      return sum;
    }, 0);

    totalRevenue.value = +revenue;


  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
  }
});

const totalUsers = ref(0)
onMounted(async () => {
  try {
    const response = await userAPI.getAllUsers()
    totalUsers.value = response.data.users.length;
  } catch (error) {
    console.error('Failed to fetch total users:', error);
  }
})

// Tổng sản phẩm
const totalProducts = ref(0)
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

  const normalized = status?.toLowerCase();

  return statusMap[normalized] || { text: 'Không rõ', color: 'bg-gray-100 text-gray-800' };
}

// Đơn hàng gần đây
const recentOrders = ref([]);
onMounted(async () => {
  try {
    const response = await orderAPI.getOrderAll();
    // Sắp xếp giảm dần theo id hoặc createdAt
    const sortedOrders = response.data.sort((a, b) => b.id - a.id);
    // Lấy 5 đơn hàng mới nhất
    recentOrders.value = sortedOrders.slice(0, 5).map(order => ({
      id: order.id,
      name: order.User.fullname || 'Ẩn danh',
      total: +order.total_price || '0',
      status: order.status,
      paymentStatus: order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán',
    }));
  } catch (err) {
    console.error('Lỗi lấy đơn hàng gần đây:', err);
  }
})

const topProducts = ref([
  {
    id: 1,
    name: 'Burger phô mai',
    price: 45000,
    sales: 21,
    revenue: '377.58',
    image: 'https://i.pinimg.com/736x/77/fe/73/77fe73fe2444046dc17eed609e2b5bfc.jpg'
  },
  {
    id: 2,
    name: 'Burger bò kép',
    price: 55000,
    sales: 18,
    revenue: '493.62',
    image: 'https://i.pinimg.com/736x/f3/ec/56/f3ec56efb86db9f06b081ca7963b2c62.jpg'
  },
  {
    id: 3,
    name: 'Pizza xúc xích',
    price: 80000,
    sales: 20,
    revenue: '349.65',
    image: 'https://i.pinimg.com/736x/e0/c5/b5/e0c5b5ee8e4c56894a8550da6c789d73.jpg'
  },
  {
    id: 4,
    name: 'Khoai tây chiên',
    price: 30000,
    sales: 16,
    revenue: '209.70',
    image: 'https://i.pinimg.com/736x/6e/7b/5e/6e7b5e91357a7ce785a75d3449c1ded5.jpg'
  },
  {
    id: 5,
    name: 'Sữa lắc socola',
    price: 35000,
    sales: 13,
    revenue: '139.72',
    image: 'https://i.pinimg.com/736x/68/6c/1c/686c1c731d606d0ddc05a2955b1852c5.jpg'
  }
]);
</script>