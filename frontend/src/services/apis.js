import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryAPI = {
  getAll: () => api.get('/category/all'),
  getById: (id) => api.get(`/category/get/${id}`),
};

export const menuItemAPI = {
  getAll: () => api.get('/menu-items/all'),
  getById: (id) => api.get(`/menu-items/${id}`),
};

export const userAPI = {
  getAllUsers: () => api.get('/users/all'),
  getProfile: (id) => api.get(`/users/get/${id}`),
  updateProfile: (id, data) => api.put(`/users/update/${id}`, data),
  changePassword: (id, data) => api.put(`/users/change-password/${id}`, data),
  deleteAccount: (id) => api.delete(`/users/delete/${id}`),
  forgotPassword: (data) => api.post(`/users/forgot-password`, data),
  resetPassword: (data) => api.post(`/users/reset-password`, data),
};


export const voucherAPI = {
  checkVoucher: (data) => api.post('/voucher/check', data),
};

export const cartAPI = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  addToCart: (userId, data) => api.post(`/cart/${userId}/add`, data),
  updateCartItem: (userId, itemId, data) => api.put(`/cart/${userId}/items/${itemId}`, data),
  removeFromCart: (userId, itemId) => api.delete(`/cart/${userId}/items/${itemId}`),
  clearCart: (userId) => api.delete(`/cart/${userId}/clear`),
  getCartCount: (userId) => api.get(`/cart/${userId}/count`),
};

export const orderAPI = {
  getOrderAll: () => api.get('/orders/all'),
  getOrders: (userId) => api.get(`/orders/user/${userId}`),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
  createOrder: (data) => api.post('/orders/create', data),
  updateOrder: (orderId, data) => api.put(`/orders/update/${orderId}`, data),
  cancelOrder: (orderId) => api.put(`/orders/cancel/${orderId}`),
  getOrderDetails: (orderId) => api.get(`/order-detail/order/${orderId}`),
  getOrderByUserID: (userId) => api.get(`/orders/user/${userId}`),
  createOrderDetails: (data) => api.post('/order-detail/create', data),
};

export const paymentAPI = {
  createPayment: (data) => api.post('/payment/create', data),
  getPaymentByOrderId: (orderId) => api.get(`/payment/order/${orderId}`),
  updatePayment: (id, data) => api.put(`/payment/update/${id}`, data),
  deletePayment: (id) => api.delete(`/payment/delete/${id}`),
  //thanh toan vn pay
  initiateVNPAY: (paymentData) => api.post('/payment/vnpay_initiate', paymentData),
};

export const reviewAPI = {
  getReviewByProductId: (productId) => api.get(`/review/getByProductID/${productId}`),
};

export default api; 