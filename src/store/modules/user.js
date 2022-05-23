export default {
  state: () => ({ token: null }),
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {},
};
