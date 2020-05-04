<template>
  <div>
    <div v-if="!moviesData">
      <app-spinner></app-spinner>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-9">
          <app-info-card :movieData="selectedMovie"></app-info-card>
        </div>
        <div class="col-3">
          <app-navigation @tabChanged="updateList"></app-navigation>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <app-movies-list
            :moviesList="activeList"
            :header="activeNavTab"
            :activeMovieItem="selectedMovie.id"
            @movieObjPassed="selectedMovie = $event"
          ></app-movies-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../shared/Spinner.vue";
import InfoCard from "./MovieInfoCard.vue";
import Navigation from "./MoviesNavigation.vue";
import MoviesList from "./MoviesList.vue";
import axiosMovesDb from "../../axios-instances/axios-movies-db";
import genres from "../../mixins/genres";

export default {
  name: "moviesHomeComponent",
  mixins: [genres],
  data() {
    return {
      moviesData: null,
      activeList: null,
      activeNavTab: null,
      selectedMovie: null
    };
  },
  watch: {
    activeList(newList) {
      this.selectedMovie = newList[0];
    }
  },
  components: {
    appSpinner: Spinner,
    appInfoCard: InfoCard,
    appNavigation: Navigation,
    appMoviesList: MoviesList
  },
  methods: {
    async getAllMovies(type) {
      const response = await axiosMovesDb({
        method: "GET",
        url: `/movie/${type}?api_key=${this.$store.getters.moviesDbKey}&language=en-US&page=1`
      });

      return response.data.results;
    },
    updateList(event) {
      this.activeNavTab = event;
      this.activeList = this.moviesData[event];
    }
  },
  async created() {
    const moviesArrays = await Promise.all([
      this.getAllMovies("now_playing"),
      this.getAllMovies("popular"),
      this.getAllMovies("top_rated"),
      this.getAllMovies("upcoming")
    ]);

    await this.updateDataWithGenres(moviesArrays, "movie", true);

    this.moviesData = {
      now_playing: moviesArrays[0],
      popular: moviesArrays[1],
      top_rated: moviesArrays[2],
      upcoming: moviesArrays[3]
    };

    this.activeList = this.moviesData.now_playing;
    this.activeNavTab = "now_playing";
  }
};
</script>