import axiosMoviesDb from "../axios-instances/axios-movies-db";

export default {
  methods: {
    async getMoviesGenres() {
      return axiosMoviesDb({
        method: "GET",
        url: `/genre/movie/list?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });
    },
    async getTvShowsGenres() {
      return axiosMoviesDb({
        method: "GET",
        url: `/genre/tv/list?api_key=${this.$store.getters.moviesDbKey}&language=en-US`
      });
    },
    async returnGenres() {
      const responseArr = await Promise.all([
        this.getMoviesGenres(),
        this.getTvShowsGenres()
      ]);

      return {
        movie: responseArr[0].data.genres,
        tv: responseArr[1].data.genres
      };
    },
    async updateDataWithGenres(dataArray, type, multiple = false) {
      const genresObj = await this.returnGenres();

      if (type === "trendingData") {
        const finalResults = [];
        dataArray.forEach(value => {
          if (value.media_type === "movie" || value.media_type === "tv") {
            value.genres = [];
            value.genre_ids.forEach(genreId => {
              const genreObj = genresObj[value.media_type].find(
                genre => genre.id === genreId
              );
              if (genreObj) {
                value.genres.push(genreObj.name);
              }
            });

            finalResults.push(value);
          }
        });

        return finalResults;
      } else {
        if (!multiple) {
          dataArray.forEach(value => {
            value.genres = [];
            value.genre_ids.forEach(genreId => {
              const genreObj = genresObj[type].find(
                genre => genre.id === genreId
              );
              if (genreObj) {
                value.genres.push(genreObj.name);
              }
            });
          });
        } else {
          dataArray.forEach(array => {
            array.forEach(value => {
              value.genres = [];
              value.genre_ids.forEach(genreId => {
                const genreObj = genresObj[type].find(
                  genre => genre.id === genreId
                );
                if (genreObj) {
                  value.genres.push(genreObj.name);
                }
              });
            });
          });
        }
      }
    }
  }
};
