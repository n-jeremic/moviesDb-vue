<template>
  <div>
    <div v-if="!dataObject">
      <app-spinner></app-spinner>
    </div>
    <div class="row" v-else>
      <div class="col-4">
        <select class="custom-select mb-4 shadow-sm" v-model="selectedOption">
          <option value="popular">Popular</option>
          <option value="on_the_air">On the air</option>
          <option value="top_rated">Top rated</option>
        </select>
        <app-pagination
          :showsList="dataObject[selectedOption]"
          :selectedItem="selectedTvShow"
          @itemSelected="selectedTvShow = $event"
        ></app-pagination>
      </div>
      <div class="col-8">
        <app-info :showData="selectedTvShow"></app-info>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMoviesDb from "../../axios-instances/axios-movies-db";
import genres from "../../mixins/genres";
import Spinner from "../shared/Spinner.vue";
import Pagination from "./Pagination.vue";
import TvShowInfo from "./TvShowInfo.vue";

export default {
  name: "tvShowsHome",
  mixins: [genres],
  data() {
    return {
      dataObject: null,
      selectedOption: "popular",
      selectedTvShow: null
    };
  },
  watch: {
    selectedOption(newValue) {
      this.selectedTvShow = this.dataObject[newValue][0];
    }
  },
  components: {
    appSpinner: Spinner,
    appPagination: Pagination,
    appInfo: TvShowInfo
  },
  methods: {
    async getTvShowsList(type) {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/tv/${type}?api_key=${this.$store.getters.moviesDbKey}&language=en-US&page=1`
      });

      return response.data.results;
    },
    async getAllData() {
      const responsesArr = await Promise.all([
        this.getTvShowsList("popular"),
        this.getTvShowsList("on_the_air"),
        this.getTvShowsList("top_rated")
      ]);

      await this.updateDataWithGenres(responsesArr, "tv", true);

      this.dataObject = {
        popular: responsesArr[0],
        on_the_air: responsesArr[1],
        top_rated: responsesArr[2]
      };

      this.selectedTvShow = this.dataObject.popular[0];
    }
  },
  created() {
    this.getAllData();
  }
};
</script>
