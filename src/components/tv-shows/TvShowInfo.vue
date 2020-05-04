<template>
  <div class="card shadow">
    <img
      :src="`${$store.getters.imagePath}/w1280${showData.backdrop_path}`"
      class="card-img-top"
      v-if="showData.backdrop_path"
    />
    <img src="http://placehold.it/1280x720" class="card-img-top" v-else />
    <div class="card-body main-card-body">
      <div class="row">
        <div class="col-6">
          <p class="card-text">
            <span>Title:</span>
            <span class="text-muted">{{ showData.name }}</span>
          </p>
          <p class="card-text">
            <span>Genre:</span>
            <span class="text-muted">{{ showData.genres | formatGenres }}</span>
          </p>
          <p class="card-text">
            <span>Rating:</span>
            <span
              class="text-muted"
            >{{ showData.vote_average }}/10 ( {{ showData.vote_count }} votes )</span>
          </p>
          <p class="card-text">
            <span>Popularity:</span>
            <span class="text-muted">{{ showData.popularity }} points</span>
          </p>
          <p class="card-text">
            <span>Release date:</span>
            <span class="text-muted">{{ showData.first_air_date | formatReleaseDate }}</span>
          </p>
        </div>
        <div class="col-6">
          <div class="card shadow-sm">
            <div class="card-body" style="padding: 10px">
              <h5 class="card-title">Overview:</h5>
              <p class="card-text">{{ overview }}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="btn-p text-right">
        <button class="btn btn-info" @click="$router.push(`/tv-shows/tv-show/${showData.id}`)">
          <i class="fas fa-info-circle mr-2"></i>More Info
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showData: Object
  },
  computed: {
    overview() {
      if (this.showData.overview.length > 215) {
        return this.showData.overview.substring(0, 215) + "...";
      } else {
        return this.showData.overview;
      }
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

p {
  margin-bottom: 10px !important;
}

.btn-p {
  margin-bottom: 0px;
  margin-top: 15px;
}

.main-card-body {
  padding: 20px 20px 0px 20px;
}
</style>