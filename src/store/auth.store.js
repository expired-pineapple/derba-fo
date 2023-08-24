/* eslint-disable regex/invalid */
// eslint-disable-next-line regex/invalid
import axiosIns from '@/plugins/axios'
import router from '@/router'
import axios from 'axios'

const auth = {
  namespaced: false,
  state: {
    user: null,
    refreshToken: null,
    accessToken: null,
    isLogged: false,
    isLoading: false,
    loginError: null,
    userLogs: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
    },
    setLogged(state, status) {
      state.isLogged = status
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setLoginError(state, error) {
      state.loginError = error
    },
    setUserLogs(state, logs) {
      state.userLogs = logs
    },
  },
  actions: {
    async login({ commit }, payload) {
      commit('setIsLoading', true)
      try {
        const response = await axios.post('http://localhost:8000/api/auth/jwt/create/', payload)
    
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('isLoggedIn', true) // Corrected key name
    
        commit('setAccessToken', response.data.access)
        commit('setRefreshToken', response.data.refresh)
        commit('setLogged', false)

        const userData = await axiosIns.get('/auth/users/me')
        
        commit('setUser', userData.data)

        router.push('/')
        console.log("here")
      } catch (error) {
        commit('setLoginError', error)
        console.log(error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async fetchUser({ commit }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosIns.get('/auth/users/me')

        commit("setUser", response.data)
      }catch(error){
        commit('setLoginError', error.response.data.detail || error)
      }
    },

    logout({ commit }) {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      localStorage.setItem('isLoggedIn', false)
      commit('setUser', null)
      commit('setRefreshToken', null)
      commit('setAccessToken', null)
      commit('setLogged', false)
    },
    async signUp({ commit }, payload) {
      commit('setIsLoading', true)
      try {
        const response = await axiosIns.post('/auth/users/', payload)

        console.log("response", response)
        commit('setUser', response.data)

      }
      catch (error) {
        commit('setLoginError', error.response.data.detail || error)
      }
      finally {
        commit('setIsLoading', false)
      }
    },
    async fetchUserLogs({ commit }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosIns.get('/al')

        const userLogPromise = response.data.map(async log => {
          const userResponse = await axiosIns.get(`/auth/users/${log.user}/`)
          const user = userResponse.data
          const userFullName = `${user.first_name} ${user.last_name} - ${user.username}`

          log.fullName = userFullName

          return log
        })

        const users = await Promise.all(userLogPromise)


        console.log("response", response)
        commit('setUserLogs', users)

      }
      catch (error) {
        commit('setLoginError', error.response.data.detail || error)
      }
      finally {
        commit('setIsLoading', false)
      }
    },

  },
  getters: {
    user: state => state.user,
    refreshToken: state => state.refreshToken,
    accessToken: state => state.accessToken,
    isLogged: state => state.isLogged,
    isLoading: state => state.isLoading,
    loginError: state => state.loginError,
    userLogs: state => state.userLogs,
  },

}

export default auth
