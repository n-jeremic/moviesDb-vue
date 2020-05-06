<template>
  <div>
    <div class="row mt-5">
      <div class="col-3">
        <h5 class="text-muted mt-2">Total of {{ totalResults }} results found.</h5>
      </div>
      <div class="col-6" v-if="totalResults > 20">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: currentPage === 1}">
              <a
                class="page-link"
                href="#"
                @click.prevent="$emit('pageChanged', currentPage - 1)"
              >Previous</a>
            </li>
            <li
              class="page-item"
              :class="{active: currentPage === page}"
              v-for="(page, index) in totalPages"
              :key="index"
            >
              <a class="page-link" href="#" @click.prevent="$emit('pageChanged', page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{disabled: currentPage === totalPages}">
              <a
                class="page-link"
                href="#"
                @click.prevent="$emit('pageChanged', currentPage + 1)"
              >Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row mt-4">
      <app-search-result-item v-for="result in results" :key="result.id" :resultObj="result"></app-search-result-item>
    </div>
  </div>
</template>

<script>
import SearchResultItem from "./SearchResultItem.vue";
import Spinner from "../shared/Spinner.vue";

export default {
  data() {
    return {
      resultsPerPage: 20
    };
  },
  props: {
    results: Array,
    currentPage: Number,
    totalResults: Number
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.resultsPerPage);
    }
  },
  components: {
    appSearchResultItem: SearchResultItem,
    appSpinner: Spinner
  }
};
</script>

<style scoped>
</style>