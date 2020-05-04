<template>
  <div class="row mt-5 main-color">
    <div class="col-12">
      <div class="card shadow">
        <div class="card-body">
          <h3 class="card-title mb-3 main-title">{{ title }}</h3>
          <div class="card-container">
            <app-credit-item
              v-for="(movie, index) in movies"
              :key="index"
              :type="'movie'"
              :creditData="movie"
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
    movieCredits: Object
  },
  components: {
    appCreditItem: CreditItem
  },
  computed: {
    title() {
      if (this.personInfo.known_for_department === "Acting") {
        return `Movie roles by ${this.personInfo.name}`;
      } else {
        return `Movies by ${this.personInfo.name}`;
      }
    },
    movies() {
      if (this.personInfo.known_for_department === "Acting") {
        return this.movieCredits.cast;
      } else {
        return this.movieCredits.crew;
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