<template>
  <div>
    <div v-if="!personData">
      <app-spinner></app-spinner>
    </div>
    <div class="row" v-else>
      <div class="col-12">
        <div class="card shadow">
          <div class="card-body">
            <h1 class="card-title">{{ personData.basicInfo.name }}</h1>
            <hr />
            <app-basic-info :basicInfoData="personData.basicInfo"></app-basic-info>
            <app-movie-credits
              :personInfo="personData.basicInfo"
              :movieCredits="personData.movieCredits"
              v-if="personData.movieCredits.cast.length || personData.movieCredits.crew.length"
            ></app-movie-credits>
            <app-tv-credits
              :personInfo="personData.basicInfo"
              :tvCredits="personData.tvCredits"
              v-if="personData.tvCredits.cast.length || personData.tvCredits.crew.length"
            ></app-tv-credits>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../Spinner.vue";
import BasicInfo from "./BasicInfo.vue";
import MovieCredits from "./MovieCredits.vue";
import TvCredits from "./TvCredits.vue";
import axiosMoviesDb from "../../../axios-instances/axios-movies-db";
import genres from "../../../mixins/genres";

export default {
  mixins: [genres],
  components: {
    appSpinner: Spinner,
    appBasicInfo: BasicInfo,
    appMovieCredits: MovieCredits,
    appTvCredits: TvCredits
  },
  data() {
    return {
      personData: null
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  watch: {
    id(newValue) {
      this.personData = null;
      this.getAllData();
    }
  },
  methods: {
    removeDuplicates(array) {
      const results = [];
      for (let i = 0; i < array.length; i++) {
        const index = results.findIndex(el => el.id === array[i].id);
        if (index === -1) {
          results.push(array[i]);
        }
      }

      return results;
    },
    async getBasicInfo() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/person/${this.id}?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });

      return response.data;
    },
    async getMovieCredits() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/person/${this.id}/movie_credits?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });

      if (response.data.cast.length > 15) {
        response.data.cast.splice(15);
      }

      if (response.data.crew.length > 15) {
        response.data.crew.splice(15);
      }

      return response.data;
    },
    async getTvShowCredits() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/person/${this.id}/tv_credits?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });

      if (response.data.cast.length > 15) {
        response.data.cast.splice(15);
      }

      if (response.data.crew.length > 15) {
        response.data.crew.splice(15);
      }

      return response.data;
    },
    async getAllData() {
      const responsesArr = await Promise.all([
        this.getBasicInfo(),
        this.getMovieCredits(),
        this.getTvShowCredits()
      ]);

      responsesArr[1].crew = this.removeDuplicates(responsesArr[1].crew);
      responsesArr[2].crew = this.removeDuplicates(responsesArr[2].crew);
      responsesArr[2].cast = this.removeDuplicates(responsesArr[2].cast);

      await this.updateDataWithGenres(
        [responsesArr[1].cast, responsesArr[1].crew],
        "movie",
        true
      );
      await this.updateDataWithGenres(
        [responsesArr[2].cast, responsesArr[2].crew],
        "tv",
        true
      );

      responsesArr[1].cast.sort((a, b) => b.vote_average - a.vote_average);
      responsesArr[1].crew.sort((a, b) => b.vote_average - a.vote_average);

      responsesArr[2].cast.sort((a, b) => b.vote_average - a.vote_average);
      responsesArr[2].crew.sort((a, b) => b.vote_average - a.vote_average);

      this.personData = {
        basicInfo: responsesArr[0],
        movieCredits: responsesArr[1],
        tvCredits: responsesArr[2]
      };
    }
  },
  created() {
    this.getAllData();
  }
};
</script>