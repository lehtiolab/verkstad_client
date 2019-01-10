/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem('user-token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isUserLoggedIn: Boolean(localStorage.getItem('user-token')),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
        localStorage.setItem('user-token', token);
      } else {
        state.isUserLoggedIn = false;
        localStorage.removeItem('user-token');
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
