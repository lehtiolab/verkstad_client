/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, data) {
      state.user = data.user;
      state.token = data.token;
      if (state.token) {
        localStorage.setItem('token', state.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
  actions: {
    setUser({ commit }, data) {
      commit('setUser', data);
    },
    logout({ commit }) {
      commit('setUser', {
        user: null,
        token: null,
      });
    },
  },
});
