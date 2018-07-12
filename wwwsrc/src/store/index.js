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
    user: {},
    Vaults: [],
  },
  mutations: {
    deleteUser(state) {
      state.user = {}
    },
    setUser(state, user) {
      state.user = user
    },
    setVaults(state, Vaults) {
      console.log(Vaults)
      state.Vaults = Vaults
    },
  },
  actions: {
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
      api.get('/authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },
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
    },
    deleteVault({
      dispatch,
      commit
    }, id) {
      api.delete('./Vaults' + id)
        .then(res => {
          dispatch('getVaults')
        })
    }
  }

})
