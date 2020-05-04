import axiosAuth from "../../axios-instances/axios-auth";
import axiosFirebase from "../../axios-instances/axios-firebase";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  state: {
    token: null,
    userId: null,
    userData: null,
    watchlist: null
  },
  getters: {
    userLoggedIn(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
    userData(state) {
      return state.userData;
    },
    userId(state) {
      return state.userId;
    },
    watchlist(state) {
      return state.watchlist;
    }
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    authenticateUser(state, authData) {
      state.token = authData.token;
      state.userId = authData.userId;
    },
    clearUser(state) {
      state.token = null;
      state.userId = null;
      state.userData = null;
      state.watchlist = null;
    },
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
    signUp(context, userData) {
      axiosAuth
        .post("accounts:signUp?key=" + context.getters.authenticationKey, {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        })
        .then(response => {
          if (response.status === 200) {
            context.dispatch("storeUser", userData).then(res => {
              if (res.status === 200) {
                $("#signUpModal").modal("hide");
                Swal.fire(
                  "Info!",
                  "Your registration has been successful.",
                  "success"
                );

                context.commit("setUserData", userData);
                context.commit("authenticateUser", {
                  token: response.data.idToken,
                  userId: res.data.name
                });
                context.dispatch(
                  "createLocalStorageSession",
                  response.data.expiresIn
                );
                context.dispatch("setLogoutTimer", response.data.expiresIn);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    storeUser(context, userData) {
      return axiosFirebase.post("users.json", userData);
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
    },
    getUser(context, userEmail) {
      return axiosFirebase.get(
        'users.json?orderBy="email"&equalTo="' + userEmail + '"'
      );
    },
    async logIn(context, userData) {
      try {
        const authorizationResponse = await axiosAuth({
          method: "POST",
          url: `accounts:signInWithPassword?key=${context.getters.authenticationKey}`,
          data: {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
          }
        });

        if (authorizationResponse.status === 200) {
          const getUser = await context.dispatch("getUser", userData.email);
          if (getUser.status === 200) {
            const userId = Object.keys(getUser.data)[0];
            const getWatchlist = await context.dispatch("getWatchlist", userId);

            context.commit("setWatchlist", getWatchlist);
            context.commit("setUserData", getUser.data[userId]);
            context.commit("authenticateUser", {
              token: authorizationResponse.data.idToken,
              userId
            });
            context.dispatch(
              "createLocalStorageSession",
              authorizationResponse.data.expiresIn
            );
            context.dispatch(
              "setLogoutTimer",
              authorizationResponse.data.expiresIn
            );
          }
        }
      } catch (err) {
        console.log(err);
        return "failed";
      }
    },
    createLocalStorageSession(context, expiresIn) {
      localStorage.setItem("userId", context.state.userId);
      localStorage.setItem("token", context.state.token);
      localStorage.setItem("userData", JSON.stringify(context.state.userData));

      const now = new Date();
      const expiration_date = new Date(now.getTime() + expiresIn * 1000);
      localStorage.setItem("expirationDate", expiration_date);

      if (context.state.watchlist) {
        localStorage.setItem(
          "userWatchlist",
          JSON.stringify(context.state.watchlist)
        );
      }
    },
    logOut(context) {
      context.commit("clearUser");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userData");
      localStorage.removeItem("userWatchlist");
    },
    setLogoutTimer(context, time) {
      setTimeout(() => context.dispatch("logOut"), time * 1000);
    },
    tryAutoLogin(context) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const expiration_date = new Date(localStorage.getItem("expirationDate"));
      const now = new Date();

      if (now.getTime() >= expiration_date.getTime()) {
        return;
      }

      const timer = Math.round(
        (expiration_date.getTime() - now.getTime()) / 1000
      );
      const userId = localStorage.getItem("userId");
      const userData = JSON.parse(localStorage.getItem("userData"));
      const watchlist = JSON.parse(localStorage.getItem("userWatchlist"));

      context.commit("authenticateUser", {
        userId,
        token
      });
      context.commit("setUserData", userData);
      context.commit("setWatchlist", watchlist);
      context.dispatch("setLogoutTimer", timer);
    }
  }
};
