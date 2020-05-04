<template>
  <div id="app">
    <app-navbar></app-navbar>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-pills nav-justified">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/trending" tag="a">
                <i class="fas fa-fire mr-2"></i>Trending
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/movies" tag="a">
                <i class="fas fa-film mr-2"></i>Movies
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/tv-shows" tag="a">
                <i class="fas fa-tv mr-2"></i>TV Shows
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-12 router-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";

export default {
  components: {
    appNavbar: Navbar
  },
  beforeCreate() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style scoped>
.container {
  padding: 30px 0px;
}

.nav-link {
  font-size: 18px;
}

.router-view {
  padding: 30px 15px;
}
</style>
