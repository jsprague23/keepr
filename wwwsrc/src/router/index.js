import Vue from 'vue'
import Router from 'vue-router'
import vuex from 'vuex'
import axios from 'axios'
import Home from '@/components/Home'
import Auth from "@/components/Auth"
import Navbar from "@/components/Navbar"
import ProfilePage from "@/components/ProfilePage"
import Vaults from "@/components/Vaults"
import Keeps from '@/components/Keeps'
import VaultDetails from '@/components/VaultDetails'
import KeepDetails from '@/components/KeepDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Vaults/:id',
      name:'VaultDetails',
      component:VaultDetails
    },
    {
      path:'/Keeps/:id',
      name:'KeepDetails',
      component:KeepDetails
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
      name: 'Home',
      component: Home
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
