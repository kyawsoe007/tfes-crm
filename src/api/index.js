import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'Ducks/session/auth'
import Auth from '../auth'

const api = axios.create({
  baseURL: process.env.API_URL
})

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("accessKey");
  // if (token) {
  //   config.headers = { Authorization: `${token}` };
  // }
  //JSON.parse(localStorage.getItem('userInfo'))
  // console.log('what is hello', userInfo)
  config.withCredentials = true
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.message === 'Network Error') {
      // The user doesn't have internet
      return Promise.reject(error)
    }

    switch (error.response.status) {
      case 400:
        // Bad Request
        NotificationManager.error(error.response.data.message)
        break
      case 401:
        // Unauthorized
        NotificationManager.error(error.response.data.message)
        // new Auth().logout()
        break
      case 403:
        // Forbidden -- Access Rights
        NotificationManager.error(error.response.data.message)
        break
      case 404:
        // Not Found
        NotificationManager.error(error.response.data.message)
        break
      case 405:
        // Method Not Allowed
        NotificationManager.error(error.response.data.message)
        break
      case 500:
        // Internal Server Error
        NotificationManager.error(error.response.data.message)
        break
      case 503:
        // Service Unavailable
        NotificationManager.error(error.response.data.message)
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default api
