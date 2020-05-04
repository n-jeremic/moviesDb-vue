<template>
  <div class="row mt-5 main-color">
    <div class="col-12">
      <div class="card shadow">
        <div class="card-body">
          <h3 class="card-title mb-3 main-title">{{ title }}</h3>
          <div class="card-container">
            <app-credit-item
              v-for="(tvShow, index) in tvShows"
              :key="index"
              :type="'tv-show'"
              :creditData="tvShow"
            ></app-credit-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreditItem from "./CreditListItem.vue";

export default {
  props: {
    personInfo: Object,
    tvCredits: Object
  },
  components: {
    appCreditItem: CreditItem
  },
  computed: {
    title() {
      if (this.personInfo.known_for_department === "Acting") {
        return `TV show roles by ${this.personInfo.name}`;
      } else {
        return `TV shows by ${this.personInfo.name}`;
      }
    },
    tvShows() {
      if (this.personInfo.known_for_department === "Acting") {
        return this.tvCredits.cast;
      } else {
        return this.tvCredits.crew;
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
}

.main-title {
  text-shadow: 2px 2px #e6e6e6;
}

.main-color {
  color: #333333;
}
</style>