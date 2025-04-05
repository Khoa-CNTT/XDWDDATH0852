<template>
  <div>
    <footer class="footer">
      <div class="logo-section">
        <div class="logo">
          <img style="width: 100%" src="../../img/1.png" />
        </div>
        <p style="color: white" class="description">
          In the new era of technology we look to the future with certainty and
          pride for our company and.
        </p>
        <div class="social-icons">
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
      <div class="links">
        <ul>
          <li style="color: red;"><b>Pages</b></li>
          <li ><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Delivery</a></li>
        </ul>
        <ul>
          <li style="color: red;"><b>Utility Pages</b></li>
          <li><a href="#">Start Here</a></li>
          <li><a href="#">Styleguide</a></li>
          <li><a href="#">Password Protected</a></li>
          <li><a href="#">404 Not Found</a></li>
          <li><a href="#">Licenses</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">View More</a></li>
        </ul>
      </div>
      <div class="instagram">
        <h3 style="color: red;">Follow Us On Instagram</h3>
        <div class="images">
          <img src="../../img/pages/1.jpg" alt="Food 1" />
          <img src="../../img/pages/2.jpg" alt="Food 2" />
          <img src="../../img/pages/3.jpg" alt="Food 3" />
          <img src="../../img/pages/4.jpg" alt="Food 4" />
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {};
</script>
<style>
.footer {
  background-color: #3b3b3b;
  padding: 80px 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.footer .logo-section {
  max-width: 250px;
}

.footer .logo {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.footer .logo img {
  width: 40px;
  margin-right: 10px;
}

.footer .description {
  font-size: 14px;
  line-height: 1.5;
  margin-top: 10px;
}

.footer .social-icons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.footer .social-icons a {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b11313;
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
}

.footer .links {
  display: flex;
  gap: 50px;
}

.footer .links ul {
  list-style: none;
  padding: 0 20px;
}

.footer .links ul li {
  margin-bottom: 8px;
}

.footer .links ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.footer .instagram {
  display: flex;
  flex-direction: column;
}

.footer .instagram .images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.footer .instagram .images img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
