import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

vue.use(vuex)

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//herokuapp.com/' : '//localhost:5000';

var api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})
var Account = axios.create({
  baseURL: baseUrl + "/Account",
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    currentUser: {},
    Vaults: [],
    Keeps: [],
    userKeeps: [],
  },
  mutations: {
    deleteUser(state) {
      state.currentUser = {}
    },
    setUser(state, currentUser) {
      state.currentUser = currentUser
    },
    setVaults(state, Vaults) {
      console.log(Vaults)
      state.Vaults = Vaults
    },
    setKeeps(state,Keeps){
      console.log(Keeps)
      state.userKeeps = Keeps
    },
    setUserKeeps(state,Keeps){
      console.log(Keeps)
      state.Keeps = Keeps
    }

  },
  actions: {
    //auth stuff
    login({
      commit,
      dispatch
    }, loginCredentials) {
      Account.post('/login', loginCredentials)
        .then(res => {
          console.log("successfully logged in!")
          commit('setUser', res.data)
          router.push({
            name: 'Home'
          })
        })
    },
    logout({
      commit,
      dispatch
    }) {
      Account.delete('/logout')
        .then(res => {
          console.log("Successfully logged out!")
          commit('deleteUser')
          //   router.push({name: 'Login'})
        })
    },
    register({
      commit,
      dispatch
    }, userData) {
      Account.post('/register', userData)
        .then(res => {
          console.log("Registration Successful")
          router.push({
            name: 'Home'
          }) 
        })
    },
    authenticate({
      commit,
      dispatch
    }) {
      Account.get('/authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },

    //create stuff

    createVaultKeep({commit,dispatch,state},vaultKeep){
      api.post("/keep/createVaultKeep/"+ vaultKeep.keepId, vaultKeep)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

    createVault({commit,dispatch,state}, vault){
      api.post("/vault/", vault)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    
    //get stuff
    getVaults({
      dispatch,
      commit,
      state
    }) {
      api.get('/Vaults')
        .then(res => {
          console.log(res)
          commit('setVaults', res.data.Vaults)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getKeeps({dispatch, commit}){
      api.get('/Keeps')
      .then(res=>{
        console.log(res)
        commit('setKeeps',res.data.Keeps)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getVaultKeeps({dispatch, commit},id){
      api.get('/vault/keeps/'+id)
      .then(res=>{
        console.log(res)
        commit('setUserKeeps',res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //edit stuff
    editKeep({dispatch,commit,state}){
      api.put('/Keeps')
      .then(res=>{
        console.log(res)
        commit('setKeeps',res.data.Keeps)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    editVault({dispatch,commit,state}){
      api.put('/Vaults')
      .then(res=>{
        console.log(res)
        commit('setVaults',res.data.Vaults)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //delete stuff
    deleteVault({
      dispatch,
      commit
    }, id) {
      api.delete('./Vaults' + id)
        .then(res => {
          dispatch('getVaults')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteKeep({dispatch, commit}, id){
      api.delete('./Keeps'+id)
      .then(res=>{
        dispatch('getKeeps')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

})
