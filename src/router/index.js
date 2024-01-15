// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/personel/PersonelList.vue';
import Unit from '../views/unit/UnitView.vue';
import Login from '../views/Login.vue';
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/unit',
    name: 'Unit',
    component: Unit,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;

  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
