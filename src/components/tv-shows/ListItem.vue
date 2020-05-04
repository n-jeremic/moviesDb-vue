<template>
  <div
    class="card-container"
    :class="{active: listItem.id === activeItem.id, 'hover-active': hovered && listItem.id !== activeItem.id}"
  >
    <div
      class="card shadow-sm"
      @click="$emit('itemSelected', listItem)"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="`${$store.getters.imagePath}/w185${listItem.poster_path}`"
            class="card-img shadow-sm"
            v-if="listItem.poster_path"
          />
          <img src="http://placehold.it/185x272" class="card-img shadow-sm" v-else />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ listItem.name }}</h5>
            <p class="card-text">
              <span>Genre:</span>
              {{ listItem.genres | formatGenres }}
            </p>
            <p class="card-text">
              <span>Rating:</span>
              {{ listItem.vote_average }} / 10
            </p>
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
    listItem: Object,
    activeItem: Object
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
}

.card-container {
  padding: 15px 20px;
}

.active {
  background-color: #80bbff;
}

.hover-active {
  background-color: #e6e6e6;
}

.card-body {
  padding: 10px;
}

p span {
  font-weight: 500;
}

p {
  font-size: 15px;
  margin-bottom: 5px;
}

img {
  border-radius: 0.25rem 0 0 0.25rem;
}
</style>