import axiosFirebase from "../../axios-instances/axios-firebase";

export default {
  state: {
    watchlist: null
  },
  getters: {
    watchlist(state) {
      return state.watchlist;
    }
  },
  mutations: {
    setWatchlist(state, watchlistArr) {
      if (watchlistArr) {
        if (watchlistArr.length) {
          state.watchlist = watchlistArr;
        } else {
          state.watchlist = null;
        }
      } else {
        state.watchlist = watchlistArr;
      }
    },
    addToWatchlist(state, movieObj) {
      if (state.watchlist) {
        state.watchlist.push(movieObj);
      } else {
        state.watchlist = [movieObj];
      }
    },
    removeFromWatchlist(state, itemId) {
      const index = state.watchlist.findIndex(el => el.id === itemId);
      state.watchlist.splice(index, 1);
    }
  },
  actions: {
    removeFromWatchlist(context, itemId) {
      context.commit("removeFromWatchlist", itemId);
      const watchlistLS = JSON.parse(localStorage.getItem("userWatchlist"));
      const index = watchlistLS.findIndex(el => el.id === itemId);
      watchlistLS.splice(index, 1);

      localStorage.setItem("userWatchlist", JSON.stringify(watchlistLS));
    },
    addToWatchlist(context, movieData) {
      const watchlistLS = localStorage.getItem("userWatchlist");
      if (watchlistLS) {
        let parsedWatchlist = JSON.parse(watchlistLS);
        if (parsedWatchlist.length) {
          parsedWatchlist.push(movieData);
        } else {
          parsedWatchlist = [movieData];
        }

        localStorage.setItem("userWatchlist", JSON.stringify(parsedWatchlist));
      } else {
        const watchlist = [movieData];
        localStorage.setItem("userWatchlist", JSON.stringify(watchlist));
      }
      context.commit("addToWatchlist", movieData);
    },
    async getRemovedFromWatchlist() {
      try {
        const response = await axiosFirebase({
          method: "GET",
          url: "watchlistRemoved.json"
        });

        if (response.status === 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getWatchlist(context, userId) {
      try {
        const response = await axiosFirebase({
          method: "GET",
          url: "watchlist.json"
        });

        if (response.status === 200 && response.data) {
          const removedFromWatchlist = await context.dispatch(
            "getRemovedFromWatchlist"
          );

          const deletedData = {};
          for (let property in removedFromWatchlist) {
            if (removedFromWatchlist[property].userId === userId) {
              if (deletedData[removedFromWatchlist[property].itemId]) {
                deletedData[removedFromWatchlist[property].itemId] += 1;
              } else {
                deletedData[removedFromWatchlist[property].itemId] = 1;
              }
            }
          }

          const watchlistData = {};
          for (let watchlistItem in response.data) {
            if (response.data[watchlistItem].userId === userId) {
              if (watchlistData[response.data[watchlistItem].data.id]) {
                watchlistData[response.data[watchlistItem].data.id] += 1;
              } else {
                watchlistData[response.data[watchlistItem].data.id] = 1;
              }
            }
          }

          const watchlist = [];
          for (let watchlistItem in response.data) {
            if (response.data[watchlistItem].userId === userId) {
              const dataId = response.data[watchlistItem].data.id;
              if (deletedData[dataId]) {
                const index = watchlist.findIndex(el => el.id === dataId);
                if (
                  watchlistData[dataId] > deletedData[dataId] &&
                  index === -1
                ) {
                  watchlist.push(response.data[watchlistItem].data);
                }
              } else {
                watchlist.push(response.data[watchlistItem].data);
              }
            }
          }

          return watchlist;
        } else if (response.data === null) {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
