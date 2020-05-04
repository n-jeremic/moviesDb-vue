import Vue from "vue";
import VueRouter from "vue-router";

import Trending from "../components/trending/Trending.vue";
import Movies from "../components/movies/Movies.vue";
import TvShows from "../components/tv-shows/TvShows.vue";
import Watchlist from "../components/watchlist/Watchlist.vue";
import Search from "../components/search/SearchHome.vue";

import TrendingRouterView from "../components/trending/TrendingRouterView.vue";
import MoviesRouterView from "../components/movies/MoviesRouterView.vue";
import TvShowsRouterView from "../components/tv-shows/TvShowsRouterView.vue";
import WatchlistRouterView from "../components/watchlist/WatchlistRouterView.vue";
import SearchRouterView from "../components/search/SearchRouterView.vue";

import MovieDetails from "../components/shared/movie/MovieDetails.vue";
import TvShowDetails from "../components/shared/tv-show/TvShowDetails.vue";
import CelebrityDetails from "../components/shared/celebrity/CelebrityDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/trending",
    component: TrendingRouterView,
    children: [
      { path: "", component: Trending },
      { path: "movie/:id", component: MovieDetails },
      { path: "tv-show/:id", component: TvShowDetails },
      { path: "celebrity/:id", component: CelebrityDetails }
    ]
  },
  {
    path: "/movies",
    component: MoviesRouterView,
    children: [
      { path: "", component: Movies },
      { path: "movie/:id", component: MovieDetails },
      { path: "tv-show/:id", component: TvShowDetails },
      { path: "celebrity/:id", component: CelebrityDetails }
    ]
  },
  {
    path: "/tv-shows",
    component: TvShowsRouterView,
    children: [
      { path: "", component: TvShows },
      { path: "movie/:id", component: MovieDetails },
      { path: "tv-show/:id", component: TvShowDetails },
      { path: "celebrity/:id", component: CelebrityDetails }
    ]
  },
  {
    path: "/watchlist",
    component: WatchlistRouterView,
    children: [
      { path: "", component: Watchlist },
      { path: "movie/:id", component: MovieDetails },
      { path: "tv-show/:id", component: TvShowDetails },
      { path: "celebrity/:id", component: CelebrityDetails }
    ]
  },
  {
    path: "/search",
    component: SearchRouterView,
    children: [
      { path: "", component: Search },
      { path: "movie/:id", component: MovieDetails },
      { path: "tv-show/:id", component: TvShowDetails },
      { path: "celebrity/:id", component: CelebrityDetails }
    ]
  },
  { path: "/", redirect: "/trending" },
  { path: "*", redirect: "/trending" }
];

export default new VueRouter({
  routes,
  mode: "history"
});
