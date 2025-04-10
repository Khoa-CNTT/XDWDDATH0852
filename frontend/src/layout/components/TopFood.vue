<template>
  <div style=" font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
    <nav
      class="navbar navbar-expand-lg bg-white fixed-top"
      :class="{ hidden: !isHeaderVisible }"
    >
      <div class="container d-flex justify-content-around">
        <RouterLink to="/">
          <img
            style="margin-left: 10px"
            src="../../img/1.png"
            width="200px"
            alt="Logo"
          />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item px-2">
              <router-link
                to="/about"
                style="color: #2c2f24"
                class="nav-link active fs-5"
                >About</router-link
              >
            </li>
            <li class="nav-item px-2">
              <router-link
                to="/menu"
                style="color: #2c2f24"
                class="nav-link active fs-5"
                >Menu</router-link
              >
            </li>
            <li class="nav-item px-2">
              <router-link
                to="/pages"
                style="color: #2c2f24"
                class="nav-link active fs-5"
                >Pages</router-link
              >
            </li>
            <li class="nav-item px-2">
              <router-link
                to="/contact"
                style="color: #2c2f24"
                class="nav-link active fs-5"
                >Contact</router-link
              >
            </li>
          </ul>
          <div class="d-flex gap-4">
            <a href="#" class="text-dark fs-3">
              <i class="bx bx-search"></i>
            </a>
            <div style="cursor: pointer;" class="user-icon fs-3" v-on:click="anhienform()">
              <i class="bx bx-user"></i>
            </div>

            <!-- Khung đăng nhập -->
            <div v-if="formdn" class="login-popup">
              <div class="login-container">
                <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
                <p>Nhập email và mật khẩu của bạn:</p>
                <input type="email" placeholder="Email" v-model="form.email" />
                <p class="msg-error" v-if="error.email">{{ error.email }}</p>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  v-model="form.matkhau"
                />
                <p class="msg-error" v-if="error.matkhau">{{ error.matkhau }}</p>
                <button class="login-btn" @click="btndangnhap()">ĐĂNG NHẬP</button>
                <p>
                  Khách hàng mới?
                  <router-link to="/Register"
                    >Tạo tài khoản</router-link
                  >
                </p>
                <p>
                  Quên mật khẩu?
                  <a href="#">Khôi phục mật khẩu</a>
                </p>
              </div>
            </div>

            <!-- Nền mờ khi mở popup -->
            <div v-if="formdn" class="overlay" v-on:click="closeform()"></div>

            <a href="#" class="text-dark fs-3">
              <i class="bx bx-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
      form: {
        email: "",
        matkhau: "",
      },
      error: {},
      formdn: false,
    };
  },
  methods: {

    anhienform() {
      this.formdn = !this.formdn;
    },
    closeform() {
      this.formdn = false;
    },
    btndangnhap() {
      if (this.validateUser()) {
       
      }
    },
    validateUser() {
      const error = {};

      if (!this.form.email) {
        error.email = "Bạn chưa nhập email";
      }
      if (!this.form.matkhau) {
        error.matkhau = "Bạn chưa nhập mật khẩu";
      }
      this.error = error;

      return Object.keys(error).length === 0;
    },
  },
};
</script>
<style>
.nav-link:hover {
  background: #dbdfd0;
  transition: 0.3s;
  border-radius: 40%;
}
.login-popup {
  position: absolute;
  top: 100%; /* Ngay bên dưới header */
  right: 12px; /* Căn phải */
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 350px;
  max-width: 90%;
}

.login-container h2 {
  color: #2e3191;
  text-align: center;
  font-size: 25px;
}

.login-container input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #2e3191;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.login-btn:hover {
  background: #1e1f6e;
}

/* Nền mờ khi mở popup */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>
