<template>
  <div>
    <TopFood></TopFood>
    <section class="hero" v-if="$route.path === '/'">
      <div class="hero-content">
        <h1>Best food for your taste</h1>
        <p>
          Discover delectable cuisine and unforgettable moments <br />
          in our welcoming, culinary haven.
        </p>
        <div class="hero-buttons">
          <a href="#" class="btn primary">Book A Table</a>
          <router-link to="/menu" class="btn secondary"
            >Explore Menu</router-link
          >
        </div>
      </div>
    </section>

    <div class="list-menu" v-if="$route.path === '/'">
      <h1 class="text-center p-5">Browse Our Menu</h1>
      <div class="list-a">
        <template v-for="(value, index) in menus" :key="index">
          <div class="menu-forcus text-center p-5">
            <i :class="value.icon"></i>
            <h1 class="mt-3">
              <b>{{ value.title }}</b>
            </h1>
            <p>
              {{ value.description }}
            </p>
            <router-link to="/menu"> <button>Explore Menu</button></router-link>
          </div>
        </template>
      </div>
    </div>

    <div class="about-section" v-if="$route.path === '/'">
      <div class="about-left">
        <div class="image-wrapper">
          <img src="../../img/pages/11.jpg" class="food-image" />
          <div class="contact-card">
            <h3>Come and visit us</h3>
            <p><i class="fa-solid fa-phone"></i> 0336880153</p>
            <p>
              <i class="fa-solid fa-envelope"></i> tritruongvan189@gmail.com
            </p>
            <p><i class="fa-solid fa-location-dot"></i> 123 abc</p>
          </div>
        </div>
      </div>

      <div class="about-right">
        <h1>We provide healthy <br />food for your family.</h1>
        <p class="description">
          Our story began with a vision to create a unique dining experience
          that merges fine dining, exceptional service, and a vibrant ambiance.
          Rooted in city’s rich culinary culture, we aim to honor our local
          roots while infusing a global palate.
        </p>
        <p class="highlight">
          At place, we believe that dining is not just about food, but also
          about the overall experience. Our staff, renowned for their warmth and
          dedication, strives to make every visit an unforgettable event.
        </p>
        <button class="more-btn">More About Us</button>
      </div>
    </div>

    <div class="service" v-if="$route.path === '/'">
      <h1 style="font-size: 50px">
        We also offer unique <br />
        services for your events
      </h1>

      <div class="sv">
        <template v-for="(value, index) in sevice" :key="index">
          <div class="image-service">
            <img
              v-bind:src="value.img"
              style="
                height: 350px;
                width: 100%;
                object-fit: cover;
                border-radius: 10px;
              "
              alt=""
            />
            <h1 style="padding: 10px 0">{{ value.title }}</h1>
            <p>
              In the new era of technology we look in the future with certainty
              for life.
            </p>
          </div>
        </template>
      </div>
    </div>

 


    <div class="delivery" v-if="$route.path === '/'">
      <div class="delivery-left">
        <div class="img-a">
          <img src="../../img/home/chef.jpg" alt="" />
        </div>
        <div class="img-b">
          <img src="../../img/home/5.jpg" alt="" />
          <img style="margin-top: 20px" src="../../img/home/6.jpg" alt="" />
        </div>
      </div>
      <div class="delivery-right">
        <div class="delivery-abc">
          <label
            >Fastest Food <br />
            Delivery in City</label
          >
          <p>
            Our visual designer lets you quickly and of drag a down <br />
            your way to customapps for both keep desktop.
          </p>
          <div class="delivery-icon">
            <i class="fa-solid fa-clock"></i> Delivery within 30 minutes
            <br />
            <i style="margin: 20px 0" class="fa-solid fa-square-envelope"></i>
            Best Offer & Prices<br />
            <i class="fa-solid fa-cart-shopping"></i> Online Services Available
          </div>
        </div>
      </div>
    </div>

    <section class="testimonials" v-if="$route.path === '/'">
      <h2>What Our Customers Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <h3>"The best fast-food"</h3>
          <p>
            Last night, we dined at place and were simply blown away... greeted
            with warm smiles.
          </p>
          <div class="user-info">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.snm8cjtIa-LCpqku7uqGcAHaIi&pid=Api&P=0&h=220/"
              alt="Sophie Robson"
            />
            <div>
              <strong>Sophie Robson</strong><br />
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <h3>"simply quality"</h3>
          <p>
            Place exceeded my expectations on all fronts. The ambiance was cozy
            and relaxed...
          </p>
          <div class="user-info">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.jLkaHCHjYNFeEANIi53DbwHaGd&pid=Api&P=0&h=220"
              alt="Matt Canson"
            />
            <div>
              <strong>Matt Canson</strong><br />
              <span>San Diego, CA</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <h3>"One of a kind fast-food"</h3>
          <p>
            The culinary experience at place is first to none. The atmosphere is
            vibrant...
          </p>
          <div class="user-info">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.t-_xa7mZbxw5kW-Pj5K5xwHaGo&pid=Api&P=0&h=220"
              alt="Andy Smith"
            />
            <div>
              <strong>Andy Smith</strong><br />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="blog-section" v-if="$route.path === '/'">
      <div class="blog-header">
        <h2>Our Blog & Articles</h2>
       <router-link to="/pages"> <button class="read-all-btn">Read All Articles</button></router-link>
      </div>

      <div class="blog-grid">
        <!-- Bài viết lớn -->
        <div class="blog-featured">
          <img src="../../img/home/7.jpg" alt="Perfect Burger" />
          <div class="blog-content">
            <p class="date">January 3, 2023</p>
            <h3>
              The secret tips & tricks to prepare a perfect burger & pizza for
              our customers
            </h3>
            <p class="excerpt">
              Lorem ipsum dolor sit amet consectetur adipiscing elitltiim semper
              adipiscing massa gravida...
            </p>
          </div>
        </div>

        <!-- Các bài nhỏ bên phải -->
        <div class="blog-card">
          <img src="../../img/pages/2.jpg" alt="Fries" />
          <div class="card-content">
            <p class="date">January 3, 2023</p>
            <h4>How to prepare the perfect french fries in an air fryer</h4>
          </div>
        </div>

        <div class="blog-card">
          <img src="../../img/pages/1.jpg" alt="Chicken" />
          <div class="card-content">
            <p class="date">January 3, 2023</p>
            <h4>How to prepare delicious chicken tenders</h4>
          </div>
        </div>

        <div class="blog-card">
          <img src="../../img/pages/13.jpg" alt="Cheesecake" />
          <div class="card-content">
            <p class="date">January 3, 2023</p>
            <h4>7 delicious cheesecake recipes you can prepare</h4>
          </div>
        </div>

        <div class="blog-card">
          <img src="../../img/pages/14.jpg" alt="Pizza" />
          <div class="card-content">
            <p class="date">January 3, 2023</p>
            <h4>5 great pizza restaurants you should visit this city</h4>
          </div>
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
  data() {
    return {
      sevice: [
        { title: "Caterings", img: "http://localhost:5173/src/img/home/1.jpg" },
        { title: "Birthdays", img: "http://localhost:5173/src/img/home/2.jpg" },
        { title: "Weddings", img: "http://localhost:5173/src/img/home/3.jpg" },
        { title: "Events", img: "http://localhost:5173/src/img/home/4.jpg" },
      ],
      menus: [
        {
          title: "Breakfast",
          icon: "fa-solid fa-mug-saucer", // Có thể thay bằng đường dẫn hình ảnh
          description:
            "In the new era of technology we look in the future with certainty and pride for our life.",
        },
        {
          title: "Main Dishes",
          icon: "bx bx-cake",
          description:
            "In the new era of technology we look in the future with certainty and pride for our life.",
        },
        {
          title: "Drinks",
          icon: "bx bx-drink",
          description:
            "In the new era of technology we look in the future with certainty and pride for our life.",
        },
        {
          title: "Desserts",
          icon: "fa-solid fa-cookie",
          description:
            "In the new era of technology we look in the future with certainty and pride for our life.",
        },
      ],
    };
  },
  name: "#app",
  components: {
    TopFood,
    BotFood,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@media (max-width: 1100px) {
  .list-a {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important ;
  }
}
@media (max-width: 1200px) {
  .sv {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important ;
  }
}
@media (max-width: 1400px) {
  .delivery {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important ;
  }
  .delivery-left {
    margin-right: 80px;
  }
  .delivery-right {
    margin: auto;
  }
}
@media (max-width: 700px) {
  .sv {
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important ;
  }
}

.page-content {
  padding-top: 60px; /* hoặc đúng chiều cao nav bạn dùng */
}
.hero {
  background: url("../../img/home/2.png") no-repeat center top;
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
.list-a {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 80%;
  margin: auto;
  gap: 20px;
}
.menu-forcus {
  border: 1px solid rgb(211, 207, 207);
  border-radius: 10px;
}
.menu-forcus i {
  padding: 25px;
  background-color: rgb(198, 230, 230);
  border-radius: 50%;
  font-size: 30px;
}
.menu-forcus h1 {
  font-size: 23px;
}
.menu-forcus button {
  border: none;
  padding: 20px;
  color: red;
  font-weight: 600;
  transition: all 0.3s linear;
  background-color: white;
}
.menu-forcus button:hover {
  background-color: blue;
  border-radius: 10px;
  color: white;
}

.about-section {
  display: flex;
  justify-content: center;
  gap: 160px;
  padding: 50px;
  flex-wrap: wrap;
  background-color: #fafafa;
  font-family: "Fira Sans", sans-serif;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 450px;
}

.food-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  display: block;
}

.contact-card {
  position: absolute;
  bottom: -30px;
  left: 250px;
  background-color: #3d3d3d;
  color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 270px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.contact-card h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.contact-card p {
  margin: 10px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-card i {
  font-size: 14px;
  color: white;
}

.about-right {
  flex: 1;
  min-width: 320px;
  max-width: 500px;
}

.about-right h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2e2e2e;
  line-height: 1.3;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.highlight {
  font-size: 15px;
  color: #6b6b6b;
  background-color: #f4f4f4;
  padding: 15px;
  border-left: 4px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.more-btn {
  padding: 10px 20px;
  border: 1px solid black;
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.more-btn:hover {
  background-color: black;
  color: white;
}
.service {
  padding: 50px 190px;
}
.sv {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 60px;
}
.testimonials {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
  font-family: sans-serif;
}

.testimonials h2 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #222;
}

.testimonial-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.testimonial-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: left;
}

.testimonial-card h3 {
  font-size: 18px;
  color: #b71c1c;
  margin-bottom: 10px;
}

.testimonial-card p {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info strong {
  font-size: 14px;
  color: #222;
}

.user-info span {
  font-size: 12px;
  color: #888;
}

.delivery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;

  width: 80%;
  align-items: center; /* Căn giữa theo chiều dọc */
  margin: auto;
}
.delivery-left {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 20px;
  margin-left: 50px;
  gap: 20px;
}
.delivery-left .img-a img {
  border-radius: 10px;
}
.delivery-left .img-b img {
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.delivery-right {
  display: flex;
  align-items: center;
}
.delivery-abc {
  width: 100%;
}
.delivery-abc label {
  font-size: 50px;
  font-weight: bold;
}
.delivery-abc p {
  margin: 30px 0;
  font-size: 20px;
}
.delivery-abc i {
  color: white;
  padding: 10px;
  background-color: red;
  border-radius: 50%;
}
.blog-section {
  padding: 50px;
  max-width: 1200px;
  margin: auto;
  font-family: "Arial", sans-serif;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.blog-header h2 {
  font-size: 36px;
}

.read-all-btn {
  background-color: #a3333d;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.blog-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  grid-auto-rows: auto;
}

.blog-featured {
  grid-row: span 2;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.blog-featured img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.blog-content {
  padding: 20px;
}

.blog-content .date {
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;
}

.blog-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.blog-content .excerpt {
  font-size: 14px;
  color: #555;
}

.blog-card {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.blog-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.card-content .date {
  color: gray;
  font-size: 13px;
  margin-bottom: 5px;
}

.card-content h4 {
  font-size: 16px;
  font-weight: normal;
  color: #333;
}

/* Responsive */
@media (max-width: 900px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-featured {
    grid-row: auto;
  }
}
.delivery-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}

.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.img-large img {
  width: 100%;
  height: auto;
  border-radius: 16px;
}

.img-small {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.img-small img {
  width: 100%;
  height: auto;
  border-radius: 16px;
}

.content h2 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.2;
}

.content p {
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
}

.content ul {
  list-style: none;
  padding: 0;
}

.content li {
  margin-bottom: 12px;
  font-size: 16px;
}

.content i {
  color: white;
  background-color: #8b0000;
  padding: 8px;
  border-radius: 50%;
  margin-right: 10px;
}

</style>
