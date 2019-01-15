import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faOilCan,
  faArrowAltCircleLeft,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { sync } from 'vuex-router-sync';

import App from './App.vue';
import router from './router';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

sync(store, router);

library.add(faOilCan);
library.add(faArrowAltCircleLeft);
library.add(faCheckCircle);
library.add(faTimesCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
