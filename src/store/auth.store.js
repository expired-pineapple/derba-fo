/* eslint-disable regex/invalid */
// eslint-disable-next-line regex/invalid
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
  },
  actions: {
    login({ commit }, payload) {
      commit('setIsLoading', true)
      try {
        axios.post('http://localhost:8000/api/auth/jwt/create/', payload)
          .then(response => {
            console.log("response", response.data.refresh)
            console.log("response", response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('accessToken', response.data.access)

            const refreshToken = localStorage.getItem('refreshToken')
            const accessToken = localStorage.getItem('accessToken')

            console.log("refreshToken", refreshToken)
            console.log("accessToken", accessToken)
            commit('setUser', response.data.user)
            commit('setRefreshToken', response.data.refresh)
            commit('setAccessToken', response.data.access)
            commit('setLogged', true)
            router.push('/dashboard')
          },
          )
          .catch(error =>{
            commit('setLoginError', error.response.data.detail)
            console.log("error", error)
            if(error.response.data.detail == undefined){
              commit('setLoginError', 'Something went wrong, please try again later')
            }
          })
      }
      catch (error) {
        commit('setLoginError', error)
      }
      finally {
        commit('setIsLoading', false)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      commit('setUser', null)
      commit('setRefreshToken', null)
      commit('setAccessToken', null)
      commit('setLogged', false)
    },
  },
  getters: {
    user: state => state.user,
    refreshToken: state => state.refreshToken,
    accessToken: state => state.accessToken,
    isLogged: state => state.isLogged,
    isLoading: state => state.isLoading,
    loginError: state => state.loginError,
  },

}

export default auth
