<template>
  <div id="app">
    <Navbar :user="user" @logout="handleLogout" />
    <div class="container mx-auto p-4">
      <router-view @login-success="handleLoginSuccess" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/layouts/Footer.vue'

const user = ref(null);
const router = useRouter();

const handleLoginSuccess = (userData) => {
  user.value = userData
  localStorage.setItem('user', JSON.stringify(userData))
  if (userData.role === 'admin') {
    router.push('/admin/dashboard')
  } else {
    router.push('/')
  }
};

const handleLogout = () => {
  user.value = null
  localStorage.removeItem('user')
  router.push('/login')
};

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
});
</script>
