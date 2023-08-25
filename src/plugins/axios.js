/* eslint-disable regex/invalid */
import router from '@/router'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 5000,
  headers: {
    'Authorization': "JWT " + localStorage.getItem('accessToken'),
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
})

let isRefreshing = false

axiosIns.interceptors.response.use(
  async response => response,
  async error => {
    try {
      if (error.response && error.response.status === 401 && !isRefreshing) {
        isRefreshing = true

        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem('refreshToken') || localStorage.getItem('refresh')

        if (!refreshToken) {
          // Refresh token is expired or not available
          throw new Error('Refresh token expired or not available')
        }

        try {
          const response = await axiosIns.post('auth/jwt/refresh/', { refresh: refreshToken })

          localStorage.setItem('accessToken', response.data.access)

          // Update the authorization header with the new access token
          axiosIns.defaults.headers.common['Authorization'] = "JWT " + response.data.access


          isRefreshing = false

          // Retry the failed request
          const originalRequest = error.config

          originalRequest.headers['Authorization'] = "JWT " + response.data.access
          
          return axiosIns(originalRequest)
        } catch (refreshError) {

          // Handle the error here, such as redirect to login page or show an error message
          router.push('/login')
          isRefreshing = false
        }
      }
    } catch (e) {

      // Handle the error here, such as redirect to login page or show an error message
      router.push('/login')
    }

    // Handle network errors and unexpected errors
    if (!error.response) {

      // Handle the error here, such as redirect to error page or show an error message
      router.push('/error')
    }

    return Promise.reject(error)
  },
)

export default axiosIns
