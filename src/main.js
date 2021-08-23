import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import api from './apis'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$axios = axios //全域
Vue.prototype.$api = api

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
