import AuthService from "../services/authen";

const user = localStorage.getItem("user");
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const authen = {
  namespaced: true,
  state: initialState,
  actions: {
    doLogin({ commit }, user) {
      return AuthService.userLogin(user).then(
        (data) => {
          if (data.isSuccess === 1) {
            commit("loginSuccess", user.username);
            return Promise.resolve(data);
          } else {
            commit("loginFailure");
            return Promise.resolve(data);
          }
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    doLogout({ commit }) {
      AuthService.userLogout();
      commit("logout");
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};
