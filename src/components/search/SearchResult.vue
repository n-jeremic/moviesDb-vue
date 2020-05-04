<template>
  <div class="col-3">
    <div
      class="card mb-3 shadow-sm"
      :class="{'shadow-lg': hovered}"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      @click="redirect"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="`${$store.getters.imagePath}/w185${resultObj.poster_path}`"
            class="card-img"
            height="100%"
            v-if="resultObj.poster_path"
          />
          <img src="http://placehold.it/185x278" class="card-img" height="100%" v-else />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">{{ title }}</h6>
            <p class="card-text">Rating: {{ resultObj.vote_average }}</p>
            <p class="card-text">{{ genres | formatGenres }}</p>
          </div>
        </div>
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
    resultObj: Object,
    media_type: String
  },
  computed: {
    title() {
      let string;
      if (this.media_type === "movie") {
        string = this.resultObj.title;
      } else {
        string = this.resultObj.name;
      }

      if (string) {
        if (string.length > 28) {
          return string.substring(0, 28) + "...";
        } else {
          return string;
        }
      }
    },
    genres() {
      if (this.resultObj.genres.length > 3) {
        return this.resultObj.genres.slice(0, 3);
      } else {
        return this.resultObj.genres;
      }
    }
  },
  methods: {
    redirect() {
      if (this.media_type === "movie") {
        this.$router.push("/search/movie/" + this.resultObj.id);
      } else {
        this.$router.push("/search/tv-show/" + this.resultObj.id);
      }
    }
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
}

.card-body {
  padding: 5px 10px;
}

p.card-text {
  font-size: 14px;
  margin-bottom: 5px;
}

img {
  object-fit: cover;
  border-radius: 0.25rem 0 0 0.25rem;
}
</style>