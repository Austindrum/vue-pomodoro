import Vue from 'vue'
import App from './App.vue'
import store from './store'
import FlashMessage from '@smartweb/vue-flash-message';
import './icon';
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false
Vue.use(FlashMessage, { 
  time: 0,
});
Vue.use(Chartkick.use(Chart));
Vue.use(VueAxios, axios);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
