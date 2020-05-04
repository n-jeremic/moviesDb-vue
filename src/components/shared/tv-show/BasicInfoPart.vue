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
      <span class="text-muted">TV Show</span>
    </p>
    <p class="card-text">
      <span>Genre:</span>
      <span class="text-muted">{{ genres }}</span>
    </p>
    <p class="card-text">
      <span>Popularity:</span>
      <span class="text-muted">{{ basicInfoData.popularity }} points</span>
    </p>
    <p class="card-text">
      <span>Total seasons:</span>
      <span class="text-muted">{{ basicInfoData.number_of_seasons }}</span>
    </p>
    <p class="card-text">
      <span>Total episodes:</span>
      <span class="text-muted">{{ basicInfoData.number_of_episodes }}</span>
    </p>
    <p class="card-text">
      <span>Episode duration:</span>
      <span class="text-muted">{{ basicInfoData.episode_run_time[0] }} min</span>
    </p>
    <p class="card-text" v-if="basicInfoData.production_companies.length">
      <span>Production:</span>
      <span class="text-muted">{{ productionCompanies }}</span>
    </p>
    <p class="card-text" v-if="basicInfoData.created_by.length">
      <span>Created by:</span>
      <a
        href="#"
        @click.prevent="redirect(basicInfoData.created_by[0].id)"
      >{{ basicInfoData.created_by[0].name }}</a>
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
    }
  },
  methods: {
    redirect(id) {
      const route = this.$route.path.split("/");
      route[route.length - 2] = "celebrity";
      route[route.length - 1] = id;

      this.$router.push(route.join("/"));
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}
</style>