import axios from 'axios'
import { auth0Client } from 'auth0'

export const http = axios.create({ baseURL: process.env.REACT_APP_API_ORIGIN })
http.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${await auth0Client.getTokenSilently()}`
    return config
  },
  error => Promise.reject(error)
)
