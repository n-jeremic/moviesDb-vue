<template>
  <div>
    <div v-if="!genres">
      <app-spinner></app-spinner>
    </div>
    <div class="card shadow" v-else>
      <div class="card-body">
        <h3 class="card-title">Filtered search:</h3>
        <hr />
        <div class="row">
          <div class="col">
            <label for="type">Type:</label>
            <select class="custom-select shadow-sm" id="type" v-model="type">
              <option value="movie">Movie</option>
              <option value="tv">TV Show</option>
            </select>
          </div>
          <div class="col" style="padding: 0px; margin: 0px 15px">
            <form @focusout="isDropdownOpen = false" @focus="isDropdownOpen = true">
              <label for="genre">Genre:</label>
              <input
                type="text"
                class="form-control shadow-sm dropdown-toggle"
                id="genre"
                data-toggle="dropdown"
                readonly
                :value="selectedGenresOutput"
              />
              <div class="dropdown-menu shadow" :class="{show: isDropdownOpen}">
                <div
                  class="custom-control custom-checkbox dropdown-item"
                  v-for="genreObj in genresList"
                  :key="genreObj.id"
                >
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="genreObj.id"
                    v-model="selectedGenres[genreObj.id]"
                  />
                  <label class="custom-control-label" :for="genreObj.id">{{ genreObj.name }}</label>
                </div>
              </div>
            </form>
          </div>
          <div class="col">
            <label for="rating">
              Minimum rating:
              <span class="text-muted">{{ ratingFormated }}</span>
            </label>
            <input
              type="range"
              class="custom-range mt-2"
              min="0"
              max="10"
              step="0.5"
              id="rating"
              v-model="rating"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col"></div>
          <div class="col">
            <button class="btn btn-info btn-block" @click="performSearch">
              <i class="fas fa-search mr-2"></i>Search
            </button>
          </div>
          <div class="col"></div>
        </div>
        <div v-if="searchResults">
          <h5 class="text-muted mt-5">Total of {{ searchResults.length }} results found.</h5>
          <div class="row mt-4">
            <app-search-result
              v-for="(result, index) in searchResults"
              :key="index"
              :resultObj="result"
            ></app-search-result>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../shared/Spinner.vue";
import axiosMoviesDb from "../../axios-instances/axios-movies-db";
import SearchResult from "./SearchResult.vue";

export default {
  name: "searchHome",
  data() {
    return {
      type: "movie",
      genres: null,
      isDropdownOpen: false,
      selectedGenres: {},
      rating: 5,
      searchResults: null
    };
  },
  computed: {
    genresList() {
      return this.genres[this.type];
    },
    ratingFormated() {
      return (this.rating * 1).toFixed(2);
    },
    selectedGenresOutput() {
      const selection = Object.keys(this.selectedGenres);
      if (selection.length) {
        const selectedGenresArr = [];
        selection.forEach(genreId => {
          if (this.selectedGenres[genreId]) {
            selectedGenresArr.push(
              this.genresList.find(genre => genre.id == genreId)
            );
          }
        });

        let output = "";
        for (let i = 0; i < selectedGenresArr.length; i++) {
          if (i === selectedGenresArr.length - 1) {
            output += selectedGenresArr[i].name;
          } else {
            output += selectedGenresArr[i].name + ", ";
          }
        }

        return output;
      } else {
        return null;
      }
    }
  },
  watch: {
    type() {
      this.selectedGenres = {};
    }
  },
  components: {
    appSpinner: Spinner,
    appSearchResult: SearchResult
  },
  methods: {
    updateResultsWithGenres(array) {
      const genresList = this.genres[this.type];

      array.forEach(result => {
        result.genres = [];
        result.genre_ids.forEach(genreId => {
          const genreObj = genresList.find(el => el.id === genreId);
          result.genres.push(genreObj.name);
        });
      });
    },
    async performSearch(event) {
      event.target.disabled = true;
      event.target.innerHTML =
        '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Searching...';

      let genresQuery;
      const genresSelection = Object.keys(this.selectedGenres);
      if (genresSelection.length) {
        genresQuery = "&with_genres=";
        genresSelection.forEach((genreId, index, array) => {
          if (this.selectedGenres[genreId]) {
            genresQuery += genreId + ",";
          }
        });
      }

      try {
        const response = await axiosMoviesDb({
          method: "GET",
          url: `/discover/${this.type}?api_key=${
            this.$store.getters.moviesDbKey
          }&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=50&vote_average.gte=${
            this.rating
          }${genresQuery ? genresQuery : ""}`
        });

        if (response.status === 200) {
          event.target.disabled = false;
          event.target.innerHTML = '<i class="fas fa-search mr-2"></i>Search';
          this.updateResultsWithGenres(response.data.results);
          this.searchResults = response.data.results;
        }
      } catch (err) {
        console.log(err);
        event.target.disabled = false;
        event.target.innerHTML = '<i class="fas fa-search mr-2"></i>Search';
      }
    },
    async getGenres(type) {
      const response = await axiosMoviesDb({
        method: "GET",
        url: `/genre/${type}/list?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });

      return response.data.genres;
    },
    async getAllGenres() {
      try {
        const responsesArr = await Promise.all([
          this.getGenres("movie"),
          this.getGenres("tv")
        ]);

        this.genres = {
          movie: responsesArr[0],
          tv: responsesArr[1]
        };
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getAllGenres();
  }
};
</script>

<style scoped>
.dropdown-menu {
  width: 100%;
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px 10px;
}

.form-control[readonly] {
  background-color: white;
}

.custom-control-label {
  display: block;
}
</style>