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
  response => response,
  error => {
    try {
      if (error.response && error.response.status === 401 && !isRefreshing) {
        isRefreshing = true

        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem('refreshToken') || localStorage.getItem('refresh')

        console.log("refreshToken", refreshToken)

        if (!refreshToken) {
          // Refresh token is expired or not available
          throw new Error('Refresh token expired or not available')
        }

        axiosIns.post('auth/jwt/refresh/', { refresh: refreshToken })
          .then(response => {
            console.log('Access token refreshed!')
            console.log('response', response)
            localStorage.setItem('accessToken', response.data.access)

            // localStorage.setItem('refreshToken', response.data.refresh)


            console.log("newAccessToken", response.data.access)

            isRefreshing = false
          })
          .catch(refreshError => {
            console.log('Failed to refresh access token:', refreshError)

            // Handle the error here, such as redirect to login page or show an error message
            router.push('/login')
            isRefreshing = false
          })
      }
    } catch (e) {
      console.log('An error occurred:', e)

      // Handle the error here, such as redirect to login page or show an error message
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default axiosIns
  