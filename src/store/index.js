// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    user: localStorage.getItem('user') || '',
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = '';
    },
    RESTORE_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({commit}, token) {
      commit('SET_TOKEN', token);
    },
    logout({commit}) {
      commit('SET_TOKEN', null);
      localStorage.removeItem('token');
    },
    restoreToken({commit}) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('RESTORE_TOKEN', token);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUser: state => state.user,
  },
});
