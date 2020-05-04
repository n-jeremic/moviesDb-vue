<template>
  <div class="col-6">
    <div
      class="card mb-3 shadow-sm"
      :class="{'shadow-lg': hovered}"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="`${$store.getters.imagePath}/w500${item.poster_path}`"
            class="card-img"
            height="100%"
            style="object-fit: cover"
            v-if="item.poster_path"
          />
          <img
            src="http://placehold.it/500x750"
            class="card-img"
            height="100%"
            style="object-fit: cover"
            v-else
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ type === "movie" ? item.title : item.name }}</h5>
            <p class="card-text">
              <span>Type:</span>
              <span class="text-muted">{{ type === "movie" ? 'Movie' : 'TV Show' }}</span>
            </p>
            <p class="card-text">
              <span>Genre:</span>
              <span class="text-muted">{{ genres | formatGenres }}</span>
            </p>
            <p class="card-text">
              <span>Rating:</span>
              <span class="text-muted">{{ item.vote_average }} / 10 ( {{ item.vote_count }} votes )</span>
            </p>
            <p class="card-text">
              <span>Release date:</span>
              <span
                class="text-muted"
              >{{ type === "movie" ? item.release_date : item.first_air_date | formatReleaseDate }}</span>
            </p>
            <button
              class="btn btn-danger btn-sm"
              v-show="hovered"
              :disabled="isLoading"
              @click="removeFromWatchlist"
            >
              <i class="fas fa-trash-alt mr-2"></i>Remove
            </button>
            <button
              class="btn btn-info btn-sm"
              v-show="hovered"
              @click="redirect"
              :disabled="isLoading"
            >
              <i class="fas fa-info-circle mr-2"></i>More info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosFirebase from "../../axios-instances/axios-firebase";

export default {
  props: {
    item: Object
  },
  data() {
    return {
      hovered: false,
      isLoading: false
    };
  },
  computed: {
    type() {
      if (this.item.title) {
        return "movie";
      } else {
        return "tv";
      }
    },
    genres() {
      const genres = [];
      this.item.genres.forEach(genreObj => {
        genres.push(genreObj.name);
      });

      return genres;
    }
  },
  methods: {
    redirect() {
      if (this.type === "movie") {
        this.$router.push(`/watchlist/movie/${this.item.id}`);
      } else {
        this.$router.push(`/watchlist/tv-show/${this.item.id}`);
      }
    },
    async removeFromWatchlist() {
      this.isLoading = true;

      try {
        const response = await axiosFirebase({
          method: "POST",
          url: "watchlistRemoved.json",
          data: {
            userId: this.$store.getters.userId,
            itemId: this.item.id,
            type: this.type
          }
        });

        if (response.status === 200) {
          this.$store.dispatch("removeFromWatchlist", this.item.id);
          this.$toastr.success("Removed from watchlist!", "Info");
        }
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        this.$toastr.error("Removing failed!", "Error");
      }
    }
  }
};
</script>

<style scoped>
p span {
  font-weight: 500;
}

p {
  margin-bottom: 8px;
}

img {
  border-radius: 0.25rem 0 0 0.25rem;
}

.card {
  cursor: pointer;
}

.btn-info {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.btn-danger {
  position: absolute;
  right: 120px;
  bottom: 10px;
}
</style>