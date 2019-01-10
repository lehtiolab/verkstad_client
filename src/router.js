import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Users from './components/Users.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      redirect: 'home',
    },
  ],
});
