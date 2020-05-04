import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import VueToastr2 from "vue-toastr-2";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";

import store from "./store/store";
import router from "./router/router";

window.toastr = require("toastr");

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueToastr2, {
  positionClass: "toast-bottom-right"
});

Vue.filter("capitalizeName", function(value) {
  return value.replace(value[0], value[0].toUpperCase());
});

Vue.filter("formatGenres", function(genresArr) {
  let genresString = "";
  for (let i = 0; i < genresArr.length; i++) {
    if (i === genresArr.length - 1) {
      genresString += genresArr[i];
    } else {
      genresString += genresArr[i] + ", ";
    }
  }

  return genresString;
});

Vue.filter("formatReleaseDate", function(dateString) {
  const dateArr = dateString.split("-");
  const formatedDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];

  return formatedDate;
});

Vue.filter("formatMovieDescription", function(value) {
  if (value.length > 150) {
    return value.substring(0, 150) + "...";
  } else {
    return value;
  }
});

Vue.filter("formatName", function(value) {
  if (value.length > 20) {
    const nameArr = value.split(" ");
    if (nameArr.length === 3) {
      return nameArr[0] + " " + nameArr[1];
    } else {
      return value;
    }
  } else {
    return value;
  }
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
