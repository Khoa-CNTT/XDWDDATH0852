<template>
  <div class="body">
    <div class="banner">
      <div class="bannera">
        <img src="../../../img/about/1.png" alt="" />
      </div>
      <div class="bannerb">
        <p>
          <b style="color: 2C2F24; font-size: 40px"
            >We serve delicious fast food for your cravings.</b
          >
          <br />
          <b style="font-size: 15px">
            Our journey started with a passion for quick, tasty, and satisfying
            meals. From juicy burgers to crispy fries and creamy milkshakes, our
            fast food menu is crafted to bring you comfort and flavor in every
            bite.</b
          >
          <br />
          At our place, we believe that fast food doesn’t mean compromising on
          quality. Our team works hard to deliver great taste with friendly
          service — making every quick bite a memorable one.
        </p>
      </div>
    </div>
    <div class="intro">
      <img src="../../../img/about/2.png" />
      <div class="intro-a">
        <div class="intro-b">
          <i class="fa-solid fa-book"></i>
          <div class="intro-c">
            <h1>Multi Cuisine</h1>
            <p>
              the new era of technology we look in the future with certainty
              life.
            </p>
          </div>
        </div>
        <div class="intro-b">
          <i class="fa-solid fa-user-pen"></i>
          <div class="intro-c">
            <h1>Easy To Order</h1>
            <p>
              In the new era of technology we look in the future with certainty
              life.
            </p>
          </div>
        </div>
        <div class="intro-b">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <div class="intro-c">
            <h1>Fast Delivery</h1>
            <p>
              In the new era of technology we look in the future with certainty
              life.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="infor-all">
      <div style="padding: 0 60px" class="infor">
        <div class="infor-a">
          <h1 style="font-size: 35px">
            A little information for our valuable guest
          </h1>
          <p style="font-size: 12px">
            At place, we believe that dining is not just about food, but also
            about the overall <br />
            experience. Our staff, renowned for their warmth and dedication,
            strives to make <br />
            every visit an unforgettable event.
          </p>
          <div class="info-grid">
            <div class="info-box">
              <h2>3</h2>
              <p>Locations</p>
            </div>
            <div class="info-box">
              <h2>1995</h2>
              <p>Founded</p>
            </div>
            <div class="info-box">
              <h2>65+</h2>
              <p>Staff Members</p>
            </div>
            <div class="info-box">
              <h2>100%</h2>
              <p>Satisfied Customers</p>
            </div>
          </div>
        </div>
        <div class="infor-b">
          <img
            src="https://i.pinimg.com/736x/3e/70/cf/3e70cf431bd29d4a4c7844db02a1639a.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    <section class="testimonials">
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
  </div>
</template>
<script>
export default {};
</script>
<style>
@media (max-width: 992px) {
  .banner {
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important;
  }
  .bannerb {
    display: flex;
    margin: auto;
  }
  .intro-a{
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .infor{
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important;
  }
  .infor-a{
    margin: auto;
    text-align: center;
  }
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

.banner {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.bannera {
  display: flex;
  justify-content: center;
}

.bannera img {
  width: 80%;
}

.bannerb {
  width: 85%;
  display: flex;
  align-items: center;
}

.intro {
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.intro img {
  width: 100%;
  height: 400px;
}

.intro-a {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.intro-b {
  display: flex;
  margin: auto;
  align-items: center;
}

.intro-b h1 {
  font-size: 18px;
}

.intro-b p {
  font-size: 10px;
}

.intro-b i {
  padding: 15px;
  font-size: 30px;
}

.infor {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 60px;
}

.infor-b {
  display: flex;
  justify-content: center;
}

.infor-b img {
  width: 60%;
  height: 90%;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 80px;
}

.info-box {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-box h2 {
  font-size: 36px;
  margin: 0;
  font-weight: 600;
  color: #333;
}

.info-box p {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}
</style>
