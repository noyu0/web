/*
 * @Description: axios 全局请求(这个模块自定义的意义不大)
 */
import axios from 'axios'
const Axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  withCredentials: false // 表示跨域请求时是否需要使用凭证
})

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
Axios.interceptors.response.use(
  response => {
    const res = response.data.code ? response.data : response
    if (res.code !== 200 && res.code) {
      return Promise.reject(response.data)
    }
    return res
  },
  error => {
    if (error.response) {
      return Promise.reject(error)
    } else if (error.request) {
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default Axios
