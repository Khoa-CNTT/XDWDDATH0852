import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/menu',
        component: ()=>import('../components/Client/Menu/Menu.vue'),
        
    },
    {
        path : '/about',
        component: ()=>import('../components/Client/About/About.vue'),
        
    },
    {
        path : '/pages',
        component: ()=>import('../components/Client/Pages/Pages.vue'),
        
    },
    {
        path : '/contact',
        component: ()=>import('../components/Client/Contact/Contact.vue'),

    },
    {
        path : '/Register',
        component: ()=>import('../components/Client/TaiKhoan/Dangki.vue'),

    },
    {
        path : '/Login',
        component: ()=>import('../components/Client/TaiKhoan/Dangnhap.vue'),

    },
    {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import('../components/Client/Pages/ArticleDetail.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition; // Giữ nguyên vị trí cuộn nếu quay lại trang trước đó
      }
      return { top: 0, left: 0, behavior: 'smooth' }; // Cuộn lên đầu trang với hiệu ứng mượt
    }
  });

export default router