<template>
  <nav class="navbar navbar-light bg-secondary">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <a class="navbar-brand text-white">
            <i class="fas fa-tv mr-2"></i>Movies Database
          </a>
        </div>
        <div class="col no-padding">
          <app-search-input></app-search-input>
        </div>
        <div class="col no-padding">
          <template v-if="!userLoggedIn">
            <app-login></app-login>
            <app-sign-up></app-sign-up>
          </template>
          <template v-else>
            <app-logged-in-user></app-logged-in-user>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Modal from "./SignupModal.vue";
import Login from "./LoginDropdown.vue";
import LoggedInUser from "./loggedInUser.vue";
import SearchInput from "./SearchInput.vue";

export default {
  computed: {
    userLoggedIn() {
      return this.$store.getters.userLoggedIn;
    }
  },
  components: {
    appSignUp: Modal,
    appLogin: Login,
    appLoggedInUser: LoggedInUser,
    appSearchInput: SearchInput
  }
};
</script>

<style scoped>
.row {
  width: 100%;
}

.navbar-brand {
  font-weight: 600;
}

.no-padding {
  padding: 0px !important;
}

.container {
  padding: 30px 0px;
}
</style>