<template>

  <div>
    <div v-if="isAdmin">
      <Dashboard />
    </div>
    <div v-else>
      <PromotionBanner />
      <HeroSection />
      <FastFood />
      <AboutHome />
      <CustomerReviews />
      <BlogHome />
      <SocialMediaFeed />
    </div>
  </div>
</template>

<script setup>
import HeroSection from '../../components/HeroSection.vue'
import CustomerReviews from '../../components/CustomerReviews.vue'
import BlogHome from '../../components/BlogHome.vue'
import AboutHome from '../../components/AboutHome.vue'
import FastFood from '../../components/FastFood.vue'
import SocialMediaFeed from '../../components/SocialMediaFeed.vue'
import PromotionBanner from '../../components/PromotionBanner.vue'
import Dashboard from '../../views/admin/Dashboard.vue'

import { computed } from 'vue';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const isAdmin = computed(() => user.role_name === 'admin');
</script>