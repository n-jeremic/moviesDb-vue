<template>
  <div>
    <button
      class="btn btn-light float-right margin"
      data-toggle="modal"
      data-target="#signUpModal"
    >Sign up</button>
    <div
      class="modal fade"
      id="signUpModal"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registration Form</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form autocomplete="off">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  :class="{'is-invalid': $v.firstName.$error}"
                  @blur="$v.firstName.$touch()"
                  v-model="firstName"
                />
                <div
                  class="invalid-feedback"
                  v-if="$v.firstName.$error"
                >You have to provide your full name.</div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  :class="{'is-invalid': $v.lastName.$error}"
                  @blur="$v.lastName.$touch()"
                  v-model="lastName"
                />
                <div
                  class="invalid-feedback"
                  v-if="$v.lastName.$error"
                >You have to provide your full name.</div>
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  :class="{'is-invalid': $v.email.$error, 'is-valid': !$v.email.$error && !$v.email.$invalid}"
                  @blur="$v.email.$touch()"
                  v-model="email"
                />
                <div
                  class="invalid-feedback"
                  v-if="!$v.email.email"
                >Please provide a valid email address.</div>
                <div
                  class="invalid-feedback"
                  v-if="$v.email.$error && !$v.email.required"
                >You have to provide your email address.</div>
                <div
                  class="invalid-feedback"
                  v-if="!$v.email.checkEmailInDatabase"
                >This email already exists.</div>
                <div class="valid-feedback" v-if="!$v.email.$invalid">Email address valid.</div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  :class="{'is-invalid': $v.password.$error, 'is-valid': !$v.password.$error && !$v.password.$invalid}"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  v-model="password"
                />
                <div
                  class="invalid-feedback"
                  v-if="!$v.password.minLength"
                >Your password must have a minimum of {{ $v.password.$params.minLength.min }} characters.</div>
                <div
                  class="invalid-feedback"
                  v-if="$v.password.$error && !$v.password.required"
                >You have to provide your password.</div>
                <div
                  class="valid-feedback"
                  v-if="!$v.password.$invalid && !$v.password.$error"
                >Looks good.</div>
              </div>
              <div class="form-group">
                <label for="passwordConfirm">Password Confirm</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  class="form-control"
                  :class="{'is-invalid': $v.passwordConfirm.$error, 'is-valid': $v.passwordConfirm.sameAs && !$v.passwordConfirm.$invalid}"
                  @input="$v.passwordConfirm.$touch()"
                  @blur="$v.passwordConfirm.$touch()"
                  v-model="passwordConfirm"
                />
                <div
                  class="invalid-feedback"
                  v-if="$v.passwordConfirm.$error"
                >Passwords do not match.</div>
                <div class="valid-feedback" v-if="$v.passwordConfirm.sameAs">Passwords matched.</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info btn-block"
              @click="signUp"
              :disabled="$v.$invalid"
            >
              <i class="fas fa-user-plus mr-2"></i>Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import btnLoader from "../../mixins/btnLoading";
import axiosFirebase from "../../axios-instances/axios-firebase";
import Swal from "sweetalert2";

export default {
  mixins: [btnLoader],
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirm: null
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email,
      checkEmailInDatabase: value => {
        if (value === "") return true;
        return axiosFirebase
          .get('users.json?orderBy="email"&equalTo="' + value + '"')
          .then(res => {
            return Object.keys(res.data).length === 0;
          });
      }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirm: {
      required,
      sameAs: sameAs("password")
    }
  },
  methods: {
    signUp(event) {
      this.displayLoader(event.target);
      const userData = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      };

      this.$store.dispatch("signUp", userData);
    }
  }
};
</script>

<style scoped>
.modal-body {
  padding: 10px 40px;
}

.modal-footer {
  padding: 10px 40px;
}

.margin {
  margin: 0px 20px;
}
</style>