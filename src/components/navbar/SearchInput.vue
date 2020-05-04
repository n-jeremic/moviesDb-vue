<template>
  <div>
    <div class="input-group">
      <input
        type="search"
        class="form-control"
        placeholder="Search for a movie, celebrity or TV show..."
        v-model="query"
        @input="search"
      />
      <div class="input-group-append" v-if="!query.length">
        <router-link to="/search" tag="button" class="btn btn-primary" type="button">Filtered search</router-link>
      </div>
    </div>
    <div class="dropdown-menu shadow" :class="{show: query.length && searchResults}">
      <div class="list-group" v-if="searchResults && searchResults.length">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          v-for="result in searchResults"
          :key="result.id"
          @click="redirect(result.id, result.media_type)"
        >
          <div class="row">
            <div class="col-2">
              <img
                :src="`${$store.getters.imagePath}/w154${result.media_type !== 'person' ? result.poster_path : result.profile_path}`"
                class="img-fluid shadow-sm"
                height="100%"
                v-if="result.poster_path || result.profile_path"
              />
              <img
                src="http://placehold.it/154x231"
                class="img-fluid shadow-sm"
                height="100%"
                v-else
              />
            </div>
            <div class="col-9">
              <h5>{{ result.media_type === "movie" ? result.title : result.name }}</h5>
              <p
                class="text-muted"
              >{{ result.media_type === "tv" ? 'TV Show' : result.media_type | capitalizeName }}</p>
            </div>
          </div>
        </button>
      </div>
      <div v-if="searchResults && searchResults.length === 0">
        <h5 class="text-muted text-center mt-3 mb-3">No results found.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMoviesDb from "../../axios-instances/axios-movies-db";

export default {
  data() {
    return {
      query: "",
      searchResults: null
    };
  },
  watch: {
    query(newValue) {
      if (newValue === "") {
        this.searchResults = null;
      }
    }
  },
  methods: {
    async search() {
      if (this.query.length) {
        try {
          const response = await axiosMoviesDb({
            method: "GET",
            url: `/search/multi?api_key=${this.$store.getters.moviesDbKey}&language=en-US&query=${this.query}&page=1&include_adult=false`
          });

          if (response.status === 200) {
            const results = response.data.results;
            if (results.length > 5) {
              results.splice(5);
            }

            this.searchResults = results;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    redirect(id, media_type) {
      this.searchResults = null;
      this.query = "";

      let path = "/search";
      if (media_type === "tv") {
        path += "/tv-show/" + id;
      } else if (media_type === "person") {
        path += "/celebrity/" + id;
      } else {
        path += "/movie/" + id;
      }

      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0px !important;
}

input {
  margin: 0px !important;
}

.dropdown-menu {
  width: 100% !important;
  padding: 0px !important;
}

.list-group-item {
  padding: 10px;
}

img {
  object-fit: cover;
}
</style>