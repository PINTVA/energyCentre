import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true,
      },
      component: resolve => require(['../page/home.vue'], resolve)
    },
    {
      path: '/selfform',
      name: 'selfform',
      component: resolve => require(['../page/selfform.vue'], resolve)
    },
    {
      path: '/workshop',
      name: 'workshop',
      component: resolve => require(['../page/workshop.vue'], resolve)
    },
    {
      path: '/me',
      name: 'me',
      component: resolve => require(['../page/me.vue'], resolve)
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: resolve => require(['../page/equipment.vue'], resolve)
    },
    {
      path: '/history',
      name: 'history',
      component: resolve => require(['../page/history.vue'], resolve)
    }
  ]
})
