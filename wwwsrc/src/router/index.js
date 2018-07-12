import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Auth from "@/components/Auth"
import Navbar from "@/components/Navbar"
import ProfilePage from "@/components/ProfilePage"
import Vaults from "@/components/Vaults"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Vaults',
      name: 'Vaults',
      component: Vaults
    },
    {
      path:'/ProfilePage',
      name: 'ProfilePage',
      component: ProfilePage
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Navbar',
      name: 'navbar',
      component: Navbar
    }
  ]
})
