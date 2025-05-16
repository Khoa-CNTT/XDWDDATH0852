<template>
  <div class="bg-gradient-to-r from-rose-500 to-rose-400 text-white py-4 px-6 text-center shadow-lg rounded-sm mt-2">
    <div class="flex items-center justify-center gap-3">
      <i class="bx bxs-discount text-2xl animate-pulse"></i>
      <p class="text-base font-semibold">
        Ưu đãi đặc biệt: Giảm 20% cho đơn đầu tiên! Hết hạn sau
        <span class="bg-white text-rose-700 px-2 py-1 rounded-md mx-1 font-bold">
          {{ formattedCountdown }}
        </span>
      </p>
      <button
        @click="goToMenu"
        class="bg-white text-rose-700 px-4 py-2 rounded-md font-medium hover:bg-rose-100 transition animate-pulse-slow"
      >
        Mua ngay
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(300); // 300 giây = 5 phút

// Format thời gian thành MM:SS
const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const goToMenu = () => {
  router.push('/menu');
};

let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      countdown.value = 300; // Reset khi hết giờ
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>