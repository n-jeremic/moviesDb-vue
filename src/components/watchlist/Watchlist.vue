<template>
  <div class="card shadow">
    <div class="card-body">
      <div v-if="watchlist && watchlist.length">
        <h2 class="card-title mb-4" style="color: #333333">My watchlist:</h2>
        <div class="row">
          <app-list-item v-for="(object) in watchlist" :key="object.id" :item="object"></app-list-item>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          <h3 class="text-center" style="color: #333333">Your watchlist is currently empty.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/store";
import listItem from "./WatchlistItem.vue";

export default {
  computed: {
    watchlist() {
      return this.$store.getters.watchlist;
    }
  },
  components: {
    appListItem: listItem
  },
  beforeRouteEnter(to, from, next) {
    if (store.state[0].token) {
      next();
    } else {
      next("/trending");
    }
  }
};
</script>

<style scoped>
</style>