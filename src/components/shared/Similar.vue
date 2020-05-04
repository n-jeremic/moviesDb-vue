<template>
  <div class="card shadow">
    <h5 class="card-header text-center title">Similar {{ type === "movie" ? 'Movies' : 'TV Shows' }}</h5>
    <div class="card-body">
      <div class="list-group">
        <app-similar-movie-item
          v-for="(dataObj, index) in similarData"
          :key="index"
          :similarData="dataObj"
          :class="{'no-border': index === 0}"
          :mediaType="type"
        ></app-similar-movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import SimilarMovieItem from "./SimilarItem.vue";

export default {
  props: {
    similarData: Array,
    type: String
  },
  components: {
    appSimilarMovieItem: SimilarMovieItem
  }
};
</script>

<style scoped>
.card-body {
  padding: 0px;
}

.card-header {
  padding: 15px 20px;
}

.title {
  color: #404040;
}

.card-body {
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
}

.no-border {
  border-radius: 0 !important;
  border-top: 0 !important;
}
</style>