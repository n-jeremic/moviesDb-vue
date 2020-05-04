<template>
  <div>
    <div class="card shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">Featured People</h3>
        <div class="cards-container">
          <div
            class="card person-card shadow-sm"
            v-for="(person, index) in peopleData"
            :key="index"
          >
            <img
              :src="`${$store.getters.imagePath}/w185${person.profile_path}`"
              :alt="`${person.name}-photo`"
              v-b-tooltip.hover.top="`${person.name}`"
              class="img-fluid"
              v-b-toggle.sidebar
              @click="clickedPerson = peopleData[index]"
            />
          </div>
        </div>
      </div>
    </div>
    <app-sidebar :selectedPerson="clickedPerson" v-if="clickedPerson"></app-sidebar>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";

export default {
  props: ["peopleData"],
  data() {
    return {
      clickedPerson: null
    };
  },
  components: {
    appSidebar: Sidebar
  }
};
</script>

<style scoped>
.person-card {
  padding: 5px;
  min-width: 15%;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.cards-container {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
}
</style>