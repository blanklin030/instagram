import Vue from 'vue';
import App from './App.vue'
import router from './router';
import store from './store';
import './router/permission';

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});

Vue.use({
  vm,
});