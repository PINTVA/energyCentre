// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MintUi from 'mint-ui'
import element from 'element-ui'
import axios from 'axios'
import qs from 'qs'

import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/styles/main.css'
import echarts from 'echarts'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.use(MintUi)
Vue.use(element)
Vue.config.productionTip = false

/* eslint-disable no-new */

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (!store.state.show) {
//       this.$store.state.show = true
//       next({
//         push:'/home'
//       });
//     }else {
//       next();
//     }
//   }else {
//     next();
//   }
// })

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  for(var i = 0; i < 9999; i++) {
    clearInterval(i)
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
