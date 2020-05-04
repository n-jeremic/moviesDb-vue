<template>
  <div class="card shadow">
    <div class="card-body">
      <h3 class="card-title mb-2 list-title">{{ listTitle }}</h3>
      <div class="cards-container">
        <app-movie-list-item
          v-for="(movie, index) in moviesList"
          :key="index"
          :movie="movie"
          :selectedMovie="activeMovieItem"
          @movieSelected="$emit('movieObjPassed', $event)"
        ></app-movie-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from "./MovieListItem.vue";

export default {
  data() {
    return {
      hovered: false
    };
  },
  props: {
    moviesList: Array,
    header: String,
    activeMovieItem: Number
  },
  components: {
    appMovieListItem: MovieListItem
  },
  computed: {
    listTitle() {
      if (this.header === "top_rated") {
        return "Top rated movies of all the time";
      } else if (this.header === "now_playing") {
        return "Now playing in theatres";
      } else if (this.header === "upcoming") {
        return "Upcoming movies";
      } else {
        return "Currently popular movies";
      }
    }
  }
};
</script>

<style scoped>
.cards-container {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
}

.list-title {
  text-shadow: rgb(224, 224, 209) 1px 1px 2px;
}
</style>