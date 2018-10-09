
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http/api'
import http from './http/http'
import store from './vuex/store'
import css from './assets/css/common.css'
import 'babel-polyfill'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api.api
Vue.prototype.$htp = http
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

