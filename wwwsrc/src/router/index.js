import Vue from 'vue'
import Router from 'vue-router'
import vuex from 'vuex'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import Auth from "@/components/Auth"
import Navbar from "@/components/Navbar"
import ProfilePage from "@/components/ProfilePage"
import Vaults from "@/components/Vaults"
import Keeps from '@/components/Keeps'
import VaultDetails from '@/components/Keep'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/VaultDetails',
      name:'VaultDetails',
      component:VaultDetails
    },
    {
      path:'/Keeps',
      name:'Keeps',
      component:Keeps
    },
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
