import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('font-awesome/css/font-awesome.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
