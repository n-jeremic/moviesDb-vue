<template>
  <div class="card shadow">
    <div class="card-body">
      <h4 class="card-title">{{ activeSlide.name ? activeSlide.name : activeSlide.title }}</h4>
      <hr />
      <p class="card-text">
        <span>Type:</span>
        <span class="text-muted">{{ activeSlide.media_type === "movie" ? 'Movie' : "TV Show" }}</span>
      </p>
      <p class="card-text">
        <span>Genre:</span>
        <span class="text-muted">{{ activeSlide.genres | formatGenres }}</span>
      </p>
      <p class="card-text">
        <span>Popularity:</span>
        <span class="text-muted">{{ activeSlide.popularity }} points</span>
      </p>
      <p class="card-text" v-if="activeSlide.release_date">
        <span>Release date:</span>
        <span class="text-muted">{{ activeSlide.release_date | formatReleaseDate }}</span>
      </p>
      <p class="card-text">
        <span>Rating:</span>
        <span
          class="text-muted"
        >{{ activeSlide.vote_average }} / 10 ( {{ activeSlide.vote_count }} votes )</span>
      </p>
      <button class="btn btn-light" @click="redirect">
        <i class="fas fa-info-circle mr-2"></i>More Info
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeSlide: Object
  },
  methods: {
    redirect() {
      if (this.activeSlide.media_type === "movie") {
        this.$router.push(`/trending/movie/${this.activeSlide.id}`);
      } else {
        this.$router.push(`/trending/tv-show/${this.activeSlide.id}`);
      }
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

.card {
  height: 427px !important;
}

button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>