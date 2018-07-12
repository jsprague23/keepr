import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//herokuapp.com/' : '//localhost:3000';

var api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})
var auth = axios.create({
  baseURL: baseUrl + "/auth",
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    deleteUser(state) {
      state.user = {}
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({
      commit,
      dispatch
    }, loginCredentials) {
      auth.post('/login', loginCredentials)
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
      auth.delete('/logout')
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
      auth.post('/register', userData)
        .then(res => {
          console.log("Registration Successful")
          router.push({
            name: 'Home'
          }) // I changed this to just change the component 
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
  }

})
