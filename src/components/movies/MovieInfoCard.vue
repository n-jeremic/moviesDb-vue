<template>
  <div class="card shadow">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="`${$store.getters.imagePath}/w500${movieData.poster_path}`"
          class="card-img"
          :alt="`${movieData.title}-poster`"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">{{ movieData.title }}</h3>
          <hr />
          <p class="card-text">
            <span>Genre:</span>
            {{ movieData.genres | formatGenres }}
          </p>
          <p class="card-text">
            <span>Popularity:</span>
            {{ movieData.popularity }} points
          </p>
          <p class="card-text" v-if="movieData.release_date">
            <span>Release date:</span>
            {{ movieData.release_date | formatReleaseDate }}
          </p>
          <p class="card-text">
            <span>Rating:</span>
            {{ movieData.vote_average }} / 10 ( {{ movieData.vote_count }} votes )
          </p>
          <p class="card-text">
            <span>Overview:</span>
            {{ movieData.overview | formatMovieDescription }}
          </p>
          <button class="btn btn-light" @click="$router.push(`/movies/movie/${movieData.id}`);">
            <i class="fas fa-info-circle mr-2"></i>More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieData: Object
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

img {
  border-radius: 0.25rem 0 0 0.25rem;
}
</style>