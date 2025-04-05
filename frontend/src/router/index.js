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
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router