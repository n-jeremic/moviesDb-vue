<template>
  <div
    class="card shadow-sm"
    style="cursor: pointer"
    @mouseover="hovered = true"
    @mouseout="hovered = false"
  >
    <div class="row no-gutters">
      <div class="col-4">
        <img
          :src="`${$store.getters.imagePath}/w185${creditData.poster_path}`"
          class="card-img shadow-sm"
          v-if="creditData.poster_path"
          height="184px"
        />
        <img src="http://placehold.it/185x278" class="card-img shadow-sm" height="184px" v-else />
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text" v-if="creditData.genres.length">
            <span>Genre:</span>
            {{ creditData.genres | formatGenres }}
          </p>
          <p class="card-text">
            <span>Rating:</span>
            {{ creditData.vote_average }} / 10
          </p>
          <p class="card-text" v-if="creditData.release_date || creditData.first_air_date">
            <span>Release date:</span>
            {{ type === "movie" ? creditData.release_date : creditData.first_air_date | formatReleaseDate }}
          </p>
          <button class="btn btn-sm btn-info" v-show="hovered" @click="redirect(creditData.id)">
            <i class="fas fa-info-circle mr-2"></i>More info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    creditData: Object,
    type: String
  },
  data() {
    return {
      hovered: false
    };
  },
  computed: {
    title() {
      let title;
      if (this.type === "movie") {
        title = this.creditData.title;
      } else {
        title = this.creditData.name;
      }

      if (title.length > 32) {
        return title.substring(0, 32) + "...";
      } else {
        return title;
      }
    }
  },
  methods: {
    redirect(id) {
      let newRoute = this.$route.path.split("/");
      newRoute[newRoute.length - 1] = id;
      newRoute[newRoute.length - 2] = this.type;

      this.$router.push(`${newRoute.join("/")}`);
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

img {
  border-radius: 0.25rem 0 0 0.25rem;
  object-fit: cover;
}

p {
  font-size: 14px;
  margin-bottom: 5px;
}

.card {
  min-width: 35%;
  max-width: 35%;
  margin: 0px 10px 10px 10px;
  max-height: 186px !important;
  background-color: #f2f2f2;
}

.card-body {
  padding: 10px;
}
</style>