<template>
    <div>
        <HeroSection />
        <NewItemsCarousel />
        <FastFood/>
        <AboutHome/>
        <CustomerReviews />
        <BlogHome/>
    </div>
</template>

<script setup>
import HeroSection from '../../components/HeroSection.vue'
import NewItemsCarousel from '../../components/NewItemsCarousel.vue'
import CustomerReviews from '../../components/CustomerReviews.vue'
import BlogHome from '../../components/BlogHome.vue'
import AboutHome from '../../components/AboutHome.vue'
import FastFood from '../../components/FastFood.vue'
</script>