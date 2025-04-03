<template>
  <div>
      <nav class="navbar navbar-expand-lg bg-white fixed-top " :class="{ hidden: !isHeaderVisible }">
          <div class="container d-flex justify-content-around">
              <RouterLink to="/">
                  <img style="margin-left: 10px" src="../../img/1.png" width="200px" alt="Logo" />
              </RouterLink>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                      <li class=" nav-item px-2 ">
                          <router-link to="/about" style="color: #2C2F24;"
                              class="nav-link active fs-5">About</router-link>
                      </li>
                      <li class="nav-item px-2">
                          <router-link to="/menu" style="color: #2C2F24;"
                              class="nav-link active fs-5">Menu</router-link>
                      </li>
                      <li class="nav-item px-2">
                          <router-link to="/pages" style="color: #2C2F24;"
                          class="nav-link active fs-5">Pages</router-link>
                      </li>
                      <li class="nav-item px-2">
                          <router-link to="/contact" style="color: #2C2F24;"
                          class="nav-link active fs-5">Contact</router-link>
                      </li>
                  </ul>
                  <div class="d-flex gap-4">
                      <button class="btn btn-primary">ORDER NOW</button>
                  </div>
              </div>
          </div>
      </nav>
  </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router';
export default {};
</script>
<style>

.nav-link:hover {
  background: #DBDFD0;
  transition: 0.3s;
  border-radius: 40%;
}
</style>