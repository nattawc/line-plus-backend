import { createStore } from "vuex";
import { authen } from "./authen";

const prefix = localStorage.getItem("prefix");
const initialState = prefix ? { prefix: prefix } : { prefix: null };

export default createStore({
  state: initialState,
  mutations: {
    setPrefix(state, p) {
      state.prefix = p;
    },
    clearPrefix(state) {
      state.prefix = null;
    },
  },
  actions: {
    setPrefix({ commit }, p) {
      localStorage.setItem("prefix", p);
      commit("setPrefix", p);
    },
    clearPrefix({ commit }) {
      localStorage.removeItem("prefix");
      commit("clearPrefix");
    },
  },
  modules: { authen },
});
