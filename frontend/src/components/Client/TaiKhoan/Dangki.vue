<template>
  <div class="register">
    <div class="form-register">
      <RouterLink to="/Login" style="padding: 0 10px;" class="login"><b>Đăng nhập</b></RouterLink>
      <div class="separator">|</div>
      <div class="register-a" style="padding: 0 10px;"><b>Đăng ký</b></div>
    </div>
    <div class="form-container">
      <div class="form-group">
        <input type="text" placeholder="Họ và Tên" v-model="form.name" />
        <p class="msg-error" v-if="error.name">{{ error.name }}</p>
      </div>
      <div class="form-group">
        <input type="email" placeholder="Email" v-model="form.email" />
        <p class="msg-error" v-if="error.email">{{ error.email }}</p>
      </div>
      <div class="form-group">
        <input type="password" placeholder="Mật khẩu" v-model="form.matkhau" />
        <p class="msg-error" v-if="error.matkhau">{{ error.matkhau }}</p>
      </div>
      <div class="form-actions">
        <button @click="btndangky()" class="register-btn">ĐĂNG KÝ</button>
        <div class="login-link">
          Bạn đã có tài khoản?
          <RouterLink to="/Login">Đăng nhập ngay</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        matkhau: "",
      },
      error: "",
    };
  },
  methods: {
      btndangky() {
      if (this.validateUser()) {
        let userItem = {
          name: this.form.name,
          email: this.form.email,
          matkhau: this.form.matkhau,
        };
        axios
          .post("http://localhost:5000/api-docs", userItem)
          .then((res) =>{
              console.log(res);
            })
          .catch((err) =>{
            console.log(err);
            })
        if (result.status == 201) {
          Swal.fire({
            title: "success!",
            text: "Bạn đã đăng ký thành công!",
            icon: "success",
            timer: 2000,
          });
          setTimeout(() => {
            this.$router.push(
              {
                name: "Dangnhap",
              },
              2000
            );
          });
        }
      }
    },
    validateUser() {
      const error = {};

      if (!this.form.name) {
        error.name = "Bạn chưa nhập Họ và Tên";
      }
      if (!this.form.gioitinh) {
        error.gioitinh = "Bạn chưa nhập giới tính";
      }
      if (!this.form.date) {
        error.date = "Bạn chưa nhập ngày tháng năm";
      }
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
      const re =
        /^([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },
  },
};
</script>

<style>
@media(max-width: 600px){
  .form-container .form-group{
    width: 80%;
  }
}
.register {
  margin: auto;
}
.form-register {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 24px;
  margin-top: 50px;
}
.login{
  color: rgb(46, 53, 229);
}
.form-container {
            margin-top: 40px;
            justify-content: center;
            justify-items: center;
        }

        .form-group {
            width: 600px;
            align-items: center;
            margin-bottom: 15px;
           
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="date"] {
            width: 100%;
            padding: 12px;
            background-color: #eee;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        }

        input[type="radio"] {
            margin-right: 5px;
        }

        label {
            margin-right: 15px;
            font-size: 16px;
        }

        .gender-group {
            display: flex;
            align-items: center;
        }
        .form-actions {
            display: flex;
            align-items: center;
            margin-top: 30px;
        }

        .register-btn {
            background: #2e3191;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 20px;
            transition: all 0.3s linear;
            position: relative;
        }
        
        .register-btn:hover{
            background: yellow;
            color: #2e3191;
           
        }

        .login-link {
            font-size: 17px;
        }

        .login-link a {
            color: #0099ff;
            text-decoration: none;
            font-weight: bold;
        }

        .login-link a:hover {
            text-decoration: underline;
        }
        .auth-container {
          display: flex;
          justify-content: center;
          justify-items: center;
          font-size: 24px;
          margin-top: 50px;
        }
        
        .auth-option {
          padding: 0 20px;
          cursor: pointer;
          font-weight: bold;
        }
</style>
