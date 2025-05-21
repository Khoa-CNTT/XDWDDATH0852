<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 class="text-3xl font-bold mb-4 md:mb-0">Đơn hàng của tôi</h1>
      <div class="flex flex-col sm:flex-row gap-4">
        <select v-model="statusFilter" class="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700">
          <option value="all">Tất cả đơn hàng</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipped">Đã gửi hàng</option>
          <option value="delivered">Đã giao hàng</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <select v-model="sortBy" class="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700">
          <option value="date-desc">Mới nhất trước</option>
          <option value="date-asc">Cũ nhất trước</option>
          <option value="total-desc">Số tiền cao nhất</option>
          <option value="total-asc">Số tiền thấp nhất</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchOrders"
        class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition">
        Thử lại
      </button>
    </div>

    <div v-else-if="filteredOrders.length === 0"
      class="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Không có đơn hàng tìm thấy</h2>
      <p v-if="statusFilter !== 'all'" class="text-gray-500 mb-4">Hãy thử thay đổi bộ lọc của bạn hoặc kiểm tra lại sau.
      </p>
      <p v-else class="text-gray-500 mb-4">You haven't placed any orders yet.</p>
      <router-link to="/menu"
        class="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2 rounded-md transition cursor-pointer">
        Shop Now
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in paginatedOrders" :key="order.id"
        class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
          <div class="flex items-center">
            <span class="font-bold text-gray-800 flex items-center gap-1"><i class='bx bx-package text-3xl'></i> Đơn
              hàng #{{ order.id }}</span>
            <span class="text-gray-500 text-sm ml-2">{{ formatDate(order.created_at) }}</span>
          </div>
          <div :class="{
            'px-3 py-1 rounded-full text-sm font-medium': true,
            'bg-yellow-100 text-yellow-800': order.status.toLowerCase() === 'pending',
            'bg-blue-100 text-blue-800': order.status.toLowerCase() === 'processing',
            'bg-indigo-100 text-indigo-800': order.status.toLowerCase() === 'shipped',
            'bg-green-100 text-green-800': order.status.toLowerCase() === 'delivered',
            'bg-green-100 text-green-800': order.status.toLowerCase() === 'confirmed',
            'bg-red-100 text-red-800': order.status.toLowerCase() === 'cancelled',
          }">
            {{ getStatusLabel(order.status) }}
          </div>
        </div>

        <div class="p-4 border-b border-gray-200">
          <div class="text-sm">
            <span class="font-medium text-gray-700">Phương thức thanh toán:</span>
            <span class="text-gray-600 ml-1">{{ formatPaymentMethod(order.payment_method) }}</span>
          </div>
        </div>

        <div class="divide-y divide-gray-200">
          <div v-for="(item, index) in order.OrderDetails" :key="index" class="p-4 flex">
            <div class="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img :src="item.MenuItem.img" :alt="item.MenuItem.name" class="w-full h-full object-cover">
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-lg font-medium text-gray-900">{{ item.MenuItem.name }}</h3>
              <div class="flex justify-between items-center mt-1">
                <div class="text-sm text-gray-500">
                  <span>SL: {{ item.quantity }}</span>
                  <span class="ml-4">{{ formatPrice(item.price) }} VNĐ</span>
                </div>
                <button @click="openReviewForm(item)"
                  class="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition cursor-pointer">
                  Đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 bg-gray-50">
          <div class="text-sm mb-4">
            <div class="flex justify-between py-1">
              <span class="text-gray-600">Tổng tiền:</span>
              <span class="text-gray-800">{{ formatPrice(calculateSubtotal(order)) }} VNĐ</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-gray-600">Tiền ship:</span>
              <span class="text-gray-800">30.000 VNĐ</span>
            </div>
            <div class="flex justify-between py-1 font-bold">
              <span>Tổng đơn thanh toán:</span>
              <span>{{ formatPrice(order.total_price) }} VNĐ</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end gap-3">
            <button @click="viewOrderDetails(order)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer">
              Xem chi tiết
            </button>
            <button v-if="canCancelOrder(order)" @click="cancelOrder(order.id)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer">
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center space-x-4 mt-6">
        <button :disabled="currentPage === 1" @click="currentPage--" :class="{
          'px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition': true,
          'bg-rose-500 text-white hover:bg-rose-600': currentPage !== 1,
          'bg-gray-200 text-gray-500 cursor-not-allowed': currentPage === 1
        }">
          Trước
        </button>
        <span class="text-gray-700">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++" :class="{
          'px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition': true,
          'bg-rose-500 text-white hover:bg-rose-600': currentPage !== totalPages,
          'bg-gray-200 text-gray-500 cursor-not-allowed': currentPage === totalPages
        }">
          Sau
        </button>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showOrderModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeOrderModal">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-200 bg-opacity-70 transition-opacity z-40"></div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full z-50"
          @click.stop>
          <div class="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-800">Chi tiết đơn hàng #{{ selectedOrder?.id }}</h2>
            <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="closeOrderModal">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <div class="p-6 overflow-y-auto max-h-[70vh]">
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Thông tin đơn hàng</h3>
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700">Ngày đặt hàng:</span>
                  <span class="text-gray-600 ml-1">{{ formatDate(selectedOrder?.created_at) }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Trạng thái:</span>
                  <span :class="{
                    'ml-1 px-2 py-0.5 rounded-full text-xs font-medium': true,
                    'bg-yellow-100 text-yellow-800': selectedOrder?.status.toLowerCase() === 'pending',
                    'bg-blue-100 text-blue-800': selectedOrder?.status.toLowerCase() === 'processing',
                    'bg-indigo-100 text-indigo-800': selectedOrder?.status.toLowerCase() === 'shipped',
                    'bg-green-100 text-green-800': selectedOrder?.status.toLowerCase() === 'delivered',
                    'bg-red-100 text-red-800': selectedOrder?.status.toLowerCase() === 'cancelled'
                  }">
                    {{ translateStatus(selectedOrder?.status) }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Phương thức thanh toán:</span>
                  <span class="text-gray-600 ml-1">{{ formatPaymentMethod(selectedOrder?.payment_method) }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Địa chỉ giao hàng:</span>
                  <span class="text-gray-600 ml-1">{{ selectedOrder?.shipping_address || 'Chưa xác định' }}</span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Các món đã đặt:</h3>
              <div class="space-y-4">
                <div v-for="(item, index) in selectedOrder?.OrderDetails" :key="index"
                  class="flex border border-gray-200 rounded-lg overflow-hidden">
                  <div class="w-24 h-24 flex-shrink-0">
                    <img :src="item.MenuItem.img" :alt="item.MenuItem.name" class="w-full h-full object-cover">
                  </div>
                  <div class="flex-1 p-4">
                    <h4 class="font-medium text-gray-900">{{ item.MenuItem.name }}</h4>
                    <p class="text-sm text-gray-500 mt-1">{{ item.MenuItem.description || 'No description' }}
                    </p>
                    <div class="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span>{{ formatPrice(item.price) }} VNĐ</span>
                      <span>Số lượng: {{ item.quantity }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Tóm tắt đơn hàng</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between py-1 text-sm">
                  <span class="text-gray-600">Tổng tiền:</span>
                  <span class="text-gray-800">{{ formatPrice(calculateSubtotal(selectedOrder)) }} VNĐ</span>
                </div>
                <div class="flex justify-between py-1 text-sm">
                  <span class="text-gray-600">Tiền ship:</span>
                  <span class="text-gray-800">30.000 VNĐ</span>
                </div>
                <div class="flex justify-between py-1 font-bold">
                  <span>Tổng tiền thanh toán:</span>
                  <span>{{ formatPrice(selectedOrder?.total_price) }} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 flex flex-col-reverse sm:flex-row gap-3 justify-end">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition duration-200 cursor-pointer"
              @click="closeOrderModal">
              Đóng
            </button>
            <button v-if="canCancelOrder(selectedOrder)"
              class="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition duration-200 cursor-pointer"
              @click="cancelOrderFromModal(selectedOrder.id)">
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="showReviewForm" class="fixed inset-0 z-50 overflow-y-auto" @click="closeReviewForm">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-200 bg-opacity-70 transition-opacity z-40"></div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full z-50"
          @click.stop>
          <div class="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-800">Đánh giá món ăn</h2>
            <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="closeReviewForm">
              <span class="text-2xl">&times;</span>
            </button>
          </div>
          <div class="p-6">
            <div v-if="reviewingOrderItem">
              <div class="mb-2 font-semibold text-gray-700">
                Sản phẩm: {{ reviewingOrderItem.MenuItem?.name || 'Không xác định' }}
              </div>
              <div class="mb-4">
                <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">Số sao:</label>
                <select id="rating" v-model="reviewData.rating"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 cursor-pointer">
                  <option value="1">1 Sao</option>
                  <option value="2">2 Sao</option>
                  <option value="3">3 Sao</option>
                  <option value="4">4 Sao</option>
                  <option value="5" selected>5 Sao</option>
                </select>
              </div>
              <div class="mb-6">
                <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">Bình luận (nhận xét):</label>
                <textarea id="comment" v-model="reviewData.comment" rows="5"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Nhập nhận xét của bạn về sản phẩm..."></textarea>
              </div>
              <div class="flex justify-end gap-3">
                <button
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition duration-200 cursor-pointer"
                  @click="closeReviewForm">
                  Hủy
                </button>
                <button
                  class="px-4 py-2 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition duration-200 cursor-pointer"
                  @click="submitReview">
                  Gửi đánh giá
                </button>
              </div>
            </div>
            <div v-else class="text-red-500 font-semibold">Không có dữ liệu sản phẩm để đánh giá!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { orderAPI, paymentAPI } from '../../services/apis';
import { useRoute } from 'vue-router';
import axios from 'axios';

// State variables
const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const statusFilter = ref('all');
const sortBy = ref('date-desc');
const currentPage = ref(1);
const ordersPerPage = 3;

// Modal state
const showOrderModal = ref(false);
const selectedOrder = ref(null);

// Review form state
const showReviewForm = ref(false);
const reviewingOrderItem = ref(null);
const reviewData = ref({
  rating: 5,
  comment: ''
});

// Get user information from localStorage
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  window.location.href = '/login';
}

// Get route information
const route = useRoute();

// Fetch orders from API
const fetchOrders = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await orderAPI.getOrderByUserID(user.id);

    if (response && Array.isArray(response)) {
      orders.value = response;
    } else if (response && response.data && Array.isArray(response.data)) {
      orders.value = response.data;
    } else {
      orders.value = [];
      // console.warn('No orders found or invalid response format');
    }

    for (let order of orders.value) {
      try {
        // Fetch order details
        const detailsResponse = await orderAPI.getOrderDetails(order.id);
        if (detailsResponse && detailsResponse.data) {
          order.OrderDetails = detailsResponse.data;
        }

        // Fetch payment info
        try {
          const paymentResponse = await paymentAPI.getPaymentByOrderId(order.id);
          if (paymentResponse && paymentResponse.data) {
            order.payment_method = paymentResponse.data.method || 'Không xác định';
            order.payment_status = paymentResponse.data.status || 'pending';
          } else {
            order.payment_method = 'Không xác định';
            order.payment_status = 'pending';
          }
        } catch (paymentError) {
          console.error('Error fetching payment info for order', order.id, paymentError);
          order.payment_method = 'Không xác định';
          order.payment_status = 'pending';
        }

        // Fetch full order details
        const orderResponse = await orderAPI.getOrderById(order.id);
        if (orderResponse && orderResponse.data) {
          order.shipping_address = orderResponse.data.shipping_address;
          order.full_name = orderResponse.data.full_name;
          order.phone_number = orderResponse.data.phone_number;
          order.email = orderResponse.data.email;
        }
      } catch (err) {
        console.error('Error fetching order details for order', order.id, err);
      }
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
    error.value = 'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.';
    orders.value = [];
  } finally {
    loading.value = false;
  }
};
// Filter and sort orders
const filteredOrders = computed(() => {
  let result = [...orders.value];

  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(order => order.status.toLowerCase() === statusFilter.value);
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'date-desc':
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'date-asc':
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'total-desc':
      result.sort((a, b) => b.total_price - a.total_price);
      break;
    case 'total-asc':
      result.sort((a, b) => a.total_price - b.total_price);
      break;
  }

  return result;
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / ordersPerPage);
});

const paginatedOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  return filteredOrders.value.slice(startIndex, endIndex);
});

// Reset to page 1 when filters change
const resetPagination = () => {
  currentPage.value = 1;
};

// Watch for filter changes
watch([statusFilter, sortBy], () => {
  resetPagination();
});

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return '0.00';
  return numericPrice.toLocaleString('vi-VN');
};

const formatPaymentMethod = (method) => {
  if (!method) return 'Không xác định';
  switch (method.toLowerCase()) {
    case 'vnpay':
      return 'Thanh toán vnpay';
    case 'cashondelivery':
      return 'Thanh toán tiền mặt';
    default:
      return capitalizeFirstLetter(method);
  }
};

const calculateSubtotal = (order) => {
  if (!order || !order.OrderDetails) return 0;
  return order.OrderDetails.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
};

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const translateStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Đang chờ';
    case 'confirmed':
      return 'Đã xác nhận';
    case 'processing':
      return 'Đang xử lý';
    case 'delivered':
      return 'Đã giao hàng';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return 'Không xác định';
  }
}

const getStatusLabel = (status) => {
  const map = {
    pending: 'Chờ xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đã gửi hàng',
    delivered: 'Đã giao hàng',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
  };
  return map[status.toLowerCase()] || status;
};

const canCancelOrder = (order) => {
  if (!order) return false;
  return ['pending', 'processing'].includes(order.status.toLowerCase());
};

// Modal functions
const viewOrderDetails = async (order) => {
  selectedOrder.value = order;
  console.log('selectedOrder.value', selectedOrder.value);

  // Fetch payment info if not already loaded
  if (!order.payment_method) {
    try {
      const paymentResponse = await paymentAPI.getPaymentByOrderId(order.id);
      if (paymentResponse && paymentResponse.data) {
        selectedOrder.value.payment_method = paymentResponse.data.method;
        selectedOrder.value.payment_status = paymentResponse.data.status;
      }
    } catch (err) {
      console.error('Error fetching payment info:', err);
    }
  }

  // Fetch full order details if needed
  if (!order.shipping_address) {
    try {
      const orderResponse = await orderAPI.getOrderById(order.id);
      if (orderResponse && orderResponse.data) {
        selectedOrder.value.shipping_address = orderResponse.data.User.address;
        selectedOrder.value.full_name = orderResponse.data.User.full_name;
        selectedOrder.value.phone_number = orderResponse.data.User.phone_number;
        selectedOrder.value.email = orderResponse.data.User.email;
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  }

  showOrderModal.value = true;
};

const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedOrder.value = null;
};

const cancelOrderFromModal = async (orderId) => {
  if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
    try {
      await orderAPI.cancelOrder(orderId);
      // Refresh orders after cancellation
      fetchOrders();
      // Close modal
      closeOrderModal();
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
    }
  }
};

const cancelOrder = async (orderId) => {
  if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
    try {
      await orderAPI.cancelOrder(orderId);
      // Refresh orders after cancellation
      fetchOrders();
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
    }
  }
};

// Review form functions
const openReviewForm = (orderItem) => {
  reviewingOrderItem.value = orderItem;
  showReviewForm.value = true;
  // Reset review data when opening the form
  reviewData.value.rating = 5;
  reviewData.value.comment = '';
};

const closeReviewForm = () => {
  showReviewForm.value = false;
  reviewingOrderItem.value = null;
};

const submitReview = async () => {
  if (!reviewingOrderItem.value) {
    return;
  }
  try {
    const response = await axios.post('http://localhost:5000/api/review/create', {
      menuItemId: reviewingOrderItem.value.menu_item_Id,
      orderId: reviewingOrderItem.value.order_Id,
      rating: reviewData.value.rating,
      comment: reviewData.value.comment,
      userId: user.id,
    });
    alert('Đánh giá thành công');
    closeReviewForm();
    // Refresh orders to potentially reflect review status
    fetchOrders();
  } catch (error) {
    console.error('Lỗi khi gửi đánh giá:', error);
    alert('Đã có lỗi xảy ra khi gửi đánh giá.');
  }
};

// Run on component mount
onMounted(() => {
  fetchOrders();
  if (route.query.vnp_TransactionStatus === '00') {
    alert('Thanh toán thành công!');
  } else if (route.query.vnp_TransactionStatus) {
    alert('Thanh toán không thành công hoặc bị hủy.');
    console.log('Payment Return Query:', route.query);
  }
});
</script>