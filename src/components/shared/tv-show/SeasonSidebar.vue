<template>
  <div>
    <b-sidebar
      id="sidebar-season"
      :title="`${data.season_number === 0  ? 'Special Season' : data.name}`"
      shadow
      backdrop
      @hidden="$emit('sidebarHidden')"
    >
      <div class="px-3 py-2">
        <b-img
          :src="`${$store.getters.imagePath}/w500${data.poster_path}`"
          class="mb-4"
          fluid
          thumbnail
          v-if="data.poster_path"
        ></b-img>
        <b-img src="http://placehold.it/500x750" class="mb-4" fluid thumbnail v-else></b-img>
        <p v-if="data.overview">
          <span>Overview:</span>
          {{ data.overview }}
        </p>
        <p v-if="data.episode_coun">
          <span>Number of episodes:</span>
          {{ data.episode_count }}
        </p>
        <p v-if="data.air_date">
          <span>Release date:</span>
          {{ data.air_date | formatReleaseDate }}
        </p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}
</style>