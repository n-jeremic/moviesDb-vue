<template>
  <div class="card shadow">
    <b-carousel
      v-model="slide"
      :interval="5000"
      controls
      fade
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(slideData, index) in slides"
        :key="index"
        :caption="`${slideData.name ? slideData.name : slideData.title}`"
        :img-src="`${$store.getters.imagePath}/w780${slideData.backdrop_path}`"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: {
    slides: Array
  },
  data() {
    return {
      slide: 9,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  },
  watch: {
    sliding(newValue) {
      this.$emit("slideChanged", { slide: this.slide, sliding: newValue });
    }
  }
};
</script>

<style scoped>
.card {
  padding: 5px;
}
</style>