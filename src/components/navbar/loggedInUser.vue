<template>
  <div>
    <button class="btn btn-info float-right" @click="dropdownOpen = !dropdownOpen">
      Logged in as {{ userData.firstName | capitalizeName }} {{ userData.lastName | capitalizeName }}
      <i
        class="fas fa-angle-double-down ml-2"
      ></i>
    </button>
    <div class="dropdown-menu dropdown-menu-right shadow" :class="{show: dropdownOpen}">
      <h3>{{ userData.firstName | capitalizeName }} {{ userData.lastName | capitalizeName }}</h3>
      <p class="text-muted">{{ userData.email }}</p>
      <hr />
      <div @click="dropdownOpen = false">
        <router-link tag="a" class="dropdown-item" to="/watchlist">
          <i class="fas fa-list-ul mr-2"></i>My watchlist
          <span class="badge badge-info float-right mt-1">{{ watchlistNumber }}</span>
        </router-link>
      </div>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#" @click.prevent="logOut">
        <i class="fas fa-sign-out-alt mr-2"></i>Log out
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    watchlistNumber() {
      if (this.$store.getters.watchlist) {
        return this.$store.getters.watchlist.length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$toastr.success("Logged out successfully!", "Info");

      if (this.$route.path.startsWith("/watchlist")) {
        this.$router.push("/trending");
      }
    }
  }
};
</script>

<style scoped>
.dropdown-menu {
  min-width: 20rem !important;
  padding: 10px 20px;
  color: #333333;
}

a {
  padding: 4px !important;
}
</style>