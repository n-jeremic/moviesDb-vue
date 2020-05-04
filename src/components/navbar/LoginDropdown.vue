<template>
  <div>
    <button class="btn btn-info float-right" @click="dropdownOpen = !dropdownOpen">Log in</button>
    <div class="dropdown-menu dropdown-menu-right shadow" :class="{show: dropdownOpen}">
      <form class="px-4 py-3">
        <div class="form-group">
          <label for="email-login">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email-login"
            @blur="$v.email.$touch()"
            placeholder="email@example.com"
            v-model="email"
          />
        </div>
        <div class="form-group mb-4">
          <label for="password-login">Password</label>
          <input
            type="password"
            class="form-control"
            id="password-login"
            @blur="$v.password.$touch()"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button
          type="button"
          class="btn btn-outline-info btn-sm btn-block"
          :disabled="$v.$invalid"
          @click="login"
        >Log in</button>
        <div class="invalid-login" v-if="logInFailed">Invalid username or password.</div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import btnLoader from "../../mixins/btnLoading";

export default {
  mixins: [btnLoader],
  data() {
    return {
      email: null,
      password: null,
      logInFailed: false,
      dropdownOpen: false
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    login(event) {
      this.displayLoader(event.target);
      const userData = {
        email: this.email,
        password: this.password
      };

      this.logInFailed = false;

      this.$store
        .dispatch("logIn", userData)
        .then(response => {
          this.hideLoader(event.target, "Log in");
          if (response === "failed") {
            this.logInFailed = true;
            this.dropdownOpen = true;
          } else {
            this.$toastr.success("Logged in successfully!", "Info");
            this.logInFailed = false;
            this.dropdownOpen = false;
          }
        })
        .catch(error => {
          this.hideLoader(event.target, "Log in");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.invalid-login {
  margin-top: 15px;
  color: red;
  text-align: center;
  font-size: 18px;
}

.dropdown-menu {
  min-width: 20rem !important;
}
</style>