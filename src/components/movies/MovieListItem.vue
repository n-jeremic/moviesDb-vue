<template>
  <div class="movie-card" :class="{active: selectedMovie === movie.id}">
    <div
      class="card text-white shadow"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      @click="$emit('movieSelected', movie)"
    >
      <img
        :src="`${$store.getters.imagePath}/w342${movie.poster_path}`"
        class="card-img"
        :alt="`${movie.title}-poster`"
      />
      <div class="card-img-overlay">
        <div class="movie-title" v-show="hovered">
          <h5 class="card-title">{{ movie.title }}</h5>
        </div>
        <div class="movie-footer" v-show="hovered">{{ movie.vote_average }} / 10</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hovered: false
    };
  },
  props: {
    movie: Object,
    selectedMovie: Number
  }
};
</script>

<style scoped>
.movie-card {
  min-width: 17%;
  padding: 20px 10px 10px 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.card {
  border: 0px !important;
}

.active {
  background-color: #bfbfbf;
}

.card-img-overlay {
  padding: 0px !important;
}

.movie-title {
  background-color: rgb(13, 13, 13, 0.8);
  text-align: center;
  padding: 8px 0px 2px 0px;
}

.movie-footer {
  position: absolute;
  bottom: 0;
  min-width: 100%;
  background-color: rgb(13, 13, 13, 0.8);
  text-align: center;
  padding: 5px 0px;
}
</style>