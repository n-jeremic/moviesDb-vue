<template>
  <div class="row">
    <div class="col-4">
      <img
        :src="`${$store.getters.imagePath}/h632${basicInfoData.profile_path}`"
        class="img-fluid img-thumbnail shadow-sm"
        v-if="basicInfoData.profile_path"
      />
      <img src="http://placehold.it/421x632" class="img-fluid img-thumbnail shadow-sm" v-else />
    </div>
    <div class="col-8">
      <p class="card-text" v-if="basicInfoData.known_for_department">
        <span class="bold">Known for department:</span>
        <span class="text-muted">{{ basicInfoData.known_for_department }}</span>
      </p>
      <p class="card-text" v-if="basicInfoData.popularity">
        <span class="bold">Popularity:</span>
        <span class="text-muted">{{ basicInfoData.popularity }} points</span>
      </p>
      <p class="card-text" v-if="basicInfoData.gender">
        <span class="bold">Gender:</span>
        <span class="text-muted">{{ basicInfoData.gender === 1 ? "Female" : "Male" }}</span>
      </p>
      <p class="card-text" v-if="basicInfoData.birthday">
        <span class="bold">Birthday:</span>
        <span class="text-muted">{{ basicInfoData.birthday | formatReleaseDate }}</span>
      </p>
      <p class="card-text" v-if="basicInfoData.place_of_birth">
        <span class="bold">Place of birth:</span>
        <span class="text-muted">{{ basicInfoData.place_of_birth }}</span>
      </p>
      <p class="card-text" v-if="basicInfoData.biography">
        <span class="bold">Biography:</span>
        <span class="text-muted">
          {{ biography }}
          <a
            href="#biographyModal"
            data-toggle="modal"
            v-if="basicInfoData.biography.length > 1200"
          >Read more</a>
        </span>
      </p>
    </div>
    <app-modal
      :personName="basicInfoData.name"
      :biography="basicInfoData.biography"
      v-if="basicInfoData.biography.length > 1200"
    ></app-modal>
  </div>
</template>

<script>
import Modal from "./BiographyModal.vue";

export default {
  props: {
    basicInfoData: Object
  },
  components: {
    appModal: Modal
  },
  computed: {
    biography() {
      if (this.basicInfoData.biography.length > 1200) {
        return this.basicInfoData.biography.substring(0, 1200) + "...";
      } else {
        return this.basicInfoData.biography;
      }
    }
  }
};
</script>

<style scoped>
.bold {
  font-weight: 500;
}
</style>