<template>
  <div>
    <b-sidebar id="sidebar" :title="`${selectedPerson.name}`" left backdrop shadow>
      <div class="px-3 py-2">
        <div class="mb-4">
          <b-img
            :src="`${$store.getters.imagePath}/w185${selectedPerson.profile_path}`"
            fluid
            thumbnail
          ></b-img>
        </div>
        <p>
          <span>Department:</span>
          {{ selectedPerson.known_for_department }}
        </p>
        <p>
          <span>Gender:</span>
          {{ selectedPerson.gender === 1 ? "Female" : "Male" }}
        </p>
        <p>
          <span>Popularity:</span>
          {{ selectedPerson.popularity }} points
        </p>
        <p style="margin-bottom: 5px">
          <span>Known for:</span>
        </p>
        <div class="list-group shadow mb-5">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            v-for="(movie, index) in selectedPerson.known_for"
            :key="index"
            @click="redirect(movie.id)"
          >{{ movie.title ? movie.title : movie.name }}</button>
        </div>
        <button
          class="btn btn-info btn-block"
          @click="$router.push(`/trending/celebrity/${selectedPerson.id}`)"
        >
          <i class="fas fa-info-circle mr-2"></i>More Info
        </button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: ["selectedPerson"],
  methods: {
    redirect(id) {
      this.$router.push(`/trending/movie/${id}`);
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

.list-group-item {
  padding: 7px;
}
</style>