<template>
  <div>
    <div v-if="!movieData">
      <app-spinner></app-spinner>
    </div>
    <div class="row" v-else>
      <div class="col-2" v-if="!movieData.similarMovies.length"></div>
      <div class="col-8">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="card-title">
              <span>{{ movieData.basicInfo.title }}</span>
            </h2>
            <hr />
            <div class="row">
              <div class="col-5">
                <img
                  :src="`${$store.getters.imagePath}/w500${movieData.basicInfo.poster_path}`"
                  class="img-fluid img-thumbnail shadow-sm"
                  v-if="movieData.basicInfo.poster_path"
                />
                <img
                  src="http://placehold.it/500x750"
                  class="img-fluid img-thumbnail shadow-sm"
                  v-else
                />
              </div>
              <div class="col-7">
                <app-basic-info :basicInfoData="this.movieData.basicInfo"></app-basic-info>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-8"></div>
              <div class="col-4">
                <button
                  class="btn btn-warning btn-block shadow-sm"
                  @click="addToWatchlist"
                  v-if="!onWatchlist"
                >
                  <i class="fas fa-list-ul mr-2"></i> Add to watchlist
                </button>
                <button class="btn btn-success btn-block shadow-sm" id="addedBtn" disabled v-else>
                  <i class="fas fa-check mr-2"></i> On the watchlist
                </button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <div class="card">
                  <div class="card-body overview shadow">
                    <h5 class="card-title">Full overview:</h5>
                    <p class="card-text">{{ this.movieData.basicInfo.overview }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5" v-if="movieData.basicInfo.videos.results.length">
              <app-trailer
                :videoSource="`https://www.youtube.com/embed/${movieData.basicInfo.videos.results[0].key}?rel=0`"
              ></app-trailer>
            </div>
            <app-cast-and-crew :castAndCrewData="movieData.credits"></app-cast-and-crew>
          </div>
        </div>
      </div>
      <div class="col-4" v-if="movieData.similarMovies.length">
        <app-similar-movies :similarData="movieData.similarMovies" :type="'movie'"></app-similar-movies>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMoviesDb from "../../../axios-instances/axios-movies-db";
import axiosFirebase from "../../../axios-instances/axios-firebase";
import Spinner from "../Spinner.vue";
import genres from "../../../mixins/genres";
import BasicInfo from "./BasicInfoPart.vue";
import CastAndCrew from "../CastAndCrew.vue";
import SimilarMovies from "../Similar.vue";
import Trailer from "../Trailer.vue";

export default {
  mixins: [genres],
  data() {
    return {
      movieData: null,
      trailerShow: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    onWatchlist() {
      if (this.$store.getters.watchlist) {
        const index = this.$store.getters.watchlist.findIndex(
          el => el.id === this.movieData.basicInfo.id
        );
        if (index !== -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  watch: {
    id(newValue) {
      this.movieData = null;
      this.trailerShow = false;
      this.getAllMovieData();
    }
  },
  components: {
    appSpinner: Spinner,
    appBasicInfo: BasicInfo,
    appCastAndCrew: CastAndCrew,
    appSimilarMovies: SimilarMovies,
    appTrailer: Trailer
  },
  methods: {
    async addToWatchlist(event) {
      if (!this.$store.getters.userLoggedIn) {
        this.$toastr.error(
          "You have to be logged in to perform this action!",
          "Error"
        );
        return;
      }

      event.target.disabled = true;
      event.target.innerHTML =
        '<span class="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>Adding...';

      try {
        const response = await axiosFirebase({
          method: "POST",
          url: "watchlist.json",
          data: {
            userId: this.$store.getters.userId,
            data: this.movieData.basicInfo,
            type: "movie"
          }
        });

        if (response.status === 200) {
          await this.$store.dispatch(
            "addToWatchlist",
            this.movieData.basicInfo
          );

          document.getElementById("addedBtn").innerHTML =
            '<i class="fas fa-check mr-2"></i>On the watchlist';
          this.$toastr.success("Added to watchlist successfully!", "Info");
        }
      } catch (err) {
        console.log(err);
        event.target.disabled = false;
        event.target.innerHTML =
          '<i class="fas fa-list-ul mr-2"></i>Add to watchlist';
        this.$toastr.error("Saving data failed!", "Error");
      }
    },
    async getBasicDetails() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/movie/${this.id}?api_key=${this.$store.getters.moviesDbKey}&language=en-US&append_to_response=videos`
      });

      return response.data;
    },
    async getCastAndCrew() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/movie/${this.id}/credits?api_key=${this.$store.getters.moviesDbKey}`
      });

      return response.data;
    },
    async getSimilarMovies() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/movie/${this.id}/similar?api_key=${this.$store.getters.moviesDbKey}&language=en-US&page=1`
      });

      return response.data.results;
    },
    async getAllMovieData() {
      const movieDataArr = await Promise.all([
        this.getBasicDetails(),
        this.getCastAndCrew(),
        this.getSimilarMovies()
      ]);

      await this.updateDataWithGenres(movieDataArr[2], "movie");

      this.movieData = {
        basicInfo: movieDataArr[0],
        credits: movieDataArr[1],
        similarMovies: movieDataArr[2]
      };
    }
  },
  created() {
    this.getAllMovieData();
  }
};
</script>

<style scoped>
.overview {
  padding: 10px !important;
}
</style>