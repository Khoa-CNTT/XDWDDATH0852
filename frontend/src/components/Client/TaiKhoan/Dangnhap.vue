<template>
  <div>
    <div class="auth-container">
      <div class="auth-option active">Đăng nhập</div>
      <div class="separator">|</div>
      <router-link to="/Register" class="dk">
        <div class="auth-option inactive">Đăng ký</div></router-link
      >
    </div>
    <div class="form-container">
      <div class="form-group">
        <input type="email" placeholder="Email" v-model="form.email" />
        <p class="msg-error" v-if="error.email">{{ error.email }}</p>
      </div>
      <div class="form-group">
        <input type="password" placeholder="Mật khẩu" v-model="form.matkhau" />
        <p class="msg-error" v-if="error.matkhau">{{ error.matkhau }}</p>
      </div>
      <p class="msg-errors">{{ msgErrors }}</p>
      <div class="form-actions">
        <button class="register-btn" @click="btndangnhap()">ĐĂNG NHẬP</button>
        <div class="quenmk">
          <div class="login-link">
            Bạn quên mật khẩu?
            <RouterLink to="/forgotpassword">Quên mật khẩu? </RouterLink>
          </div>
          <div class="login-link">
            Bạn chưa có tài khoản?
            <RouterLink to="/Register">Đăng ký </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    

  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      form: {
        email: "",
        matkhau: "",
      },
      msgErrors: "",
      error: {},
    };
  },
  methods: {
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
      } else if (!this.validEmail(this.form.email)) {
        error.email = "Bạn nhập email chưa đúng";
      }
      this.error = error;

      return Object.keys(error).length === 0;
    },
    validEmail(email) {
      const res =
        /^([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return res.test(email);
    },
  },
};
</script>


<style>

</style>