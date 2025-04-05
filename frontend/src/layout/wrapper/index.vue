<template>
  <div>
    <TopFood></TopFood>
    <section class="hero" v-if="$route.path === '/'" >
      <div class="hero-content">
        <h1>Best food for your taste</h1>
        <p>
          Discover delectable cuisine and unforgettable moments <br>
        in our welcoming, culinary haven.
        </p>
        <div class="hero-buttons">
          <a href="#" class="btn primary">Book A Table</a>
          <router-link to="/menu" class="btn secondary">Explore Menu</router-link>
        </div>
      </div>
    </section>
    <div class="page-content">
      <router-view />
    </div>
    <BotFood></BotFood>
  </div>
</template>
<script>
import BotFood from "../components/BotFood.vue";
import TopFood from "../components/TopFood.vue";
export default {
  name: "#app",
  components: {
    TopFood,
    BotFood,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.page-content {
  padding-top: 60px; /* hoặc đúng chiều cao nav bạn dùng */
}
.hero {
    background: url('../../img/home/2.png') no-repeat center top;
    background-size: cover;
    width: 100%;
    min-height: 800px; /* Đảm bảo phần hero chiếm toàn bộ chiều cao màn hình */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
    position: relative; /* Giữ nội dung hiển thị đúng */
}
.hero-content {
    max-width: 600px;
    margin: auto;
}

.hero h1 {
    font-size: 48px;
    font-weight: bold;
    color: #f2e6e6;
}

.hero p {
    font-size: 18px;
    color: #e53333;
    margin-top: 10px;
}

.hero-buttons {
    margin-top: 20px;
   
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    font-size: 16px;
    border-radius: 5px;
    margin: 5px;
    border-radius: 10px;
}

.btn.primary {
    background-color: #b83232;
    color: #fff;
}

.btn.secondary {
    border: 2px solid #de2424;
    color: #b83232;
}
</style>
