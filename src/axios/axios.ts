import axios from 'axios'
import { useUserStore } from '@/pinia/user'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'http://localhost:3400/',
  timeout: 5000,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    const userStore = useUserStore()
    if (error.response?.status === 401) {
      const publicPages = ['login', 'register']
      if (!publicPages.includes(window.location.pathname)) {
        userStore.logout()
      }
      if(error.response?.status === 500){
        ElMessage.error(error.response?.data.message)
      }
    }
    return Promise.reject(error)
  },
)

export default service
