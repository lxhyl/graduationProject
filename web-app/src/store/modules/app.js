import { query_getMenus } from "../../api/app";

const state = {
  menu: [],
  asideWidth: 200
};
const mutations = {
  SET_MENU(state, payload) {
    state.menu = payload;
  },
  SET_ASIDE_WIDTH(state, payload) {
    state.asideWidth = payload;
  }
};
const actions = {
  async getMenus({ commit }) {
    const res = await query_getMenus();
    if (res.code !== 200) {
      return false;
    }
    commit("SET_MENU", res.data);
    return true;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
