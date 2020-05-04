<template>
  <div
    class="card shadow-sm"
    :class="{'shadow-lg': hovered}"
    @mouseover="hovered = true"
    @mouseout="hovered = false"
    @click="$emit('seasonSelected', seasonObj)"
    v-b-toggle.sidebar-season
  >
    <div
      class="card-header text-center"
    >{{ seasonObj.season_number === 0 ? 'Special' : 'Season ' + seasonObj.season_number }}</div>
    <div class="card-body">
      <img
        :src="`${$store.getters.imagePath}/w342${seasonObj.poster_path}`"
        class="card-img-top"
        height="100%"
        v-if="seasonObj.poster_path"
      />
      <img src="http://placehold.it/342x513" class="card-img-top" height="100%" v-else />
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
    seasonObj: Object
  }
};
</script>

<style scoped>
.card-body {
  padding: 0px;
}

.card-header {
  padding: 5px;
}

.card {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 150px !important;
  min-width: 150px !important;
  cursor: pointer;
}

img {
  border-radius: 0px 0px 0.25rem 0.25rem;
  object-fit: cover;
}
</style>