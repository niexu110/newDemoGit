
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http/api'
import http from './http/http'
import store from './vuex/store'
import less from './assets/less/common.less'
import clipper from '../static/clipper'
Vue.prototype.$api = api.api
Vue.prototype.$htp = http
Vue.use(clipper)
import './assets/cropper.css';
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

