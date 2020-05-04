<template>
  <div>
    <div v-if="!trendingData">
      <app-spinner></app-spinner>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-8">
          <app-slider :slides="trendingData.movies_and_shows" @slideChanged="updateSlideData"></app-slider>
        </div>
        <div class="col-4">
          <transition name="fade" mode="out-in">
            <app-basic-info-card
              :activeSlide="trendingData.movies_and_shows[slideData.currentSlide]"
              v-if="!slideData.sliding"
            ></app-basic-info-card>
          </transition>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <app-featured-people :peopleData="trendingData.people"></app-featured-people>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import BasicInfoCard from "./BasicInfoCard.vue";
import FeaturedPeople from "./FeaturedPeople.vue";
import Spinner from "../shared/Spinner.vue";
import axiosMoviesDb from "../../axios-instances/axios-movies-db";
import genres from "../../mixins/genres";

export default {
  mixins: [genres],
  data() {
    return {
      trendingData: null,
      slideData: {
        currentSlide: 9,
        sliding: false
      }
    };
  },
  components: {
    appSlider: Slider,
    appBasicInfoCard: BasicInfoCard,
    appFeaturedPeople: FeaturedPeople,
    appSpinner: Spinner
  },
  methods: {
    async getTrendingData() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/trending/all/week?api_key=${this.$store.getters.moviesDbKey}`
      });

      return response.data.results;
    },
    updateSlideData(event) {
      this.slideData.currentSlide = event.slide;
      this.slideData.sliding = event.sliding;
    },
    async getTrendingPeople() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/trending/person/week?api_key=${this.$store.getters.moviesDbKey}`
      });

      return response.data.results;
    }
  },
  async created() {
    const responsesArr = await Promise.all([
      this.getTrendingData(),
      this.getTrendingPeople()
    ]);

    const trendingData = responsesArr[0];
    const people = responsesArr[1];

    const finalResults = await this.updateDataWithGenres(
      trendingData,
      "trendingData"
    );

    this.trendingData = {
      movies_and_shows: finalResults,
      people
    };
  }
};
</script>
<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.4s;
}

.fade-leave-active {
  transition: opacity 0.4s;
  opacity: 0;
}
</style>