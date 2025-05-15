import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/ui/Home.vue";
import About from "../views/ui/About.vue";
import Contact from "../views/ui/Contact.vue";
import Login from "../views/ui/Login.vue";
import Register from "../views/ui/Register.vue";
import Menu from "../views/ui/Menu.vue";
import Profile from "../views/ui/Profile.vue";
import Cart from "../views/ui/Cart.vue";
import ProductDetail from "../views/ui/productDetail.vue";
import Order from "../views/ui/Order.vue";
import Blog from "../views/ui/Blog.vue";

import AdminDashboard from "../views/admin/Dashboard.vue";
import AdminProducts from "../views/admin/Products.vue";
import AdminCategories from "../views/admin/Categories.vue";
import AdminOrders from "../views/admin/Orders.vue";
import AdminUsers from "../views/admin/Users.vue";
import AdminVouchers from "../views/admin/Vouchers.vue";
import Checkout from "../views/ui/Checkout.vue";
import ForgotPassword from "../views/ui/ForgotPassword.vue";
import ResetPassword from "../views/ui/ResetPassword.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/blog",
        component: Blog,
    },
    {
        path: "/contact",
        component: Contact,
    },
    {
        path: "/menu",
        component: Menu,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/forgot-password",
        component: ForgotPassword,
    },
    {
        path: "/reset-password/:token",
        component: ResetPassword,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: '/product/:id',
        component: ProductDetail,
        props: true
    },
    {
        path: '/cart',
        component: Cart,
        meta: { requiresAuth: true }
    },
    {
        path: '/orders',
        component: Order,
        meta: { requiresAuth: true }
    },
    {
        path: '/checkout',
        component: Checkout,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/dashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/products',
        component: AdminProducts,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/adminCategories',
        component: AdminCategories,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/orders',
        component: AdminOrders,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/users',
        component: AdminUsers,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/vouchers',
        component: AdminVouchers,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0, left: 0, behavior: 'smooth' };
    }
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
        next('/login')
    } else if (to.matched.some(record => record.meta.requiresAdmin) && (!user || user.role_name !== 'admin')) {
        next('/')
    } else {
        next()
    }
});

export default router;