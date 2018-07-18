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
    vaultKeeps:[]
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
      state.Keeps = Keeps
    },
    setUserKeeps(state,userKeeps){
      console.log(userKeeps)
      state.userKeeps = userKeeps
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
      api.post("/api/VaultKeep/"+ vaultKeep.keepId, vaultKeep)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

    createVault({commit,dispatch,state}, vault){
      api.post("/api/Vault", vault)
      .then(res=>{
        console.log(res.data)
        dispatch("getVaults")

      })
      .catch(err=>{
        console.log(err)
      })
    },
    createKeep({commit,dispatch,state}, keep){
      api.post("/api/Keep", keep)
      .then(res=>{
        console.log(res.data)
        dispatch("getKeeps")
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
    },id) {
      api.get('/api/Vault')
        .then(res => {
          console.log(res)
          commit('setVaults', res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getKeeps({dispatch, commit}){
      api.get('/api/Keep')
      .then(res=>{
        console.log(res)
        commit('setKeeps',res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getVaultKeeps({dispatch, commit},id){
      api.get('/api/VaultKeeps/'+id)
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
      api.put('/api/Keep')
      .then(res=>{
        console.log(res)
        commit('setKeeps',res.data.Keeps)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    editVault({dispatch,commit,state},id){
      api.put('/api/Vault/'+id)
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
      api.delete('/api/Vault/' + id)
        .then(res => {
          dispatch('getVaults')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteKeep({dispatch, commit}, id){
      api.delete('/api/Keeps'+id)
      .then(res=>{
        dispatch('getKeeps')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

})
