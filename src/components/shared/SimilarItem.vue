<template>
  <button
    type="button"
    class="list-group-item list-group-item-action"
    @click="redirect(similarData.id)"
  >
    <div class="row">
      <div class="col-3">
        <img
          :src="`${$store.getters.imagePath}/w154${similarData.poster_path}`"
          v-if="similarData.poster_path"
          class="rounded shadow-sm"
          width="70px"
        />
        <img src="http://placehold.it/154x231" class="rounded shadow-sm" width="70px" v-else />
      </div>
      <div class="col-9" style="padding: 10px 15px">
        <p style="font-size: 18px">{{ title }}</p>
        <p class="genres text-muted">{{ genres | formatGenres }}</p>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    similarData: Object,
    mediaType: String
  },
  computed: {
    genres() {
      if (this.similarData.genres.length > 3) {
        const genres = [];
        for (let i = 0; i < 3; i++) {
          genres.push(this.similarData.genres[i]);
        }
        return genres;
      } else {
        return this.similarData.genres;
      }
    },
    title() {
      if (this.mediaType === "movie") {
        if (this.similarData.title.length > 41) {
          return this.similarData.title.substring(0, 41) + "...";
        } else {
          return this.similarData.title;
        }
      } else {
        if (this.similarData.name.length > 41) {
          return this.similarData.name.substring(0, 41) + "...";
        } else {
          return this.similarData.name;
        }
      }
    }
  },
  methods: {
    redirect(id) {
      let newRoute = this.$route.path.split("/");
      newRoute[newRoute.length - 2] = this.mediaType;
      newRoute[newRoute.length - 1] = id;
      this.$router.push(newRoute.join("/"));
    }
  }
};
</script>

<style scoped>
.list-group-item {
  padding: 5px 15px;
  color: black;
}

.list-group-item:hover {
  background-color: #f2f2f2;
}

.genres {
  position: absolute;
  bottom: 5px;
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
}
</style>