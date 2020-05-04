<template>
  <div>
    <div v-if="!tvShowData">
      <app-spinner></app-spinner>
    </div>
    <div class="row" v-else>
      <div class="col-2" v-if="!tvShowData.similarShows.length"></div>
      <div class="col-8">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="card-title">
              <span>{{ tvShowData.basicInfo.name }}</span>
            </h2>
            <hr />
            <div class="row">
              <div class="col-5">
                <img
                  :src="`${$store.getters.imagePath}/w500${tvShowData.basicInfo.poster_path}`"
                  class="img-fluid img-thumbnail shadow-sm"
                  v-if="tvShowData.basicInfo.poster_path"
                />
                <img
                  src="http://placehold.it/500x750"
                  class="img-fluid img-thumbnail shadow-sm"
                  v-else
                />
              </div>
              <div class="col-7">
                <app-basic-info :basicInfoData="tvShowData.basicInfo"></app-basic-info>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-8"></div>
              <div class="col-4">
                <button class="btn btn-warning btn-block shadow-sm" disabled v-if="isLoading">
                  <span class="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>Adding...
                </button>
                <button
                  class="btn btn-warning btn-block shadow-sm"
                  @click="addToWatchlist"
                  v-if="!onWatchlist && !isLoading"
                >
                  <i class="fas fa-list-ul mr-2"></i>Add to watchlist
                </button>
                <button
                  class="btn btn-success btn-block shadow-sm"
                  id="addedBtn"
                  disabled
                  v-if="onWatchlist && !isLoading"
                >
                  <i class="fas fa-check mr-2"></i>On the watchlist
                </button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <div class="card">
                  <div class="card-body overview shadow">
                    <h5 class="card-title">Full overview:</h5>
                    <p class="card-text">{{ this.tvShowData.basicInfo.overview }}</p>
                  </div>
                </div>
              </div>
            </div>
            <app-seasons :seasons="tvShowData.basicInfo.seasons"></app-seasons>
            <div class="row mt-5" v-if="tvShowData.basicInfo.videos.results.length">
              <app-trailer
                :videoSource="`https://www.youtube.com/embed/${tvShowData.basicInfo.videos.results[0].key}?rel=0`"
              ></app-trailer>
            </div>
            <app-cast-and-crew :castAndCrewData="tvShowData.credits"></app-cast-and-crew>
          </div>
        </div>
      </div>
      <div class="col-4" v-if="tvShowData.similarShows.length">
        <app-similar-shows :similarData="tvShowData.similarShows" :type="'tv-show'"></app-similar-shows>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMoviesDb from "../../../axios-instances/axios-movies-db";
import axiosFirebase from "../../../axios-instances/axios-firebase";
import genres from "../../../mixins/genres";
import Spinner from "../Spinner.vue";
import SimilarShows from "../Similar.vue";
import BasicInfo from "./BasicInfoPart.vue";
import Trailer from "../Trailer.vue";
import CastAndCrew from "../CastAndCrew.vue";
import Seasons from "./SeasonsList.vue";

export default {
  mixins: [genres],
  components: {
    appSpinner: Spinner,
    appSimilarShows: SimilarShows,
    appBasicInfo: BasicInfo,
    appTrailer: Trailer,
    appCastAndCrew: CastAndCrew,
    appSeasons: Seasons
  },
  data() {
    return {
      tvShowData: null,
      isLoading: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    onWatchlist() {
      if (this.$store.getters.watchlist) {
        const index = this.$store.getters.watchlist.findIndex(
          el => el.id === this.tvShowData.basicInfo.id
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
    id() {
      this.tvShowData = null;
      this.getAllData();
    }
  },
  methods: {
    async addToWatchlist() {
      if (!this.$store.getters.userLoggedIn) {
        this.$toastr.error(
          "You have to be logged in to perform this action!",
          "Error"
        );
        return;
      }

      this.isLoading = true;

      try {
        const response = await axiosFirebase({
          method: "POST",
          url: "watchlist.json",
          data: {
            userId: this.$store.getters.userId,
            data: this.tvShowData.basicInfo,
            type: "tv"
          }
        });

        if (response.status === 200) {
          this.$store.dispatch("addToWatchlist", this.tvShowData.basicInfo);
          this.isLoading = false;
          this.$toastr.success("Added to watchlist successfully!", "Info");
        }
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        this.$toastr.error("Saving data failed!", "Error");
      }
    },
    async getBasicInfo() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/tv/${this.id}?api_key=${this.$store.getters.moviesDbKey}&language=en-US&append_to_response=videos`
      });

      return response.data;
    },
    async getCastAndCrew() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/tv/${this.id}/credits?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });

      return response.data;
    },
    async getSimilarShows() {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/tv/${this.id}/similar?api_key=${this.$store.getters.moviesDbKey}&language=en-US&page=1`
      });

      return response.data.results;
    },
    async getAllData() {
      const responsesArr = await Promise.all([
        this.getBasicInfo(),
        this.getCastAndCrew(),
        this.getSimilarShows()
      ]);

      await this.updateDataWithGenres(responsesArr[2], "tv");

      this.tvShowData = {
        basicInfo: responsesArr[0],
        credits: responsesArr[1],
        similarShows: responsesArr[2]
      };
    }
  },
  created() {
    this.getAllData();
  }
};
</script>

<style scoped>
.overview {
  padding: 10px !important;
}
</style>