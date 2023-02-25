import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "intro" */ '../views/login/index')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "intro" */ '../views/admin/home/index')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "intro" */ '../views/user/home/index')
  },
  {
    path: '/salesman',
    name: 'salesman',
    component: () => import(/* webpackChunkName: "intro" */ '../views/salesman/home/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
