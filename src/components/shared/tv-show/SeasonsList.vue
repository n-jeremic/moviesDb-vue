<template>
  <div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">Seasons</h5>
            <div class="cards-container">
              <app-season-list-item
                v-for="(season, index) in seasons"
                :key="index"
                :seasonObj="season"
                @seasonSelected="displaySeason = $event"
              ></app-season-list-item>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-sidebar v-if="displaySeason" :data="displaySeason" @sidebarHidden="displaySeason = null"></app-sidebar>
  </div>
</template>

<script>
import SeasonListItem from "./SeasonListItem.vue";
import SeasonSidebar from "./SeasonSidebar.vue";

export default {
  data() {
    return {
      displaySeason: null
    };
  },
  props: {
    seasons: Array
  },
  components: {
    appSeasonListItem: SeasonListItem,
    appSidebar: SeasonSidebar
  }
};
</script>

<style scoped>
.cards-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>