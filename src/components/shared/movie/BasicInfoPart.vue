<template>
  <div>
    <p class="card-text">
      <b-form-rating
        :value="basicInfoData.vote_average"
        stars="10"
        variant="warning"
        precision="2"
        size="lg"
        readonly
        show-value
        class="shadow-sm"
        v-b-tooltip.hover
        :title="basicInfoData.vote_count + ' votes'"
        style="cursor: pointer"
      ></b-form-rating>
    </p>
    <p class="card-text">
      <span>Type:</span>
      <span class="text-muted">Movie</span>
    </p>
    <p class="card-text">
      <span>Genre:</span>
      <span class="text-muted">{{ genres }}</span>
    </p>
    <p class="card-text">
      <span>Duration:</span>
      <span class="text-muted">{{ basicInfoData.runtime }} min</span>
    </p>
    <p class="card-text">
      <span>Popularity:</span>
      <span class="text-muted">{{ basicInfoData.popularity }} points</span>
    </p>
    <p class="card-text">
      <span>Release date:</span>
      <span class="text-muted">{{ basicInfoData.release_date | formatReleaseDate }}</span>
    </p>
    <p class="card-text">
      <span>Production:</span>
      <span class="text-muted">{{ productionCompanies }}</span>
    </p>
    <p class="card-text">
      <span>Production countries:</span>
      <span class="text-muted">{{ productionCountries }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    basicInfoData: Object
  },
  computed: {
    genres() {
      let genreString = "";
      this.basicInfoData.genres.forEach((genreObj, index, array) => {
        if (index === array.length - 1) {
          genreString += genreObj.name;
        } else {
          genreString += genreObj.name + ", ";
        }
      });

      return genreString;
    },
    productionCompanies() {
      const companiesArr = this.basicInfoData.production_companies;
      let companies_string = "";
      for (let i = 0; i < 3 && i < companiesArr.length; i++) {
        if (i === companiesArr.length - 1 || i === 2) {
          companies_string += companiesArr[i].name;
        } else {
          companies_string += companiesArr[i].name + ", ";
        }
      }

      return companies_string;
    },
    productionCountries() {
      const countriesArr = this.basicInfoData.production_countries;
      let countries_string = "";

      countriesArr.forEach((countryObj, index, array) => {
        if (index === array.length - 1) {
          countries_string += countryObj.name;
        } else {
          countries_string += countryObj.name + ", ";
        }
      });

      return countries_string;
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}
</style>