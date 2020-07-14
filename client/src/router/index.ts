import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Register from '../components/Register.vue';
import Dashboards from '../components/Dashboards/Default/index.vue';
import RegisterMember from '../components/Members/Add/index.vue';
import MemberList from '../components/Members/List/index.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboards',
    name: 'Dashboards',
    icon: 'mdi-view-dashboard',
    component: Dashboards,
    isMenuItem: true,
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'mdi-account',
    component: Register,
    isMenuItem: false,
  },
  {
    path: '/registerMember',
    name: 'Register Member',
    icon: 'mdi-account-plus',
    component: RegisterMember,
    isMenuItem: false,
  },
  {
    path: '/Members',
    name: 'List Members',
    icon: 'mdi-account-settings',
    component: MemberList,
    isMenuItem: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
