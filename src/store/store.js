import Vue from "vue";
import Vuex from "vuex";

import authenticationModule from "./modules/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKeys: {
      authentication: "AIzaSyCe0bv-K_A4tyFPk6M9Aq50SEuSokRk4gQ",
      moviesDb: "821e6e287624c7921335f083519db105"
    },
    imagePath: "https://image.tmdb.org/t/p"
  },
  getters: {
    authenticationKey(state) {
      return state.apiKeys.authentication;
    },
    moviesDbKey(state) {
      return state.apiKeys.moviesDb;
    },
    imagePath(state) {
      return state.imagePath;
    }
  },
  modules: [authenticationModule]
});
