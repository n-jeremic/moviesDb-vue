<template>
  <div class="row mt-5">
    <div :class="castAndCrewData.crew.length ? 'col-6' : 'col-12'">
      <div class="card shadow">
        <div class="card-body">
          <h4 class="card-title">
            Cast:
            <span class="float-right text-muted">{{ castAndCrewData.cast.length }} people</span>
          </h4>
          <div class="list-group shadow-sm">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              v-for="(person, index) in castAndCrewData.cast"
              :key="index"
              @click="redirect(person.id)"
            >
              <img
                :src="`${$store.getters.imagePath}/w185${person.profile_path}`"
                class="mr-3 rounded shadow"
                width="50px"
                v-if="person.profile_path"
              />
              <img
                src="http://placehold.it/185x277"
                width="50px"
                class="mr-3 rounded shadow"
                v-else
              />
              {{ person.name | formatName }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6" v-if="castAndCrewData.crew.length">
      <div class="card shadow">
        <div class="card-body">
          <h4 class="card-title">
            Crew:
            <span class="float-right text-muted">{{ castAndCrewData.crew.length }} roles</span>
          </h4>
          <div class="list-group shadow-sm">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              v-for="(person, index) in castAndCrewData.crew"
              :key="index"
              @click="redirect(person.id)"
            >
              <img
                :src="`${$store.getters.imagePath}/w185${person.profile_path}`"
                class="mr-3 rounded shadow"
                width="50px"
                v-if="person.profile_path"
              />
              <img
                src="http://placehold.it/185x277"
                width="50px"
                class="mr-3 rounded shadow"
                v-else
              />
              {{ person.name | formatName }}
              <span
                class="badge badge-info text-wrap"
              >{{ person.job }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    castAndCrewData: Object
  },
  methods: {
    redirect(id) {
      let newRoute = this.$route.path.split("/");
      newRoute[newRoute.length - 2] = "celebrity";
      newRoute[newRoute.length - 1] = id;

      this.$router.push(`${newRoute.join("/")}`);
    }
  }
};
</script>

<style scoped>
.text-muted {
  font-size: 17px;
  margin-top: 5px;
}

.list-group {
  max-height: 400px !important;
  overflow-x: hidden;
  overflow-y: auto;
}

.card-body {
  padding: 15px;
}

.list-group-item {
  padding: 5px 15px;
  background-color: #f2f2f2;
  color: black;
}

.list-group-item:hover {
  background-color: #d9d9d9;
}

.badge {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>