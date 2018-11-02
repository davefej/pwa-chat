import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LoginPage from "@/components/LoginPage"
import NearBy from "@/components/NearBy"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },

    {
      path: '/nearby',
      name: 'NearBy',
      component: NearBy
    }
  ]
})
